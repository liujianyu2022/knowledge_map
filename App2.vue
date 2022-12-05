<template>
    <div id="app">
        <h2>{{ message }}</h2>

        <el-upload action accept=".xlsx, .xls" :auto-upload="false" :show-file-list="false" :on-change="handle">
            <el-button type="primary">打开excel</el-button>
        </el-upload>

    </div>

    
</template>
     
<script>
import * as XLSX from 'xlsx/xlsx.mjs'

export default {
    name: 'App',
    data() {
        return {
            message: ' XLSX 的使用'
        }
    },
    methods: {

        async handle(ev) {
            
            let file = ev.raw;

            console.log(file)
            if (!file) {
                console.log("文件打开失败")
                return;
            } else {
                let data = await this.readFile(file);
                let workbook = XLSX.read(data, { type: "binary" });//解析二进制格式数据
                console.log('二进制数据的解析:')
                console.log(workbook)
                let worksheet = workbook.Sheets[workbook.SheetNames[0]];//获取第一个Sheet
                let result = XLSX.utils.sheet_to_json(worksheet);//json数据格式
                console.log('最终解析的 json 格式数据:')
                console.log(result)
            }
        },
        
        readFile(file) {//文件读取
            return new Promise(resolve => {
                let reader = new FileReader();
                reader.readAsBinaryString(file);//以二进制的方式读取
                reader.onload = ev => {
                    resolve(ev.target.result);
                }
            })
        },


    }
}
</script>
     
<style>

</style>