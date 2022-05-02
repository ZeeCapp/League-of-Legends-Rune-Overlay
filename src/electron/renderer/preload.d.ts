import UserSettings from "../../shared/UserSettings"

export interface IElectronAPI {
    handleLoadSetting: () => Promise<UserSettings>,
    handleSaveSettings: (settings: UserSettings) => Promise<void>,
    handlePlayerInGame: (callback) => void,
    getCurrentPort: () => Promise<number>
}

declare global {
    interface Window {
        electronAPI: IElectronAPI
    }
}