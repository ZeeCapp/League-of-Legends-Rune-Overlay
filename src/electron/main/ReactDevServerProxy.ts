import {createProxyMiddleware} from "http-proxy-middleware"

export default function ReactDevServerProxy(reactDevServerPort: number = 3000) {
    return createProxyMiddleware({
        target: `http://127.0.0.1:${reactDevServerPort}`, 
        logLevel: "silent",
        secure: false, 
        changeOrigin: true,
        ws: true
    });
}