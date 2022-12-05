import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload, Table, Tag, Space, Select, Input } from 'antd';

import React from 'react';
import * as XLSX from 'xlsx';
import { typeOfObject, typeOfSubject, relationship } from "../table/options"

const data1 = [
  {
    key: '1',

    typeOfSubject: "typeOfSubject---",
    nameOfSubject: "nameOfSubject",
    descriptionOfSubject: "descriptionOfSubject",

    relationship: "relationship",

    typeOfObject: "typeOfObject",
    nameOfObject: "nameOfObject",
    descriptionOfObject: "descriptionOfObject",

    isEdit: false
  },


  // {
  //   key: '2',

  //   typeOfSubject: this.valueOfSubject,
  //   nameOfSubject: "",
  //   descriptionOfSubject: "",

  //   relationship: this.valueOfRelationship,

  //   typeOfObject: this.valueOfObject,
  //   nameOfObject: "",
  //   descriptionOfObject: "",
  // }, 
];






const Xlsx = () => {
  const [data, setData] = React.useState([])
  const [isEdit, setIsEdit] = React.useState(false)


  const columns = [
    {
      title: '主语节点类型(必填)',
      dataIndex: 'typeOfSubject',
      key: 'typeOfSubject',
      render: (text, row, index) => {     // 
        return (
          <div>
            {
              row.isEdit ? (
                <Select options={typeOfSubject} />
              ) : (
                <span>{text}</span>
              )
            }
          </div>
        )
      }
    },

    {
      title: '主语节点名称(必填)',
      dataIndex: 'nameOfSubject',
      key: 'nameOfSubject',
      render: (text, row, index) => {
        {
          row.isEdit ? (
            <Input placeholder='请输入主语节点名称' />
          ) : (
            <span>{text}</span>
          )
        }
      }
    },

    {
      title: '主语节点描述',
      dataIndex: 'descriptionOfSubject',
      key: 'descriptionOfSubject',
      render: (text, row, index) => {
        {
          row.isEdit ? (
            <Input placeholder='请输入主语节点描述' />
          ) : (
            <span>{text}</span>
          )
        }
      }
    },
    {
      title: '关系(必填)',
      dataIndex: 'relationship',
      key: 'relationship',
      render: (text, row, index) => {
        {
          row.isEdit ? (
            <Select options={relationship} />
          ) : (
            <span>{text}</span>
          )
        }
      }
    },
    {
      title: '宾语节点类型(必填)',
      dataIndex: 'typeOfObject',
      key: 'typeOfObject',
      render: (text, row, index) => (
        <div>
          {
            row.isEdit ? (
              <Select options={typeOfObject} />
            ) : (
              <span>{text}</span>
            )
          }
        </div>
      ),
    },

    {
      title: '宾语节点名称(必填)',
      dataIndex: 'nameOfObject',
      key: 'agenameOfObject',
      render: (text, row, index) => {
        {
          row.isEdit ? (
            <Input placeholder='请输入宾语节点名称' />
          ) : (
            <span>{text}</span>
          )
        }
      }
    },

    {
      title: '宾语节点描述',
      dataIndex: 'descriptionOfObject',
      key: 'descriptionOfObject',
      render: (text, row, index) => {
        {
          row.isEdit ? (
            <Input placeholder='请输入宾语节点描述' />
          ) : (
            <span>{text}</span>
          )
        }
      }
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  const handleUpload = (file) => {

    const fileReader = new FileReader();       // 通过FileReader对象读取文件

    fileReader.readAsBinaryString(file.file);    // 以二进制方式打开文

    fileReader.onload = event => {
      try {
        const { result } = event.target;

        const workbook = XLSX.read(result, { type: 'binary' });      // 以二进制流方式读取得到整份excel表格对象

        let data = {};     // 存储获取到的数据

        for (const sheet in workbook.Sheets) {     // 遍历每张工作表进行读取（这里默认只读取第一张表）
          let tempData = [];
          // esline-disable-next-line
          if (workbook.Sheets.hasOwnProperty(sheet)) {
            data[sheet] = tempData.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));     // 利用 sheet_to_json 方法将 excel 转成 json 数据
          }
        }
        const excelData = data.Sheet1;

        const excelHeader = [];

        // 获取表头   就是Table中的 Columns属性
        // for (const headerAttr in excelData[0]) {
        //     const header = {
        //         title: headerAttr,
        //         dataIndex: headerAttr,
        //         key: headerAttr
        //     };
        //     excelHeader.push(header);
        // }

        // setData(data1)

        console.log("调用后端接口，返回data数据")

      } catch (e) {
        console.log(e);
        message.error('文件类型不正确！');      // 这里可以抛出文件类型错误不正确的相关提示
      }
    };
  }

  const props = {
    name: 'file',
    beforeUpload() {
      return false
    }
  };

  return (
    <div>
      <Upload {...props} onChange={handleUpload} >
        <Button icon={<UploadOutlined />}>点击上传文件</Button>
      </Upload>
      <Table columns={columns} dataSource={data1} />
    </div>
  )
}




export default Xlsx