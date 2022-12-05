import React from 'react';
import Neo4jd3 from '../Neo4jd3';

// import data1 from "../data/data1.json"
// import data2 from "../data/data2.json"
import data3 from "../data/data3.json"

import './neo4jD3Component.css';

import Operator from '../operator/Operator';
import Dropdown from '../dropDown/DropDown';


class Neo4jD3Component extends React.Component {
    state = {
        data: data3,
        zoomTime: 100,
        neo4jd3: null,
    };

    render() {
        let { zoomTime } = this.state
        return (
            <div className="neo4jd3-main">
                <div id="upper">
                    <Operator ref={cur => this.operator = cur} zoomTime={zoomTime} handleZoomTime={this.handleZoomTime} />
                </div>
                <div id="neo4jd3" onContextMenu={this.mapRightClick} onClick={this.mapClick}></div>

                <div id="footer">
                    <Dropdown ref={cur => this.dropdown = cur} handleDropdownClick={this.handleDropdownClick} />
                </div>
            </div>
        );;
    }

    componentDidMount() {
        this.init();
    }

    init = () => {
        let { data, zoomTime, neo4jd3 } = this.state;

        let { nodeClick, relationshipClick } = this.props     //  给组件传递nodeClick和relationshipClick, 用于点击的时候右侧查看

        neo4jd3 = new Neo4jd3('#neo4jd3', {
            highlight: [],
            icons: {},
            images: {},

            minCollision: 60,

            // neo4jDataUrl: './neo4jData.json',
            neo4jData: data,
            nodeRadius: 25,

            minScale: 0.25,
            maxScale: 3,
            scaleStep: 0.25,

            onNodeClick: (node) => {
                console.log("node--", node)
                nodeClick(node)             //单击节点,右侧弹出详情的展示组件
            },

            onNodeRightClick: (node) => {         //节点的右键点击后会触发的函数
                this.dropdown.setState({ currentNodeOrRealtionship: node })
            },

            // onNodeDoubleClick: function (node) {             //节点的双击事件
            //     let maxNodes = 5;
            //     let data = neo4jd3.randomD3Data(node, maxNodes);
            //     neo4jd3.updateWithD3Data(data);
            // },


            onRelationshipClick: function (relationship) {           //连线的点击事件
                console.log("relationship--", relationship)
                relationshipClick(relationship)             //单击连线,右侧弹出详情的展示组件
            },

            onRelationshipRightClick: (relationship) => {           //连线的右键点击后会触发的函数
                this.dropdown.setState({ currentNodeOrRealtionship: relationship })
            },

            // onRelationshipDoubleClick: function (relationship) {        //连线的双击事件
            //     console.log('double click on relationship: ' + JSON.stringify(relationship));
            // },
            // onWheelZoom: function (scale) {     //
            //     console.log("this--",this == neo4jd3)
            //     // this.zoomTime = parseInt(scale * 100);
            //   },

            onWheelZoom: (scale) => {          //滚轮事件  这里用到了该组件的实例是对象，如果想要this指向该实例对象，需要使用箭头函数
                this.setState({ zoomTime: parseInt(scale * 100) })
                this.operator.setState({ zoomTime: parseInt(scale * 100) })           //更新Operator组件中展示的数据
                this.dropdown.cancelDropdown()
            }
        });

        this.setState({ neo4jd3 })
    };

    changeMapZoom = (value) => {
        this.setState({ zoomTime: value }, () => {
            let { neo4jd3, zoomTime } = this.state
            neo4jd3.zoomFit(zoomTime / 100);      //复位和都会调用该函数
        })
    }

    handleZoomTime = (value) => {
        this.changeMapZoom(value)
    }

    mapRightClick = (event) => {          //右键单击map。 如果点击map除了node和relationship的其他区域，应该取消上次弹出的提示框
        event.preventDefault()

        if (this.isClickRelationship(event)) {
            console.log("右键点击了连线")
            let showContent = ["删除关系"]
            this.dropdown.handleContextMenu(showContent, event)
            return;
        }

        if (this.isClickNode(event)) {
            console.log("右键点击了节点")
            let showContent = ["编辑节点", "删除节点", "查看临近节点"]
            this.dropdown.handleContextMenu(showContent, event)         //弹出dropdown
            return;
        }

        console.log("点击了map的其他地方")

        this.dropdown.cancelDropdown()         //调用左键处理函数, 关闭dropdown
    }

    isClickRelationship = (event) => {          //注意：React中使用了合成事件，path是在nativeEvent中的属性
        let path = event.nativeEvent.path;      // event.path表示触发Dom事件的元素一路冒泡到window的所有元素

        for (let i = 0; i < path.length; i++) {
            let cList = path[i].classList;
            if (cList && cList.length > 0 && cList[0] === "relationship") {
                return true;
            }
        }
        return false;
    }

    isClickNode = (event) => {
        let path = event.nativeEvent.path;

        for (let i = 0; i < path.length; i++) {
            let cList = path[i].classList;
            if (cList && cList.length > 0 && cList[0] === "node") {
                return true;
            }
        }
        return false;
    }

    handleDropdownClick = (action, id) => {         //相当于一个回调函数
        if (action === "删除关系") {

        } else if (action === "编辑节点") {

        } else if (action === "删除节点") {

        } else if (action === "查看临近节点") {
            this.getNearNodes(id)
        }
    }


}

export default Neo4jD3Component;
