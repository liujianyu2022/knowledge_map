import React from "react"

import MyChart from "../../../components/echarts/MyEcharts"

import obj from "./temp"

function Track(){
    return (
        <div className="track">

            <MyChart size={ {height: "600px", width:"600px"}} option={obj} />
        </div>
    )
}

export default Track