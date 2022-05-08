/// <reference types="../main/Preload" />

import React, { useState, useEffect } from "react";
import MenuItem from '@mui/material/MenuItem';
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Tooltip from "@mui/material/Tooltip"
import Box from "@mui/system/Box";
import HelpOutlinedIcon from '@mui/icons-material/HelpOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CircularProgress from "@mui/material/CircularProgress"
import { Link } from "react-router-dom";

import UserSettings, { DisplayType } from "../../shared/UserSettings"
import "./Settings.css"

const Settings = () => {
    const [settings, setUserSettings] = useState<UserSettings>();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        window.electronAPI.handleLoadSetting()
            .then(settings => {
                setUserSettings(settings);
                setIsLoading(false);
            })
            .catch(err => {
                window.alert("Error loading settings " + err);
            })
    }, [])

    const saveSettings = (settings: UserSettings) => {
        window.electronAPI.handleSaveSettings(JSON.stringify(settings));
    }

    const handleSelectInput = (e) => {
        setUserSettings({ ...settings, display: e.target.value as DisplayType });
    }

    const handleNumberInput = (e) => {
        setUserSettings({ ...settings, displayDurationSeconds: Number.parseInt(e.target.value) });
    }

    if (isLoading) return (
        <Box sx={{ 
            display: "flex",
            flexDirection: "column", 
            height: "90vh", 
            width: "100%", 
            alignItems: "center", 
            justifyContent: "center", 
            fontFamily: "Roboto",
            fontWeight: "200",
            fontSize: "1.5em", 
            gap: "20px"
            }}>
            <span>Loading settings...</span>
            <CircularProgress></CircularProgress>
        </Box>
    )

    return (
        <div className="settings__container">
            <Box sx={{ display: "flex", width: "100%", alignItems: "center" }}>
                <Link to={"/"}>
                    <Button sx={{ textDecoration: "none" }} onClick={() => { window.location.pathname = "/" }}>
                        <ArrowBackIcon />
                        <span>Back</span>
                    </Button>
                </Link>
            </Box>
            <TextField
                value={settings?.display ? settings.display : "vertical"}
                label={"Display orientation"}
                onChange={handleSelectInput}
                select
                fullWidth
            >
                <MenuItem value={"vertical"}>Vertical</MenuItem>
                <MenuItem value={"horizontal"}>Horizontal</MenuItem>
            </TextField>
            <Box sx={{ display: "flex", width: "100%", alignItems: "center" }}>
                <TextField fullWidth type="number" label={"Display duration"} value={settings?.displayDurationSeconds ? settings.displayDurationSeconds : ""} onInput={handleNumberInput}></TextField>
                <Tooltip title="For how long should the overly be displayed for after game start (in seconds) - Leave empty or 0 to display for the entire game" sx={{ paddingLeft: "10px", paddingRight: "10px" }}>
                    <HelpOutlinedIcon />
                </Tooltip>
            </Box>
            <Button variant="contained" onClick={() => {saveSettings(settings)}}>Save</Button>
        </div>
    )
}

export default Settings;