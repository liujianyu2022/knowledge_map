
import React from "react"
import { Tree } from 'antd';
import type { DataNode, TreeProps } from 'antd/es/tree';
import { CaretDownOutlined } from '@ant-design/icons';
import "./card.less"

interface IProps {
    title: string,
    // lists: Array<{ [list: string]: Array<{ item: string }> }>    // [ {list: [{item}, {}]}, {two: [{}, {}]}]
    lists: Array<DataNode>
}





const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
};

const Card: React.FC<IProps> = (props: IProps) => {
    const { title, lists } = props

    return (
        <div className="card">
            <div className="card-title">{title}</div>

            {/* {
                lists.map((outerObj, index1) => {           // 这里的list取出的是数组中的每一个对象
                    console.log("outerobj", outerObj)
                    return (
                        <ul key={index1}>
                            {
                                outerObj.list.map((innerObj, index2)=>{
                                    return <li key={index2}>{innerObj.item}</li>
                                })
                            }
                        </ul>
                    )
                })
            } */}


            <Tree
                switcherIcon={<CaretDownOutlined />}
                // defaultExpandedKeys={['0-0-0']}
                onSelect={onSelect}
                treeData={lists}
            />
        </div>
    )
}

export default Card

