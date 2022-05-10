import { app, BrowserWindow, ipcMain } from "electron"
import * as path from "path"
import * as minimist from "minimist"

import webpackDevServerReady from "./WebpackDevServerHelper";
import GetFreePort from "./ServerPortHelper";
import ClientAppServer from "./ClientAppServer";
import { SaveOrCreateSettings, ReadSettings } from "./Settings"
import LeagueClient from "./LeagueClient";

const appArgs: any = minimist(process.argv.slice(2));

function createWindow(preloadPath?: string) {
     const win = new BrowserWindow({
        width: 1000,
        height: 600,
        autoHideMenuBar: appArgs?.env != "dev" ? true : false,
        title: "League Rune Overlay",
        webPreferences: {
            preload: preloadPath ? path.join(__dirname, preloadPath) : undefined
        }
    })
    return win;
}


GetFreePort().then(port => {
    app.whenReady().then(async () => {
        const leagueClient = new LeagueClient();
        const userFileRootPath: string = app.getPath("userData");
        const clientAppServer = new ClientAppServer(userFileRootPath);

        let win: BrowserWindow;

        if (appArgs?.env == "dev") {
            try {
                await webpackDevServerReady("127.0.0.1:3002");
                clientAppServer.startServer(port);
                win = await createWindow("Preload.js");
                win.loadURL("http://127.0.0.1:3002");
                win.webContents.openDevTools();
            }
            catch (err) {
                console.log(err);
            }
        }
        else {
            win = await createWindow("Preload.js");
            win.loadURL(path.join("file://", __dirname, "../renderer/index.html"));
        }

        leagueClient.monitorGameStatus(
            () => {
                win.webContents.send("playerInGame");
            },
            () => {
                win.webContents.send("playerNotInGame");
            }
        )

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
            return await ReadSettings(userFileRootPath);
        })

        ipcMain.on("handleSaveSettings", (event, args) => {
            SaveOrCreateSettings(userFileRootPath, JSON.parse(args));
        })
    })
})