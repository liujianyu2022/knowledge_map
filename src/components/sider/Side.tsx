import React from "react"
import { SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import {useNavigate} from "react-router-dom"


import "./side.less"

type MenuItem = Required<MenuProps>['items'][number];

function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[],): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

// getItem(label, key, icon, children, type)
const items: MenuProps['items'] = [
  getItem('文档知识库', 'document', <SettingOutlined />, [
    getItem('文档首页', 'home'),
    getItem('收藏夹', 'favorites'),
    getItem('我的文件', 'myfile'),
    getItem('文档审核', 'fileverify'),
    getItem('用户管理', 'users'),
    getItem('文档分类管理', 'category'),
  ]),
  getItem('图谱', 'map', <SettingOutlined />, [
    getItem('知识库', 'base'),
    getItem('知识新增', 'addknowledge'),
    getItem('溯源分析', 'track'),
    getItem('风险预警', 'riskwarning'),
    getItem('知识审核', 'knowledgeverify'),
    getItem('知识文档', 'knowledgedocument'),
    getItem('节点信号配置', 'nodesignal'),
  ]),
];


function Side() {
    let navigate = useNavigate()

    const onClick: MenuProps['onClick'] = event => {
        let key = event.key
        console.log(key)

        if(key === 'home'){
          navigate("homepage")
        }else if(key === 'favorites'){
          navigate("favorites")
        }else if(key === 'myfile'){
          navigate("myfile")
        }else if(key === 'fileverify'){

        }else if(key === 'users'){

        }else if(key === 'category'){

        }else if(key === 'base'){

        }

        if(key === "addknowledge"){
          navigate("addknowledge")
        } else if(key === "track"){
          navigate("track")
        } else if(key === "base"){
          navigate("knowledgebase")
        } else if(key === "knowledgedocument"){
          navigate("knowledgedocument")
        }
    };

    return (
        <Menu
            onClick={onClick}
            style={{ width: 150, backgroundColor: "#373C50"}}       //这个是给Menu最外层的添加的style属性
            defaultSelectedKeys={['home']}
            defaultOpenKeys={['document']}
            mode="inline"
            items={items}
        />
    );

}

export default Side