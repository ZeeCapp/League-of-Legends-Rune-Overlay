import React from "react";
import { Rune } from "./shared/Rune";
import "./PrimaryRuneTree.css"

export type PrimaryRuneTreeParams = {
    runes: Rune[]
}

export class PrimaryRuneTree extends React.Component<PrimaryRuneTreeParams>{
    render(){
        return(
            <div className="primaryRuneTreeContainer vertical">
            {
                this.props.runes.map((rune, index) => {
                    return(
                        <img src={rune.imgUrl} className={index == 0 ? "keystone" : "rune"} key={index}></img>
                    )
                })
            }
            </div>
        )
    }
}