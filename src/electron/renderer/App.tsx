import React, { useState, useEffect } from "react"
import { HashRouter, Routes, Route } from "react-router-dom"

import WaitScreen from "./WaitScreen"
import Settings from "./Settings"

const App = () => {
    const [playerInGame, setPlayerInGame] = useState<boolean>(false);

    useEffect(() => {
        window.electronAPI.playerInGame(() => { setPlayerInGame(true) });
        window.electronAPI.playerNotInGame(() => { setPlayerInGame(false) });
    }, [])

    return (
        <HashRouter>
            <Routes>
                <Route path="/settings" element={
                    <Settings></Settings>
                } />
                <Route
                    path='/'
                    element={
                        <WaitScreen playerInGame={playerInGame}></WaitScreen>
                    }
                />
            </Routes>
        </HashRouter>
    )
}

export default App;