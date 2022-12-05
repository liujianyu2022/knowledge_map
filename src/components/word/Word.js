import React from "react"
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';


const handleFile = (file) => {
    let fileReader = new FileReader()
    console.log("fileReader", fileReader)
    fileReader.readAsText(file.file)
}


const props = {
    name: 'file',
    beforeUpload() {
        return false
    },

    onChange(file) {
        console.log(file)
        handleFile(file)
    },
};

const Word = () => (
    <Upload {...props}>
        <Button icon={<UploadOutlined />}>点击上传文档</Button>
    </Upload>
);

export default Word;
