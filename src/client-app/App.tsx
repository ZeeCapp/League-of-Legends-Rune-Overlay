import React, { useState, useEffect } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import axios from "axios"
import { setTimeout, clearTimeout } from "node:timers"

import RuneOverlay from "./RuneOverlay"
import Settings from "./Settings"
import UserSettings, { DisplayType } from "../shared/UserSettings"

const App = () => {
    const [settings, setSettings] = useState<UserSettings>();

    const saveSettings = async (settings: UserSettings) => {
        try {
            await axios.post("/api/settings", settings);
            setSettings(settings);
        }
        catch (e) {
            console.log("Error saving settings:", e);
        }
    }

    useEffect(() => {
        axios.get<UserSettings>("/api/settings")
            .then(async (response) => {
                if (response.status == 200) {
                    setSettings(response.data);
                    return;
                }
                setSettings({ display: DisplayType.vertical, displayDurationSeconds: null });
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
                <Route 
                path='/' 
                element={
                    <RuneOverlay 
                        userSettings={settings} 
                    />} 
                />
            </Routes>
        </BrowserRouter>
    )
}

export default App;