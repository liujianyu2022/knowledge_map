import React from 'react';
import * as XLSX from 'xlsx';

import { message, Table, Upload } from 'antd';

const { Dragger } = Upload;

export class Xlsx extends React.Component {
   state = {
      tableData: [],     //收集表的数据
      tableHeader: []       //收集表头
   };

   toReturn = () => {
      this.props.close();
   };

   toSubmit = () => {
      console.log("toSubmit")

   };

   render() {
      console.log(this.state.tableHeader)
      console.log(this.state.tableData)

      return (
         <div>
            <Dragger name="file"
               accept=".xls,.xlsx" maxCount={1}

               beforeUpload={function () {
                  return false;
               }}

               style = {{height: "100px", width: "200px", borderRadius: "10px", backgroundColor:"white"}}

               onChange={this.uploadFilesChange}

               // showUploadList={false}      显示上传的文件名
               >
                  
               <p className="ant-upload-text">
                  <span>点击上传文件</span>
               </p>
            </Dragger>

            <Table
               columns={this.state.tableHeader}
               dataSource={this.state.tableData}
               style={{ marginTop: '20px' }}
               pagination={false}
               key={this.state.tableData.Index}
            />
         </div>
      );
   }

   uploadFilesChange = (file) => {
      const fileReader = new FileReader();       // 通过FileReader对象读取文件

      console.log("file--", file, file.file instanceof File)

      fileReader.readAsBinaryString(file.file);    // 以二进制方式打开文件

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

            // 获取表头
            for (const headerAttr in excelData[0]) {
               const header = {
                  title: headerAttr,
                  dataIndex: headerAttr,
                  key: headerAttr
               };
               excelHeader.push(header);
            }

            
            this.setState({      // 最终获取到并且格式化后的 json 数据
               tableData: excelData,
               tableHeader: excelHeader,
            });

            console.log("调用文件上传接口")
            
         } catch (e) {
            console.log(e);
            message.error('文件类型不正确！');      // 这里可以抛出文件类型错误不正确的相关提示
         }
      };
   }
}
export default Xlsx;