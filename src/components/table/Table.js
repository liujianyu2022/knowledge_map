import { Button, Form, Input, Table, Select } from 'antd';
import React, { useState } from 'react';
import { typeOfSubject } from "./options"

const TablePreview = (props) => {
    let {excelData} = props     // 这是从excel文件解析的data数据
    console.log("excelData---", excelData)

    

    const originData = [        // 这是用来记录form表单中自己填写的数据
        {
            key: `${Date.now()}`,
            typeOfSubject: "typeOfSubject---",
            nameOfSubject: "nameOfSubject--",
            descriptionOfSubject: "descriptionOfSubject--",

            relationship: "relationship--",

            typeOfObject: "typeOfObject--",
            nameOfObject: "nameOfObject--",
            descriptionOfObject: "descriptionOfObject--",
        }
    ];

    let [relationship, setRelationship] = useState([])
    let [typeOfObject, setTypeOfObject] = useState([])

    // "关系"和"宾语节点类型"是根据 "主语节点类型" 来确定的
    const handleTypeOfSubject = (value) => {
        if (value === "缺陷") {
            relationship = [{ value: "产生原因", label: "产生原因" }]
            typeOfObject = [{ value: "轧制阶段原因", label: "轧制阶段原因" }, { value: "连铸阶段原因", label: "连铸阶段原因" }, { value: "物料原因", label: "物料原因" }]
        } else if(value === "轧制阶段原因"){
            relationship = [{ value: "产生原因", label: "产生原因" }, { value: "导致", label: "导致" }]
            typeOfObject = [{ value: "轧制阶段原因", label: "轧制阶段原因" }, { value: "连铸阶段原因", label: "连铸阶段原因" }, { value: "物料原因", label: "物料原因" }]
        } else if(value == "连铸阶段原因"){
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

    const handleRelationship = (value) => {

    }
    const handleTypeOfObject = (value) => {
   
    }

    const handleInput = (event) => {
        console.log(event.target.value)
    }

    const EditableCell = ({
        editing,
        dataIndex,
        title,
        inputType,
        record,
        index,
        children,
        ...restProps
    }) => {

        let inputNode = null

        if (inputType === "select") {
            if (dataIndex === "typeOfSubject") {          // 主语节点类型
                inputNode = <Select options={typeOfSubject} onChange={handleTypeOfSubject} />
            } else if (dataIndex === "relationship") {         // 关系
                inputNode = <Select options={relationship} onChange={handleRelationship} />
            } else if (dataIndex === "typeOfObject") {          // 宾语节点类型
                inputNode = <Select options={typeOfObject} onChange={handleTypeOfObject} />
            }
        } else {
            inputNode = <Input onChange={handleInput} />
        }

        return (
            <td {...restProps}>
                {editing ? (
                    <Form.Item      // 通过 Form.useForm 对表单数据域进行交互
                        name={dataIndex}
                        style={{
                            margin: 0,
                        }}
                        rules={[            //编辑的时候进行校验的，如果没有树东西，就会报错
                            {
                                required: true,
                                message: `${title}为必填项`,
                            },
                        ]}
                    >
                        {inputNode}
                    </Form.Item>

                ) : (
                    children
                )}
            </td>
        );
    };


    const [form] = Form.useForm();

    let [data, setData] = useState(originData);       // 这是form表单自己输入的数据

    const [editingKey, setEditingKey] = useState('');

    React.useEffect(()=>{
        console.log("excel文件更新了，需要合并数据")
        data = [...data, ...excelData]
        setData(data)
    },[excelData])

    const isEditing = (record) => record.key === editingKey;        // 表示正在被编辑的某一行

    const edit = (record) => {
        form.setFieldsValue({
            name: '',
            age: '',
            address: '',
            ...record,
        });
        setEditingKey(record.key);
    };

    const cancel = () => {      //取消某行的编辑状态
        setEditingKey('');
    };

    const deleteRow = (key) => {       // 删除某一行, key指向当前要删除的行
        let newData = data.filter(item => key !== item.key)
        setData(newData)
        setEditingKey('');
    }

    const addRow = () => {
        data.push({
            key: `${Date.now()}`,
            typeOfSubject: "",
            nameOfSubject: "",
            descriptionOfSubject: " ",      //默认为空字符串，用来通过Form表单字符检验规则

            relationship: "",

            typeOfObject: "",
            nameOfObject: "",
            descriptionOfObject: " ",       //默认为空字符串，用来通过Form表单字符检验规则
        })
        setData([...data]);     // 需要传入一个新的data数组
        setEditingKey('')
    }

    const save = async (key) => {
        try {
            const row = await form.validateFields();

            const newData = [...data];      // 原有的数据

            const index = newData.findIndex((item) => key === item.key);

            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                setData(newData);
                setEditingKey('');
            } else {
                newData.push(row);
                setData(newData);
                setEditingKey('');
            }

            console.log("newData---", newData)

        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const columns = [
        {
            title: '主语节点类型(必填)',
            dataIndex: 'typeOfSubject',
            key: 'typeOfSubject',
            width: "12.5%",
            editable: true,
        },
        {
            title: '主语节点名称(必填)',
            dataIndex: 'nameOfSubject',
            key: 'nameOfSubject',
            width: "12.5%",
            editable: true,
        },
        {
            title: '主语节点描述',
            dataIndex: 'descriptionOfSubject',
            key: 'descriptionOfSubject',
            width: "12.5%",
            editable: true,
        },
        {
            title: '关系(必填)',
            dataIndex: 'relationship',
            key: 'relationship',
            width: "12.5%",
            editable: true,
        },
        {
            title: '宾语节点类型(必填)',
            dataIndex: 'typeOfObject',
            key: 'typeOfObject',
            width: "12.5%",
            editable: true,
        },
        {
            title: '宾语节点名称(必填)',
            dataIndex: 'nameOfObject',
            key: 'nameOfObject',
            width: "12.5%",
            editable: true,
        },
        {
            title: '宾语节点描述',
            dataIndex: 'descriptionOfObject',
            key: 'descriptionOfObject',
            width: "12.5%",
            editable: true,
        },
        {
            title: '操作',
            dataIndex: 'operation',

            render: (_, record, index) => {            // record -> 当前行对象

                const editable = isEditing(record);     // 表示这一行是否处于编辑状态

                return editable ? (
                    <span>
                        <Button onClick={() => save(record.key)} type="primary" >保存</Button>         {/* 把当前正在编辑的行的key传给save */}
                        <Button onClick={cancel}>取消</Button>
                    </span>
                ) : (
                    <span>
                        <Button disabled={editingKey !== ''} onClick={() => edit(record)} type="primary" >编辑</Button> &nbsp;
                        {index === data.length - 1 ?
                            (<Button onClick={addRow}>新增</Button>) :
                            (<Button disabled={editingKey !== ''} onClick={() => deleteRow(record.key)} type="primary" danger >删除</Button>)
                        }
                    </span>

                );
            },
        },
    ];

    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }

        return {
            ...col,
            onCell: (record) => ({
                record,
                // inputType: col.dataIndex === 'age' ? 'number' : 'text',
                inputType: (col.dataIndex === "typeOfSubject") || (col.dataIndex === "relationship") || (col.dataIndex === "typeOfObject") ? "select" : "text",

                dataIndex: col.dataIndex,

                title: col.title,

                editing: isEditing(record),
            }),
        };
    });


    return (
        <Form form={form} component={false}>
            <Table
                components={{
                    body: {
                        cell: EditableCell,
                    },
                }}

                bordered        // 展示边框

                dataSource={data}

                columns={mergedColumns}

                rowClassName="editable-row"

                pagination={{
                    onChange: cancel,
                }}
            />
        </Form>
    );
};

export default TablePreview