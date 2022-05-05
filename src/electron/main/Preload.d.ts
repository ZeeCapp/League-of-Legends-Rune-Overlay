import UserSettings from "../../shared/UserSettings"

export interface IElectronAPI {
    handleLoadSetting: () => Promise<UserSettings>,
    handleSaveSettings: (settings: string) => Promise<void>,
    playerInGame: (callback) => void,
    playerNotInGame: (callback) => void,
    getCurrentPort: () => Promise<number>
}

declare global {
    interface Window {
        electronAPI: IElectronAPI
    }
}