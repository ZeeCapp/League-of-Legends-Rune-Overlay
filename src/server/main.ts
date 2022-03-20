import { createProxyMiddleware } from "http-proxy-middleware"
import ReactDevServerMiddleware from "./shared/ReactDevServerProxyMiddleware"
import { GetFreePort } from "./shared/HelperFunctions"
import * as express from "express"
import * as minimist from "minimist"
import * as path from "path"

const appArgs: any = minimist(process.argv.slice(2));
const app = express();

GetFreePort(3000).then(port => {
    //use proxy to riots client-api, since it doesn't use a access-control-allow-origin, we can't access it directly from
    //the browser
    app.use("/api/riot-client-proxy", createProxyMiddleware(
        {
            target: 'https://127.0.0.1:2999',
            secure: false,
            changeOrigin: true,
            pathRewrite: { "/api/riot-client-proxy": "" },
            logLevel: "silent",
            onError: (err: any, req, res) => {
                if (err.code == "ECONNREFUSED") {
                    res.sendStatus(204);
                }
            },
            onProxyRes: (proxyRes, req, res) => {
                proxyRes.headers["access-control-allow-origin"] = `127.0.0.1:${port}`;
                proxyRes.headers["cache-control"] = "no-store";
            }
        }
    ));

    //if app is in dev mode, proxy requests to the react dev server, else just serve the static folder
    if (appArgs?.env == "dev") {
        app.use(ReactDevServerMiddleware(3001));
    }
    else {
        app.use(express.static(path.join(__dirname, "../client-app")));
    }

    app.get("/", (req, res) => {
        res.sendFile(path.join(__dirname, "../client-app/index.html"));
    })

    app.listen(port, "127.0.0.1", () => {
        console.log(`You can open the league rune overlay in your browser using URL 127.0.0.1:${port}`);
    })
})

