import React from "react";
import * as echarts from "echarts"
import {Map} from "immutable"

class MyEcharts extends React.Component{
    myChart = null

    render(){
        let {height, width} = this.props.size
        
        return (
            <div ref={curNode => this.box=curNode} style={{height, width}}></div>
        )
    }

    resizeChart = ()=>{
        this.myChart && this.myChart.resize()
    }

    componentDidMount(){
        this.myChart = echarts.init(this.box)
        
        this.myChart.setOption(this.props.option)

        window.addEventListener("resize", this.resizeChart)         //添加窗口尺寸的监听事件
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        let isEqual = Map(prevProps.option) === Map(this.props.option)          //比较前后的option是否发生改变
        if(!isEqual) this.myChart.setOption(this.props.option)
    }

    componentWillUnmount(){
        window.removeEventListener("resize", this.resizeChart)
        if(this.myChart !== null){
            this.myChart.dispose()
            this.myChart = null
        }
    }
}

export default MyEcharts

// 父组件使用的时候需要传递 szie={}  option={}