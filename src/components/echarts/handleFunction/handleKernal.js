import * as echarts from "echarts"

function handleKernal(data){
    return {
        color: ['#4285F4', '#00B042'],
    
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985',
            },
          },
        },
    
        legend: {
          padding: 2,
          icon: 'rect', //  字段控制形状  类型包括 circle，rect,line，roundRect，triangle，diamond，pin，arrow，none
          itemWidth: 8, // 设置宽度
          itemHeight: 8, // 设置高度
          bottom: '2%',
          itemGap: 16,
          textStyle: {
            color: '#999'
          }
        },
    
        grid: {
          top: '5%',
          left: '50',
          right: '50',
          bottom: '15%',
          containLabel: true,
          show:true      //展示坐标轴的外围框
        },
    
        xAxis: [
          {
            type: 'category',
            data: data.x_data_list,
            axisLabel: {
              textStyle: {
                color: '#333',
              },
            },
            splitNumber: 0,
            axisTick: {
              show: true,     //显示在x轴上的刻度线
            },
            // axisLine: {     //坐标轴轴线相关
            //   show: true,
            //   onZero: true
            // },
          },
        ],
    
        yAxis: [
          {
            type: 'value',
    
            axisLabel: {
              interval: 0,
              textStyle: {
                color: '#333',
              },
            },
    
            splitLine: {
              show: true,     // 默认数值轴显示，category轴不显示
              lineStyle: {    //  改变轴线颜色
                width: 0.5,
                // 使用深浅的间隔色
                color: ['#e0e0e0'],
              },
            },
          },
        ],
    
        series: [
          {
            name: '频数',
            type: 'line',
            smooth: true,
    
            lineStyle: {
              width: 1,
            },
    
            showSymbol: false,    //控制曲线上的点不展示
            // symbolSize: 15,
            // symbol: 'circle',
    
    
            areaStyle: {
              opacity: 1,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(66, 133, 244,0.6)',
                },
                {
                  offset: 1,
                  color: 'rgba(66, 133, 244,0)',
                },
              ]),
            },
    
            emphasis: {
              focus: 'series',
              // focus:"self"
            },
    
            data: data.y_data_list      //[30, 35, 30, 45, 50, 53, 60, 70, 80, 90, 89, 78],
          },
    
          {
            name: '当前轧序',
            type: 'line',
            // color: '#F56464',
    
            markLine: {     //x轴上的竖线
              label: { position: 'end', lineHeight: -30 },    //lineHeight
    
              symbol: 'none', //  标线两端样式
    
              data:
                [{
                  xAxis: data.current_x.toString(),
                  lineStyle: {
                    color: '#F56464',     //
                    width: 2
                  },
    
                }],
    
              // [{
              //   xAxis: data.current_x.toString(),
              //   lineStyle: { width: '2', type: 'solid' },
              //   emphasis: { label: { color: 'inherit', formatter: '炉号:' + '20120608' } },
              //   label: { color: 'inherit', formatter: '123' },
              // }],
            },
    
          },
    


          {
            name: '平均间隔',
            type: 'line',
            symbol: 'none',
            color: '#5CCC81',
            data: [],
            markLine: {
              silent: false,
              symbol: ['none', 'triangle'], //  标线两端样式
              data: [
                {
                  xAxis: 0.01,
                  lineStyle: { width: '2' },
                  label: { color: 'inherit', formatter: '{c}' },
                },
              ],
            },
          },
        ],
      }
}

export default handleKernal