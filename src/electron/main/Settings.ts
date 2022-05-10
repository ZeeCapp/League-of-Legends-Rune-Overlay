import * as fs from "fs"
import * as path from "node:path/win32"

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

async function SaveOrCreateSettings(dir: string, settings: UserSettings) {
    fs.access(path.join(dir, "settings.json"), async (err) => {
        if (err) {
            await writeFileAsync(path.join(dir, "settings.json"), settings);
        }
        else{
            const result = JSON.parse(await readFileAsync(path.join(dir, "settings.json")));
            const newSettings = {...result, ...settings};
            await writeFileAsync(path.join(dir, "settings.json"), newSettings)
        }
    })
}

async function ReadSettings(dir: string): Promise<UserSettings | null> {
    return new Promise<any|null>((resolve, reject) => {
        fs.access(path.join(dir, "settings.json"), async (err) => {
            if(err) {
                resolve(null);
                return;
            };
            resolve(JSON.parse(await readFileAsync(path.join(dir, "settings.json"))));
        })
    })
}

export {SaveOrCreateSettings, ReadSettings}