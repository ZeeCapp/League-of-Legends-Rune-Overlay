import { app, BrowserWindow, ipcMain } from "electron"
import * as path from "path"
import * as minimist from "minimist"

import webpackDevServerReady from "./WebpackDevServerHelper";
import GetFreePort from "./ServerPortHelper";
import ClientAppServer from "./ClientAppServer";
import { SaveOrCreateSettings, ReadSettings } from "./Settings"

const appArgs: any = minimist(process.argv.slice(2));

function createWindow(preloadPath?: string) {
    const win = new BrowserWindow({
        width: 1000,
        height: 600,
        autoHideMenuBar: appArgs?.env != "dev" ? true : false,
        webPreferences: {
            preload: preloadPath
        }
    })
    return win;
}


GetFreePort().then(port => {
    app.whenReady().then(async () => {
        const clientAppServer = new ClientAppServer();
        let win: BrowserWindow;
        if (appArgs?.env == "dev") {
            try {
                await webpackDevServerReady("127.0.0.1:3002");
                clientAppServer.startServer(port);
                win = await createWindow(path.join(__dirname, "./Preload.js"));
                win.loadURL("http://127.0.0.1:3002");
                win.webContents.openDevTools();
            }
            catch (err) {
                console.log(err);
            }
        }
        else {
            win = await createWindow();
            win.loadFile('../renderer/index.html');
        }

        app.on('activate', () => {
            if (BrowserWindow.getAllWindows().length === 0) createWindow()
        })

        app.on('window-all-closed', () => {
            if (process.platform !== 'darwin') app.quit()
        })

        ipcMain.handle("getCurrentPort", () => {
            return port;
        })

        ipcMain.handle("handleLoadSettings", async () => {
            return await ReadSettings();
        })

        ipcMain.on("handleSaveSettings", (event, args) => {
            console.log(args);
            SaveOrCreateSettings(JSON.parse(args));
        })
    })
})