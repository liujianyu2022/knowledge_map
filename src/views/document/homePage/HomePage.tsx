import React from "react"
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, } from 'antd';
import type { InputRef } from "antd";

import Card from "./compoments/Card";
import "./homePage.less"
import AddDocument from "./compoments/AddDocument";



function HomePage() {
    const inputRef = React.useRef<InputRef>(null)

    const [inputContent, setInputContent] = React.useState<string>("")
    const [isModalOpen, setIsModalOpen] = React.useState(false);            // 弹出新建文档的对话框

    const treeData = [
        {
            title: 'parent 1',
            key: '0-0',
            children: [
                {
                    title: 'parent 1-0',
                    key: '0-0-0',
                },
                {
                    title: 'parent 1-1',
                    key: '0-0-1',
                },
                {
                    title: 'parent 1-2',
                    key: '0-0-2',
                },
            ],
        },
    ];

    const handleInput = (event: any) => {
        setInputContent(event.target.value)
    }

    const search = () => {          //点击搜索按钮后
        console.log(inputContent)
    }

    const addDocument = ()=>{           // 新建文档
        setIsModalOpen(true)
    }

    return (
        <div className="homepage">
            <div className="homepage-head">
                <h1>知识文档</h1>

                <div className="homepage-search">
                    <Input
                        style={{ height: "42px", width: "800px" }}
                        placeholder="输入关键字"
                        allowClear
                        size="large"
                        onChange={handleInput}
                        value={inputContent}
                        prefix={<SearchOutlined style={{fontSize: 20, color: "#222222"}} />}
                        ref={inputRef}
                    /> &nbsp;

                    <Button type="primary" onClick={search} >搜索</Button> &nbsp;
                    <Button onClick={addDocument}>新建文档</Button>
                </div>

            </div>

            <div className="homepage-card">
                <div className="homepage-card-first"><Card title="说明书" lists={treeData} /></div>
                <div className="homepage-card-second"><Card title="分析报告" lists={treeData} /></div>
                <div className="homepage-card-third"><Card title="检测报告" lists={treeData} /></div>
            </div>

            <div className="homepage-adddocument">
                <AddDocument isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
            </div>
        </div>
    )
}

export default HomePage