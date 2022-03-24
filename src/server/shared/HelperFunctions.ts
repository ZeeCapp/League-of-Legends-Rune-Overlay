import * as tcpPortUsed from "tcp-port-used"
import * as readline from "readline"
import * as fs from "fs"

export async function GetFreePort(defaultPort: number = 3000): Promise<number> {
    let portChosen: boolean = false;
    let currentPort = defaultPort;
    let prompt = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    while (!portChosen) {
        let portIsUsed = await tcpPortUsed.check(currentPort, '127.0.0.1');

        if (portIsUsed) {
            console.log(`port ${currentPort} is used!`)

            let port = await new Promise<string>((resolve, reject) => {
                prompt.question("Please, enter a new port:", port => {
                    resolve(port);
                });
            })

            currentPort = Number.parseInt(port);
        }
        else {
            portChosen = true;
        }

        return currentPort;
    }

}

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

export async function SaveOrCreateSettings(settings: any) {
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

export async function ReadSettings(): Promise<any|null> {
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