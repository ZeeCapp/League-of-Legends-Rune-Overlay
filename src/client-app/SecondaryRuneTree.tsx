import React from "react";
import { Rune } from "./shared/Rune";
import { StatRune } from "./shared/StatRune";
import "./SecondaryRuneTree.css"

export type SecondaryRuneTreeParams = {
    runes: Rune[],
    stats: StatRune[]
}

export class SecondaryRuneTree extends React.Component<SecondaryRuneTreeParams>{
    render(){
        return(
            <div className="secondaryRuneTreeContainer vertical">
            {
                this.props.runes.map((rune, index) => {
                    return(
                        <img src={rune.imgUrl} className="rune" key={"secondaryRune" + index}></img>
                    )
                })
            }

            {
                 this.props.stats.map((stat, index) => {
                    return(
                        <img src={stat.imgUrl} className={index == 0 ? "statRune first" : "statRune"} key={"secondaryStatRune" + index}></img>
                    )
                })
            }
            </div>
        )
    }
}