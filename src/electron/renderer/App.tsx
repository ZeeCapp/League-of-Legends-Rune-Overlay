import React from "react"
import { HashRouter, Routes, Route } from "react-router-dom"

import WaitScreen from "./WaitScreen"
import Settings from "./Settings"

const App = () => {
    return (
    <HashRouter>
        <Routes>
            <Route path="/settings" element={
                <Settings onSettingsSaved={(settings)=>{}}></Settings>
            } />
            <Route 
            path='/' 
            element={
              <WaitScreen></WaitScreen>
            } 
            />
        </Routes>
    </HashRouter>
    )
}

export default App;