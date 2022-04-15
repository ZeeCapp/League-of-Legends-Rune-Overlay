import React from "react";
import { Rune } from "./shared/Rune";
import "./PrimaryRuneTree.css"

export type PrimaryRuneTreeParams = {
    runes: Rune[],
    horizontal?: boolean
}

export class PrimaryRuneTree extends React.Component<PrimaryRuneTreeParams>{
    render(){
        return(
            <div className={`primaryRuneTreeContainer ${this.props.horizontal ? "horizontal" : "vertical"}`}>
            {
                this.props.runes.map((rune, index) => {
                    return(
                            <img src={rune.imgUrl}  className={index == 0 ? "keystone" : "rune"} key={index} />
                    )
                })
            }
            </div>
        )
    }
}