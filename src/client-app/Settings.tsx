import React from "react";
import UserSettings from "../shared/UserSettings"

const Settings = (props: {userSettings: UserSettings}) => {
    return(
        <div>{JSON.stringify(props.userSettings)}</div>
    )
}

export default Settings;