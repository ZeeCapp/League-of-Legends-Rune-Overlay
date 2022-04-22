import * as fs from "fs"

import UserSettings from "../../shared/UserSettings"

async function writeFileAsync(path, data): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        fs.writeFile(
            path,
            JSON.stringify(data), 
            (err) => { 
                if(err) reject();
                resolve();
            });
    })
}

async function readFileAsync(path): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        fs.readFile(
            path,
            {encoding: "utf8"},
            (err, data) => { 
                if(err) reject(err);
                resolve(data);
            });
    })
}

async function SaveOrCreateSettings(settings: any) {
    fs.access("settings.json", async (err) => {
        if (err) {
            await writeFileAsync("settings.json", settings);
        }
        else{
            const result = JSON.parse(await readFileAsync("settings.json"));
            const newSettings = {...result, ...settings};
            await writeFileAsync("settings.json", newSettings)
        }
    })
}

async function ReadSettings(): Promise<UserSettings | null> {
    return new Promise<any|null>((resolve, reject) => {
        fs.access("settings.json", async (err) => {
            if(err) {
                resolve(null);
                return;
            };
            resolve(JSON.parse(await readFileAsync("settings.json")));
        })
    })
}

export {SaveOrCreateSettings, ReadSettings}