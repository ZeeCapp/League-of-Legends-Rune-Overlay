import axios, { AxiosInstance } from "axios";
import { setInterval } from "node:timers"
import * as https from "node:https"

export default class LeagueClient {
    axiosInstance: AxiosInstance = axios.create({
        httpsAgent: new https.Agent({  
            rejectUnauthorized: false
        })
    });

    private  async checkCurrentGameStatus(onPlayerInGame: () => void, onPlayerNotInGame: () => void) {
        try {
            let result = await this.axiosInstance.get("https://127.0.0.1:2999/liveclientdata/gamestats", {});

            if (result.status == 200) {
                onPlayerInGame();
            }
            else {
                onPlayerNotInGame();
            }
        }
        catch {
            onPlayerNotInGame();
        }
    }

    monitorGameStatus(onPlayerInGame: () => void, onPlayerNotInGame: () => void){
        setInterval(() => {this.checkCurrentGameStatus(onPlayerInGame, onPlayerNotInGame)}, 1000);
    }
}