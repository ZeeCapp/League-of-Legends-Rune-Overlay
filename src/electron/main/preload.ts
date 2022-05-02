import { contextBridge, ipcRenderer } from "electron"

contextBridge.exposeInMainWorld('electronAPI', {
    handleLoadSetting: () => ipcRenderer.invoke('handleLoadSettings'),
    handleSaveSettings: (userSettings: string) => ipcRenderer.send('handleSaveSettings', userSettings),
    handlePlayerInGame: (callback) => ipcRenderer.on('handlePlayerInGame', callback),
    getCurrentPort: () => ipcRenderer.invoke('getCurrentPort')
})