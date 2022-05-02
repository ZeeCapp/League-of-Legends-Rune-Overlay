import * as tcpPortUsed from "tcp-port-used"

export default async function GetFreePort(defaultPort: number = 4987): Promise<number> {
    let portChosen: boolean = false;
    let currentPort = defaultPort;

    while (!portChosen) {
        let portIsUsed = await tcpPortUsed.check(currentPort, '127.0.0.1');

        if (portIsUsed) {
            currentPort++;
        }
        else {
            portChosen = true;
        }
    }

    return currentPort;
}