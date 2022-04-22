import { app, BrowserWindow } from "electron"

const createWindow = () => {
    const win = new BrowserWindow({
        width: 1000,
        height: 600,
        autoHideMenuBar: true
    })

    win.loadFile('../renderer/index.html');
}

app.whenReady().then(() => {
    createWindow();
})