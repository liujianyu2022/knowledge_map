import React from "react"
import { Button } from 'antd';
import { ZoomOutOutlined, ZoomInOutlined, AimOutlined } from '@ant-design/icons'
import "./operator.less"

export default class Operator extends React.Component {
    state = {
        zoomTime: this.props.zoomTime,
        num: 100,
        step: 25,
        maxNum: 300,
        minNum: 25,
        mode: "map"
    }

    render() {
        let { zoomTime, mode } = this.state

        return (
            <div className="operator">
                <div className="operator-left">
                    <Button type="text" size="small" onClick={this.changeMode}>{mode === 'map' ? '切换到路径展示' : '切换到图谱展示'}</Button>
                </div>

                <div className="operator-right">
                    <Button type="primary" shape="circle" icon={<ZoomOutOutlined />} size="small" onClick={this.minus} /> &nbsp;
                    <span style={{ fontSize: "18px" }}>{zoomTime}%</span> &nbsp;
                    <Button type="primary" shape="circle" icon={<ZoomInOutlined />} size="small" onClick={this.add} /> &nbsp;
                    <Button type="primary" shape="circle" icon={<AimOutlined />} size="small" onClick={this.reposition} />
                </div>
            </div>
        )
    }

    minus = () => {
        let { minNum, step, zoomTime } = this.state
        let { handleZoomTime } = this.props

        zoomTime -= step

        if (zoomTime <= minNum) zoomTime = minNum

        this.setState({ zoomTime }, () => {
            handleZoomTime(zoomTime)
        })
    }
    add = () => {
        let { handleZoomTime } = this.props
        let { maxNum, step, zoomTime } = this.state
        zoomTime += step
        if (zoomTime >= maxNum) zoomTime = maxNum

        this.setState({ zoomTime }, () => {
            handleZoomTime(zoomTime)
        })
    }

    reposition = () => {
        let { handleZoomTime } = this.props
        let { num } = this.state
        this.setState({ zoomTime: num }, () => {
            handleZoomTime(num)
        })
    }

    changeMode = () => {
        let { mode } = this.state

        if (mode === "map") {
            mode = "list"
        } else {
            mode = "map"
        }

        this.setState({ mode })
    }
}