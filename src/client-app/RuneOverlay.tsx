import React from "react"
import axios from "axios"

import { PrimaryRuneTree, PrimaryRuneTreeParams } from "./PrimaryRuneTree";
import { SecondaryRuneTree, SecondaryRuneTreeParams } from "./SecondaryRuneTree";

import "./RuneOverlay.css"

const DDragonBaseUrl: string = "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/";

type RuneOverlayState = {
    runesData: any
    playerInGame: boolean,
    primaryRuneTreeData: PrimaryRuneTreeParams | undefined,
    secondaryRuneTreeData: SecondaryRuneTreeParams | undefined
}

export default class RuneOverlay extends React.Component<{}, RuneOverlayState>{
    constructor(props: object) {
        super(props);

        this.state = {
            playerInGame: false,
            runesData: {},
            primaryRuneTreeData: undefined,
            secondaryRuneTreeData: undefined
        }
    }

    checkForGameTimer: NodeJS.Timeout | null = null;

    async checkForGame() {
        try {
            let result = (await axios.get("/api/riot-client-proxy/liveclientdata/activeplayerrunes"));
            if (result.status == 200) {
                let parsedRunes = this.parseRuneData(result.data);
                this.setState({ playerInGame: true, primaryRuneTreeData: parsedRunes[0], secondaryRuneTreeData: parsedRunes[1] });
            }
            else {
                this.setState({ playerInGame: false })
            }
        }
        catch {
            console.log("Error");
            this.setState({ playerInGame: false });
        }
    }

    async getAllRunesData() {
        this.setState({ runesData: (await axios.get(`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perks.json`)).data });
        console.log(this.state.runesData);
    }

    getRuneIconLinkWithId(runeId: number): string {
        let runeIconUrl = "";

        this.state.runesData.forEach((rune) => {
            if (rune.id === runeId) {
                runeIconUrl = `${DDragonBaseUrl}${(rune.iconPath as string).replace("/lol-game-data/assets/v1/", "").toLowerCase()}`;
            }
        })

        return runeIconUrl;
    }

    parseRuneData(runeData: any): [PrimaryRuneTreeParams, SecondaryRuneTreeParams] {
        let primaryTreeRunes: PrimaryRuneTreeParams = { runes: [] };
        let secondaryTreeRunes: SecondaryRuneTreeParams = { runes: [], stats: [] };

        (runeData.generalRunes as Array<any>).slice(0, 4).forEach((rune, index) => {
            primaryTreeRunes.runes.push({ id: rune.id, imgUrl: this.getRuneIconLinkWithId(rune.id) })
        });

        (runeData.generalRunes as Array<any>).slice(4, 6).forEach((rune, index) => {
            secondaryTreeRunes.runes.push({ id: rune.id, imgUrl: this.getRuneIconLinkWithId(rune.id) })
        });

        (runeData.statRunes as Array<any>).forEach((statRune, index) => {
            secondaryTreeRunes.stats.push({ id: statRune.id, imgUrl: this.getRuneIconLinkWithId(statRune.id) })
        });

        return [primaryTreeRunes, secondaryTreeRunes];
    }

    componentDidMount() {
        this.getAllRunesData().then(() => {
            this.checkForGame();
            this.checkForGameTimer = setInterval(() => { this.checkForGame() }, 5000);
        })
    }

    componentWillUnmount() {
        if (this.checkForGameTimer) clearInterval(this.checkForGameTimer);
    }

    render() {
        if (this.state.playerInGame && this.state.primaryRuneTreeData && this.state.secondaryRuneTreeData) {
            return (
                <div className="runesContainer">
                    <PrimaryRuneTree {...this.state.primaryRuneTreeData}></PrimaryRuneTree>
                    <SecondaryRuneTree {...this.state.secondaryRuneTreeData}></SecondaryRuneTree>
                </div>
            )
        }
        else {
            return null;
        }
    }
}