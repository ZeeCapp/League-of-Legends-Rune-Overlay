const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    handleLoadSetting: () => ipcRenderer.invoke('handleLoadSetting'),
    handleSaveSettings: () => ipcRenderer.invoke('handleSaveSettings'),
    handlePlayerInGame: (callback) => ipcRenderer.on('handlePlayerInGame', callback),
    getCurrentPort: () => ipcRenderer.invoke('getCurrentPort')
})