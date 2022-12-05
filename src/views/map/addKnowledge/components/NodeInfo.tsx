import React from "react"
import { Button, Form, Input, Select } from "antd"
import PubSub from "pubsub-js"
import subjectNode from "../../../../images/subject-node.png"
import objectNode from "../../../../images/object-node.png"

import { typeOfSubject } from "../../../../components/table/options"
import type { Options, INode } from "./AddSingle"

import "./nodeInfo.less"


interface IProps {
    nodeType: "subject" | "object"
    selected?: (value: any) => void
    typeOfObject?: Array<Options>
    subjectCancel?: () => void

    setSubject?: (subject: INode) => void           // 收集subject的form表单的信息
    setObject?: (object: INode) => void
}




const NodeInfo: React.FC<IProps> = (props: IProps) => {
    let { nodeType, selected, typeOfObject, subjectCancel, setSubject, setObject } = props

    const [showObject, setShowObject] = React.useState<boolean>(false)          //控制宾语节点卡片上的 "添加宾语节点" 字样是否可用
    const [hasSubject, setHasSubject] = React.useState<boolean>(false)          // 控制NodeInfo组件，显示图片还是Form表单
    const [hasObject, setHasObject] = React.useState<boolean>(false)

    const [subjectFormDisable, setSubjectFormDisable] = React.useState<boolean>(false)          // 控制 form表单组件是否处于禁用状态
    const [objectFormDisable, setObjectFormDisable] = React.useState<boolean>(false)



    React.useEffect(() => {
        let pub = PubSub.subscribe("relationshipSelected", (messageName: string, value: boolean) => {     //第一个参数为事件名， 第二个是发布的值
            setShowObject(true)
        })
        return () => {
            PubSub.unsubscribe(pub)
        }
    }, [])

    const layout = {
        labelCol: { span: 6 },    // label 标签布局，同 <Col> 组件，设置 span offset 值，如 {span: 3, offset: 12} 可以通过 Form 的 labelCol 进行统一设置，不会作用于嵌套 Item
        wrapperCol: { span: 18 },   // 需要为输入控件设置布局样式时，使用该属性
    };

    /* eslint-disable no-template-curly-in-string */
    const validateMessages = {
        required: '${label} 不能为空！',
    };

    const finish = (type: "subject" | "object") => {
        return (values: INode) => {
            if(type === "subject"){
                setSubjectFormDisable(true)
                setSubject && setSubject(values)          // 保存subject的信息
            }else{
                setObjectFormDisable(true)
                setObject && setObject(values)           // 保存object的信息
            }
        }
    }

    const select = (value: any) => {      // 当主语节点选择了节点类型，执行的回调， 也就是确定relationship的options
        selected && selected(value)         //调用 AddSingle组件传来的函数，给relationship确定options
    }

    const addOrCancelSubjectNode = () => {
        setHasSubject(!hasSubject)          //显示或者关闭 添加节点的form表单
        setSubjectFormDisable(false)        //关闭form表单的禁用状态
        subjectCancel && subjectCancel()
    }

    return (
        <div className="node-info">
            <div className="node-info-header">
                {nodeType === "subject" ? (
                    <>
                        <span>主语节点</span>
                        <Button onClick={addOrCancelSubjectNode} style={{ border: 0, backgroundColor: "#FAFAFA" }} size="small">{hasSubject ? "取消添加" : "添加主语节点信息"}</Button>
                    </>
                ) : (
                    <>
                        <span>宾语节点</span>
                        <Button onClick={() => setHasObject(!hasObject)} disabled={!showObject} style={{ border: 0, backgroundColor: "#FAFAFA" }} size="small">{hasObject ? "取消添加" : "添加宾语节点信息"}</Button>
                    </>
                )}
            </div>

            <div className="node-info-main">
                {nodeType === "subject" ? (
                    <>
                        {hasSubject ? (
                            <div className="has-subject">
                                <Form {...layout} onFinish={finish("subject")} validateMessages={validateMessages} >
                                    <Form.Item name="typeOfNode" label="节点类型" rules={[{ required: true }]}>
                                        <Select options={typeOfSubject} onChange={select} disabled={subjectFormDisable} />
                                    </Form.Item>
                                    <Form.Item name="nameOfNode" label="节点名称" rules={[{ required: true }]}>
                                        <Input disabled={subjectFormDisable} />
                                    </Form.Item>
                                    <Form.Item name="descriptionOfNode" label="节点描述">
                                        <Input.TextArea disabled={subjectFormDisable} />
                                    </Form.Item>
                                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 18 }}>
                                        <Button type="primary" htmlType="submit">保存</Button> &nbsp;
                                        <Button type="default" htmlType="reset" onClick={()=>setSubjectFormDisable(false)}>重置</Button>
                                    </Form.Item>
                                </Form>
                            </div>
                        ) : (           // 没有主语节点信息，就展示图片
                            <div className="has-not-subject">
                                <img className="subject-node-img" src={subjectNode} ></img>
                                <span>暂无主语节点信息，请添加</span>
                            </div>
                        )}
                    </>
                ) : (
                    <>
                        {hasObject ? (
                            <div className="has-object">
                                <Form {...layout} onFinish={finish("object")} validateMessages={validateMessages} >
                                    <Form.Item name="typeOfNode" label="节点类型" rules={[{ required: true }]}>
                                        <Select options={typeOfObject} disabled={objectFormDisable} />
                                    </Form.Item>
                                    <Form.Item name="nameOfNode" label="节点名称" rules={[{ required: true }]}>
                                        <Input disabled={objectFormDisable}/>
                                    </Form.Item>
                                    <Form.Item name="descriptionOfNode" label="节点描述">
                                        <Input.TextArea disabled={objectFormDisable} />
                                    </Form.Item>
                                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 18 }}>
                                        <Button type="primary" htmlType="submit">保存</Button> &nbsp;
                                        <Button type="default" htmlType="reset">重置</Button>
                                    </Form.Item>
                                </Form>
                            </div>
                        ) : (           // 没有主语节点信息，就展示图片
                            <div className="has-not-object">
                                <img className="object-node-img" src={objectNode} ></img>
                                <span>暂无宾语节点信息，请添加</span>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}

export default NodeInfo
