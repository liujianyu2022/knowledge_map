import React from "react"
import logo from "../../images/logo.png"
import "./head.less"

function Head(){
    return (
        <div className="head">
            <div className="left">
                <img src={logo} alt="" />
                <span>钢铁质量溯源知识图谱</span>
            </div>
            <div className="right">
                hello
            </div>
        </div>
    )
}

export default Head