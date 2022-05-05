import { contextBridge, ipcRenderer } from "electron"

contextBridge.exposeInMainWorld('electronAPI', {
    handleLoadSetting: () => ipcRenderer.invoke('handleLoadSettings'),
    handleSaveSettings: (userSettings: string) => ipcRenderer.send('handleSaveSettings', userSettings),
    playerInGame: (callback) => ipcRenderer.on('playerInGame', callback),
    playerNotInGame: (callback) => ipcRenderer.on("playerNotInGame", callback),
    getCurrentPort: () => ipcRenderer.invoke('getCurrentPort')
})