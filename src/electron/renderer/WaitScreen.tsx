/// <reference types="../main/Preload" />

import React, { useState, useEffect } from "react"
import CircularProgress from "@mui/material/CircularProgress"
import Box from "@mui/system/Box";
import Button from "@mui/material/Button"
import { Link } from "react-router-dom";
import { ipcRenderer } from "electron";

const WaitingForGameIndicator = () => {
    return(
        <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "20px"
        }}>
            <span>Waiting for a game...</span>
            <CircularProgress></CircularProgress>
        </div>
    )
}

const PlayerInGameIndicator = () => {
    return(
            <span>Player is currently in-game</span>
    )
}

const WaitScreen = () => {
    const [port, setPort] = useState<number>();
    const [playerInGame, setPlayerInGame] = useState<boolean>(false);

    useEffect(() => {
        window.electronAPI.getCurrentPort().then(port => setPort(port));
    }, [])

    window.electronAPI.playerInGame((event, value) => {
        setPlayerInGame(true)
    });

    window.electronAPI.playerNotInGame((event, value) => {
        setPlayerInGame(false)
    });

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            fontFamily: "Roboto",
            fontWeight: "200",
            fontSize: "1.5em",
            height: "90vh",
            gap: "20px"
        }}>
            {playerInGame ? <PlayerInGameIndicator/> : <WaitingForGameIndicator/>}
            <span style={{
                marginTop: "100px"
            }}>
                Overlay is available at <strong>127.0.0.1:{port}</strong>
            </span>
            <Box>
                <Link to={"/settings"}>
                    <Button sx={{ textDecoration: "none" }}>
                        <span>Settings</span>
                    </Button>
                </Link>
            </Box>
        </div >
    )
}

export default WaitScreen;