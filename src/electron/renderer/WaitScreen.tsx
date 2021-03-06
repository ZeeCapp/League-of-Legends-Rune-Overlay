/// <reference types="../main/Preload" />

import React, { useState, useEffect } from "react"
import CircularProgress from "@mui/material/CircularProgress"
import Box from "@mui/system/Box";
import Button from "@mui/material/Button"
import { Link } from "react-router-dom";

const WaitingForGameIndicator = () => {
    return (
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
    return (
        <span>Player is currently in-game</span>
    )
}

const WaitScreen = (props: {playerInGame: boolean}) => {
    const [port, setPort] = useState<number>();

    useEffect(() => {
        window.electronAPI.getCurrentPort().then(port => setPort(port));
    }, [])

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
            {props.playerInGame ? <PlayerInGameIndicator /> : <WaitingForGameIndicator />}
            <span style={{
                marginTop: "100px"
            }}>
                Overlay is available at <strong>127.0.0.1:{port}</strong>
            </span>
            <Box>
                <Link to="/settings">
                    <Button sx={{ textDecoration: "none" }}>
                        <span>Settings</span>
                    </Button>
                </Link>
            </Box>
        </div >
    )
}

export default WaitScreen;