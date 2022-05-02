import { app, BrowserWindow, ipcMain } from "electron"
import * as path from "path"
import * as minimist from "minimist"
import webpackDevServerReady from "./WebpackDevServerHelper";

const appArgs: any = minimist(process.argv.slice(2));
const port = 3000;

const createWindow = async (preloadPath?: string) => {
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

app.whenReady().then(async () => {

    let win: BrowserWindow;

    if(appArgs?.env == "dev"){        
        try{
            await webpackDevServerReady("127.0.0.1:3002");
            win = await createWindow(path.join(__dirname, "./preload.js"));
            win.loadURL("http://127.0.0.1:3002");
            win.webContents.openDevTools();
        } 
        catch(err){
            console.log(err);
        }    
    }
    else{
        win = await createWindow();
        win.loadFile('../renderer/index.html');
    } 

    ipcMain.handle("getCurrentPort", ()=>{
        return port;
    })
})