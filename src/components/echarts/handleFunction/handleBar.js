function fixedTs(num, fix = 2) {        //如果是浮点数，保留2位
    if (typeof num === 'number') {
      if (num.toString().indexOf('.') > -1) {
        return parseFloat(num.toFixed(fix));            
      } else {
        return num;
      }

    } else {
      return '--';
    }
  }

const handleBar = (data) => {

    return {
        color: ['#266EFF', '#F6903D'],          //??????????

        legend: {           //图例设置

            itemHeight: 20,     //图形标记的图形高度

            data: [data.all_label, data.affect_label]
        },

        /**
         * 当一副大图里面展示多个小图的时候，grid是一个数组 [{left,top,width, height},{},{},{}] 每个对象都控制一个小图占用整体空间的大小
         * 案列：https://echarts.apache.org/zh/option.html#grid
         */

        grid: {
            top: '10%',     //图形距离容器上侧的距离
            bottom: '10%'
        },

        xAxis: [
            {           //这是设置坐标轴显示的
                name:"横轴",
                nameTextStyle: { color: "red"},         //坐标轴名称的文字样式
                type: 'category',
                data: data.x_bin_merge,                     //[-3.587, -3.445, -3.303, -3.161, -3.019, -2.877, -2.735, -2.593, -2.451, -2.309],
                axisPointer: { show: false },              //坐标轴指示项配置，就是放到图里面后出现一个和坐标轴垂直的基准线
                
                axisLabel: { show: true, color: '#6E707D' },        //坐标轴刻度标签相关
                axisTick: { show: true },                           //坐标轴刻度相关

                axisLine: { lineStyle: { color: "green" } },      //坐标轴轴线
                boundaryGap: false,
            },
            {           //对应不同系列数据的x轴值
                type: 'category',
                data: data.x_bin_merge,                     //[-3.587, -3.445, -3.303, -3.161, -3.019, -2.877, -2.735, -2.593, -2.451],
                axisLabel: { show: false, color: '#6E707D' },
                axisTick: { show: true },
                axisLine: { lineStyle: { color: '#E3E6EF' } },
                boundaryGap: true,
            },
            {
                type: 'category',
                data: data.x_bin_merge,                     //[-3.587, -3.445, -3.303, -3.161, -3.019, -2.877, -2.735, -2.593, -2.451],
                axisLabel: { show: false, color: '#6E707D' },
                axisTick: { show: true },
                axisLine: { lineStyle: { color: '#E3E6EF' } },
                boundaryGap: true,
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: data.y_label,
                nameTextStyle: { padding: [0, 0, 0, 0], color: '#6E707D' },
                axisLabel: { formatter: '{value}', color: '#6E707D' },
                axisLine: { show: true, lineStyle: { color: '#E3E6EF' } },
            },
        ],

        series: [
            {
                name: data.all_label,
                type: 'bar',
                barWidth: '100%',
                xAxisIndex: 1,
                data: data.y_all,                           //[28, 31, 88, 105, 135, 59, 17, 10, 2],
                itemStyle: { color: 'rgba(42, 115, 254)', borderColor: 'rgba(42, 115, 254)' },
            },

            {
                name: data.affect_label,
                type: 'bar',
                barWidth: '100%',
                xAxisIndex: 2,
                data: data.y_affect,//[18, 21, 38, 45, 105, 29, 7, 1, 1],
                itemStyle: { color: 'rgba(249, 197, 0)', borderColor: 'rgba(249, 197, 0)' },
            },

            {
                type:"line",
                xAxisIndex:2,
                data:[0.05, 0.1, 0.2, 0.25, 0.1, 0.2 ,0.15,0.21,0.26,0.06,0.07,0.08,0.09,0.1,0.15,0.08,0.06,0.05, 0.1, 0.2, 0.25, 0.1, 0.2 ,0.15,0.21,0.26,0.06,0.07,0.08,0.09,0.1,0.15,0.08,0.06],
                itemStyle:{
                    color: "red"
                }
            }
        ]
    }
}

export default handleBar