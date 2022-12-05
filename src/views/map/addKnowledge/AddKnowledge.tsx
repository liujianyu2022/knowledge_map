import React from "react"
import { Radio, Button } from 'antd';
import type { RadioChangeEvent } from "antd"

import AddSingle from "./components/AddSingle";
import AddMultiple from "./components/AddMultiple";
import "./addKnowledge.less"




const AddKnowledge: React.FC = () => {
    let [showExplain, setShowExplain] = React.useState<boolean>(true)
    let [valueOfTypeAdd, setValueOfTypeAdd] = React.useState<string>("单个新增")

    const typeOfAdd = (event: RadioChangeEvent) => {
        setValueOfTypeAdd(event.target.value)
    }

    return (
        <div className="addKnowledge">
            <div className="title"> 新增知识 </div>
            <div className="main">
                <div className="upper">
                    <div className="upper-left">
                        <Radio.Group defaultValue="单个新增" buttonStyle="solid" onChange={typeOfAdd}>
                            <Radio.Button value="单个新增" >单个新增</Radio.Button>
                            <Radio.Button value="批量新增" >批量新增</Radio.Button>
                        </Radio.Group>
                    </div>
                    <div className="upper-right">
                        {valueOfTypeAdd === "单个新增" ? <Button onClick={() => setShowExplain(!showExplain)}>{showExplain ? `展开说明` : `关闭说明`}</Button> : null}
                    </div>
                </div>

                {valueOfTypeAdd === "单个新增" ? <AddSingle showExplain={showExplain} /> : <AddMultiple />}
            </div>

            
        </div>
    )
}

export default AddKnowledge
