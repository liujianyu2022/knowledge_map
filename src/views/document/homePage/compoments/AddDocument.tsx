import React from "react"
import {Modal, Select } from 'antd';
import "./addDocument.less"

interface IProps {
    isModalOpen: boolean,
    setIsModalOpen: (isOpen: boolean) => void
}

function AddDocument(props: IProps) {
    let {isModalOpen, setIsModalOpen} = props

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const selected = (value: any)=>{
        console.log(value)
    }

    const options = [
        {value:".doc", label:".doc"},
        {value:".docx", label:".docx"},
        {value:".pdf", label:".pdf"},
    ]

    return (
        <div className="add-document">

            <Modal title="新建文档" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <div>
                    <span style={{display: "block"}}>文档类型：</span>
                    <Select options={options} onChange={selected} style={{width: "100%"}} />
                </div>
            </Modal>
        </div>
    )
}

export default AddDocument