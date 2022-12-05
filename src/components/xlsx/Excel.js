import React from "react"
import * as XLSX from "xlsx"
import { message, Upload, Button} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import TablePreview from "../table/Table"

const Excel = () => {
    const [data, setData] = React.useState([])

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
          let excelData = data.Sheet1;

          excelData = transformKeys(excelData)

          setData(excelData)
  
          console.log("调用后端接口，返回data数据")

          //   const excelHeader = [];
          // 获取表头   就是Table中的 Columns属性
          // for (const headerAttr in excelData[0]) {
          //     const header = {
          //         title: headerAttr,
          //         dataIndex: headerAttr,
          //         key: headerAttr
          //     };
          //     excelHeader.push(header);
          // }
        } catch (e) {
          console.log(e);
          message.error('文件类型不正确！');      // 这里可以抛出文件类型错误不正确的相关提示
        }
      };
    }
    
    const transformKeys = (excelData)=>{         //因为excel表格的header为中文，需要转换为英文

        let Englishkeys = ["key", "typeOfSubject", "nameOfSubject", "descriptionOfSubject", "relationship", "typeOfObject", "nameOfObject", "descriptionOfObject"]

        let tempData = []       //用来承装转换之后的数据

        for(let i = 0; i < excelData.length; i++){
            let tempObj = {}

            let obj = excelData[i]
            let values = Object.values(obj)

            Englishkeys.forEach((key, index, keys)=>{
                tempObj[key] = values[index]
            })

            tempData.push(tempObj)
        }

        return tempData
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
        
        <TablePreview excelData = {data} />    {/* 当excel文件解析了，就把新的其他属性传给table */}  
      </div>
    )
  }
  
  
  
  
  export default Excel