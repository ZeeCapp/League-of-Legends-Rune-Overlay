import React, { useState, useEffect } from "react"
import axios from "axios"

import RuneOverlay from "./RuneOverlay"
import UserSettings from "../shared/UserSettings"

function App () {
    const [settings, setSettings] = useState<UserSettings>();

    useEffect(() => {
        axios.get<UserSettings>("/api/settings")
            .then(async (response) => {
                if (response.status == 200) {
                    setSettings(response.data);
                    return;
                }
            })
            .catch((err) => {
                console.log("Error getting settings:", err);
            })
    }, [1])

    return (
        <RuneOverlay
            userSettings={settings}
        />
    )
}

export default App;