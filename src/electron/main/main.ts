import { app, BrowserWindow } from "electron"
import * as minimist from "minimist"
import webpackDevServerReady from "./WebpackDevServerHelper";

const appArgs: any = minimist(process.argv.slice(2));

const createWindow = () => {
    const win = new BrowserWindow({
        width: 1000,
        height: 600,
        autoHideMenuBar: true
    })

    if(appArgs?.env == "dev"){
        webpackDevServerReady("127.0.0.1:3002").then(()=>{
            win.loadURL("127.0.0.1:3002");
        })     
    }
    else{
        win.loadFile('../renderer/index.html');
    } 
}

app.whenReady().then(() => {
    createWindow();
})