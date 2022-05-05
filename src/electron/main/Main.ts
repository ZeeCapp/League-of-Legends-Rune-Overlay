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
    console.log(preloadPath ? path.join(__dirname, preloadPath) : undefined);

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
        const clientAppServer = new ClientAppServer();
        const leagueClient = new LeagueClient();

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
            win.loadFile(path.join(__dirname, "../renderer/index.html"));
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
            return await ReadSettings();
        })

        ipcMain.on("handleSaveSettings", (event, args) => {
            console.log(args);
            SaveOrCreateSettings(JSON.parse(args));
        })
    })
})