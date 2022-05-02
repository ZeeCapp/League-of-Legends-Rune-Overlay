import { createProxyMiddleware } from "http-proxy-middleware"
import * as minimist from "minimist"
import * as express from "express"
import * as path from "path"

import ReactDevServerProxy from "./ReactDevServerProxy"
import * as bodyParser from "body-parser"
import { ReadSettings } from "./Settings"

export default class ClientAppServer {
    private expressApp;
    private appArgs;

    constructor() {
        this.expressApp = express();
        this.appArgs = minimist(process.argv.slice(2));
    }

    private useSettingsApi() {
        const settingsRouter = express.Router();
        settingsRouter.use(bodyParser.json());
        settingsRouter.route("/settings")
            .get(async (req, res) => {
                try {
                    const settings = await ReadSettings();
                    if (settings) {
                        res.send(settings);
                        return;
                    }
                    res.sendStatus(204);
                }
                catch {
                    res.sendStatus(500);
                }
            });

            return settingsRouter;
    }

    startServer(port: number) {
        this.expressApp.use(this.useSettingsApi());
        this.expressApp.use("/api/riot-client-proxy", createProxyMiddleware(
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
        if (this.appArgs?.env == "dev") {
            this.expressApp.use(ReactDevServerProxy(3001));
        }
        else {
            this.expressApp.use(express.static(path.join(__dirname, "../client-app")));
        }

        this.expressApp.get("*", (req, res) => { res.sendFile(path.join(__dirname, "../client-app/index.html")) })

        this.expressApp.listen(port, "127.0.0.1");
    }
}