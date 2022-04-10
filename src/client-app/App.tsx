import React, { useState, useEffect } from "react"
import RuneOverlay from "./RuneOverlay"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Settings from "./Settings"
import UserSettings, {DisplayType} from "../shared/UserSettings"
import axios from "axios"

const App = () => {
    const [settings, setSettings] = useState<UserSettings>();

    const saveSettings = async (settings: UserSettings) => {
        try {
            await axios.post("/api/settings", settings);
            setSettings(settings);
        }
        catch(e){
            console.log("Error saving settings:", e);
        }
    }

    useEffect(() => {
        axios.get("/api/settings")
            .then(async (response) => {
                if(response.status == 200){
                    setSettings(response.data);
                    return;
                }
                setSettings({display: DisplayType.vertical, displayDurationSeconds: null});
            })
            .catch((err) => {
                console.log("Error getting settings:", err);
            })
    }, [1])

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/settings" element={
                    <Settings userSettings={settings} onSettingsSaved={saveSettings}></Settings>
                } />
                <Route path='/' element={<RuneOverlay />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;