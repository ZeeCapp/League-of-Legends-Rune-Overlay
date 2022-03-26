import React, { useState, useEffect } from "react"
import RuneOverlay from "./RuneOverlay"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Settings from "./Settings"
import UserSettings from "../shared/UserSettings"
import axios from "axios"

const App = () => {
    const [settings, setSettings] = useState<UserSettings>();

    useEffect(() => {
        axios.get("/api/settings")
        .then((response)=>{
            console.log(response.data);
            setSettings(response.data);
        })
        .catch((err)=>{
            console.log("Error getting settings");
        })
    }, [1])

    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/settings"} element={
                <Settings userSettings={settings}></Settings>
                }/>
                <Route path='/' element={<RuneOverlay />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;