import { app, BrowserWindow } from "electron"
import * as minimist from "minimist"
import webpackDevServerReady from "./WebpackDevServerHelper";

const appArgs: any = minimist(process.argv.slice(2));

const createWindow = async () => {
    const win = new BrowserWindow({
        width: 1000,
        height: 600,
        autoHideMenuBar: appArgs?.env != "dev" ? true : false
    })

    if(appArgs?.env == "dev"){        
        try{
            await webpackDevServerReady("127.0.0.1:3002");
            win.loadURL("http://127.0.0.1:3002");
            win.webContents.openDevTools();
        } 
        catch(err){
            console.log(err);
        }    
    }
    else{
        win.loadFile('../renderer/index.html');
    } 
}

app.whenReady().then(() => {
    createWindow();
})