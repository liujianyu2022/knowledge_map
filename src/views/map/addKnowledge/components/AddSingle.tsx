import React from "react"
import { Button, Select } from "antd";
import PubSub from 'pubsub-js'
import NodeInfo from "./NodeInfo";
import exampleImg from "../../../../images/addknowledge-example.png"


import "./addSingle.less"


interface IProps {
    showExplain: boolean
}

export interface Options{
    value: string,
    label:string
}

export interface INode {
    typeOfNode: string,
    nameOfNode: string, 
    descriptionOfNode?: string
}

const AddSingle: React.FC<IProps> = (props: IProps) => {
    let { showExplain } = props
    let [relationship, setRelationship] = React.useState<Options[]>([])
    let [typeOfObject, setTypeOfObject] = React.useState<Options[]>([])

    const [subject, setSubject] = React.useState<INode>({typeOfNode:"", nameOfNode:"", descriptionOfNode:""})
    const [valueOfRelationship, setValueOfRelationship] = React.useState<string>("")
    const [object, setObject] = React.useState<INode>({typeOfNode:"", nameOfNode:"", descriptionOfNode:""})

    const selected = (value: any)=>{
        if (value === "缺陷") {
            relationship = [{ value: "产生原因", label: "产生原因" }]
            typeOfObject = [{ value: "轧制阶段原因", label: "轧制阶段原因" }, { value: "连铸阶段原因", label: "连铸阶段原因" }, { value: "物料原因", label: "物料原因" }]
        } else if(value === "轧制阶段原因"){
            relationship = [{ value: "产生原因", label: "产生原因" }, { value: "导致", label: "导致" }]
            typeOfObject = [{ value: "轧制阶段原因", label: "轧制阶段原因" }, { value: "连铸阶段原因", label: "连铸阶段原因" }, { value: "物料原因", label: "物料原因" }]
        } else if(value === "连铸阶段原因"){
            relationship = [{ value: "产生原因", label: "产生原因" }, { value: "导致", label: "导致" }]
            typeOfObject = [{ value: "连铸阶段原因", label: "连铸阶段原因" }]
        } else if(value === "物料原因"){
            relationship = [{ value: "产生原因", label: "产生原因" }]
            typeOfObject = [{ value: "轧制阶段原因", label: "轧制阶段原因" }, { value: "连铸阶段原因", label: "连铸阶段原因" }]
        } else {
            relationship = [{ value: "产生原因", label: "产生原因" }, { value: "导致", label: "导致" }]
            typeOfObject = [{ value: "轧制阶段原因", label: "轧制阶段原因" }, { value: "连铸阶段原因", label: "连铸阶段原因" }, { value: "物料原因", label: "物料原因" }]
        }
        setRelationship(relationship)
        setTypeOfObject(typeOfObject)
    }

    const subjectCancel = ()=>{         // 当主语节点 点击了 取消添加的回调， 关闭relationship和objectNode
        relationship = []
        typeOfObject = []
        setRelationship(relationship)
        setTypeOfObject(typeOfObject)
    }

    const relationshipSelected = (value: string)=>{
        PubSub.publish("relationshipSelected", true)            // 发布消息,让 "添加宾语节点" 字样变成正常的
        setValueOfRelationship(value)
    }

    const submit = () => {
        let {typeOfNode: typeOfSubject, nameOfNode: nameOfSubject, descriptionOfNode: descriptionOfSubject} = subject
        let {typeOfNode: typeOfObject, nameOfNode: nameOfObject, descriptionOfNode: descriptionOfObject} = object
        let res = {typeOfSubject, nameOfSubject, descriptionOfSubject, valueOfRelationship, typeOfObject, nameOfObject, descriptionOfObject}

        console.log("res----", res)
    }

    return (
        <div className="addsingle">
            <div className="example">
                {showExplain ? null : (
                    <div>
                        <div className="example-content">
                            777777777777
                        </div>
                        <div className="example-img"><img src={exampleImg} ></img></div>
                    </div>
                )}
            </div>

            <div className="addsingle-node">
                <div className="node-title">
                    <span>知识信息填写</span>
                </div>

                <div className="node-content">
                    <div className="node-left">
                        <NodeInfo nodeType="subject" selected={selected} subjectCancel={subjectCancel} setSubject={setSubject} />
                    </div>
                    <div className="node-middle">
                        <span> → 关系 </span>
                        <Select placeholder="请选择"  style={{ width: '100%' }} options={relationship} onChange={relationshipSelected}></Select>
                    </div>
                    <div className="node-right">
                        <NodeInfo nodeType="object" typeOfObject={typeOfObject} setObject={setObject} />
                    </div>
                </div>

            </div>
                    
            <div className="addsingle-submit">
                    <Button type="primary" onClick={submit}>提交知识</Button>
            </div>
        </div>
    )
}

export default AddSingle