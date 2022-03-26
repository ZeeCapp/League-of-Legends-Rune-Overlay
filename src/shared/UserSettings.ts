
enum DisplayType{
    vertical = "vertical",
    horizontal = "horizontal"
}

type UserSettings = {
    display: DisplayType | undefined
    displayForMS: number | undefined
}

export default UserSettings;
export { DisplayType }