import React from "react"
import axios from "axios"

import { PrimaryRuneTree, PrimaryRuneTreeParams } from "./PrimaryRuneTree";
import { SecondaryRuneTree, SecondaryRuneTreeParams } from "./SecondaryRuneTree";
import UserSettings, { DisplayType } from "../shared/UserSettings"
import "./RuneOverlay.css"

const DDragonBaseUrl: string = "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/";

type RuneOverlayState = {
    runesData: any,
    timerFinished: boolean,
    displayed: boolean,
    primaryRuneTreeData: PrimaryRuneTreeParams | undefined,
    secondaryRuneTreeData: SecondaryRuneTreeParams | undefined
}

export default class RuneOverlay extends React.Component<{ userSettings?: UserSettings }, RuneOverlayState>{
    constructor(props) {
        super(props);

        this.state = {
            displayed: false,
            timerFinished: false,
            runesData: {},
            primaryRuneTreeData: undefined,
            secondaryRuneTreeData: undefined
        }
    }


    checkForGameTimer: NodeJS.Timeout | undefined = null;
    displayTimer: NodeJS.Timer | null = null;

    async checkForGame() {
        try {
            let result = await axios.get("/api/riot-client-proxy/liveclientdata/activeplayerrunes");

            if (result.status == 200) {
                let parsedRunes = this.parseRuneData(result.data);
                this.setState({
                    primaryRuneTreeData: parsedRunes[0],
                    secondaryRuneTreeData: parsedRunes[1],
                    displayed: !this.state.timerFinished ? true : false
                });

                if (this.props.userSettings.displayDurationSeconds && !this.state.timerFinished)
                    this.displayTimer = setTimeout(() => { this.setState({ timerFinished: true, displayed: false }) }, this.props.userSettings.displayDurationSeconds * 1000);
            }
            else {
                if (this.displayTimer?.hasRef()) clearTimeout(this.displayTimer);
                this.setState({ displayed: false, timerFinished: false })
            }
        }
        catch {
            this.setState({ displayed: false, timerFinished: false });
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
        if (this.displayTimer) clearTimeout(this.displayTimer);
    }

    render() {
        if (this.state.displayed && this.state.primaryRuneTreeData && this.state.secondaryRuneTreeData) {
            return (
                <div className={`runesContainer ${this.props.userSettings.display == DisplayType.horizontal ? "horizontal" : ""}`}>
                    <PrimaryRuneTree {...this.state.primaryRuneTreeData} horizontal={this.props.userSettings.display == DisplayType.horizontal ? true : false} />
                    <SecondaryRuneTree {...this.state.secondaryRuneTreeData} horizontal={this.props.userSettings.display == DisplayType.horizontal ? true : false} />
                </div>
            )
        }
        else {
            return null;
        }
    }
}