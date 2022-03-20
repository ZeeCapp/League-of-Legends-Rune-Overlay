import * as tcpPortUsed from "tcp-port-used"
import * as readline from "readline"

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