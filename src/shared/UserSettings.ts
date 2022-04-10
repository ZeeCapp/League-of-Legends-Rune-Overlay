
enum DisplayType{
    vertical = "vertical",
    horizontal = "horizontal"
}

type UserSettings = {
    display: DisplayType | undefined | null
    displayDurationSeconds: number | undefined | null
}

export default UserSettings;
export { DisplayType }