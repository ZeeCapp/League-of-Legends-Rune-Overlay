import React, { useState, useEffect } from "react";
import MenuItem from '@mui/material/MenuItem';
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Tooltip from "@mui/material/Tooltip"
import Box from "@mui/system/Box";
import HelpOutlinedIcon from '@mui/icons-material/HelpOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CircularProgress from "@mui/material/CircularProgress"

import UserSettings, { DisplayType } from "../shared/UserSettings"
import "./Settings.css"

const Settings = (props: { userSettings: UserSettings, onSettingsSaved: (userSettings: UserSettings) => void }) => {
    const [settings, setUserSettings] = useState<UserSettings>();

    useEffect(() => {
        setUserSettings(props.userSettings);
    }, [props.userSettings]);

    const handleSelectInput = (e) => {
        setUserSettings({ ...settings, display: e.target.value as DisplayType });
    }

    const handleNumberInput = (e) => {
        setUserSettings({ ...settings, displayDurationSeconds: Number.parseInt(e.target.value) });
    }


    if (!settings) {
        return (
            <div className="settings__container">
                <CircularProgress />
            </div>
        )
    }

    return (
        <div className="settings__container">
            <Box sx={{ display: "flex", width: "100%", alignItems: "center" }}>
                <Button sx={{ textDecoration: "none" }} onClick={() => { window.location.pathname = "/" }}>
                    <ArrowBackIcon />
                    <span>Back</span>
                </Button>
            </Box>
            <TextField
                value={settings.display ? settings.display : "vertical"}
                label={"Display orientation"}
                onChange={handleSelectInput}
                select
                fullWidth
            >
                <MenuItem value={"vertical"}>Vertical</MenuItem>
                <MenuItem value={"horizontal"}>Horizontal</MenuItem>
            </TextField>
            <Box sx={{ display: "flex", width: "100%", alignItems: "center" }}>
                <TextField fullWidth type="number" label={"Display duration"} value={settings.displayDurationSeconds ? settings.displayDurationSeconds : ""} onInput={handleNumberInput}></TextField>
                <Tooltip title="For how long should the overly be displayed for after game start (in seconds) - Leave empty or 0 to display for the entire game" sx={{ paddingLeft: "10px", paddingRight: "10px" }}>
                    <HelpOutlinedIcon />
                </Tooltip>
            </Box>
            <Button variant="contained" onClick={() => props.onSettingsSaved(settings)}>Save</Button>
        </div>
    )
}

export default Settings;