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

const handleSequence = (data) => {
    const areas = [];           //设置分段颜色的
    const using_time = [];      //横坐标的值
    const feature_value = [];       //纵坐标的值
    let max = '';                   //控制y轴区间的上下限              
    let min = '';
    const current_batch_x = [];
    
    let minValue = 0;
    let maxValue = 0;

    data.list_data.forEach((el) => {
      using_time.push(el.using_time);
      feature_value.push(el.feature_value);
    });
  
    data.current_batch_code_x.forEach((el) => {
  
      const tempData = {
        xAxis: el,
        lineStyle: { width: '2' },
        // emphasis: { label: { color: 'inherit' } },
        emphasis: { label: { fontSize: 15, color: 'inherit', formatter: '当前轧序' } },
        label: { color: 'inherit', formatter: '' },
      }
      current_batch_x.push(tempData);
    });
  
    data.list_y_range.forEach((el) => {
    
      let color = '';

      if (el.range_type === 'N_error_range') {
        color = '#fd9191';
        min = el.y_min;
      } else if (el.range_type === 'N3_N2_sigma') {
        color = 'rgb(252, 208, 208)';
      } else if (el.range_type === 'N2_N1_sigma') {
        color = 'rgb(255, 241, 214)';
      } else if (el.range_type === 'N1_P1_sigma') {
        color = 'rgb(236, 255, 235)';
      } else if (el.range_type === 'P1_P2_sigma') {
        color = 'rgb(255, 241, 214)';
      } else if (el.range_type === 'P2_P3_sigma') {
        color = 'rgb(252, 208, 208)';
      } else if (el.range_type === 'P_error_range') {
        color = '#fd9191';
        max = el.y_max;
      }
      
      const tempArea = [
        {
          yAxis: el.y_min,          //设置该段y轴的起点
          itemStyle: {
            color: color,       //设置颜色
          },
        },
        {
          yAxis: el.y_max,      //设置该段y轴的终点
        },
      ]

      areas.push(tempArea);     //给区域添加颜色的
    });
  

    return {
  
      tooltip: {    //提示框的设置  
        trigger: 'axis',
  
        axisPointer: {
          type: 'cross',
          crossStyle: {
            color: '#999'
          }
        },
  
        formatter: (val) => {      //自定义提示框信息。模板字符串或者是函数形式
  
          let html = `<div style="width:240px"><div style="color:rgba(0, 0, 0, 0.5)">${val[0].axisValueLabel}(${data.x_label})</div>`;
          html += `<div class="flex al-center sp-between"> <div class="flex"> <div>${data.list_data[val[0].dataIndex].billet_no_label}:</div></div>
          <div>${data.list_data[val[0].dataIndex].billet_no}</div></div>`;
  
          html += `<div class="flex al-center sp-between"> <div class="flex"> <div>${data.list_data[val[0].dataIndex].feature_label}:</div></div>
          <div>${data.list_data[val[0].dataIndex].feature_value}</div></div>`;
          html += `<div class="flex al-center sp-between"> <div class="flex"> <div>${data.list_data[val[0].dataIndex].roll_num_label}:</div></div>
          <div>${data.list_data[val[0].dataIndex].roll_num}</div></div>`;
          html += `<div class="flex al-center sp-between"> <div class="flex"> <div>${data.list_data[val[0].dataIndex].steel_grade_label}:</div></div>
          <div>${data.list_data[val[0].dataIndex].steel_grade}</div></div>`;
          html += '</div></div>';
          
          return html;
        },
      },
  
      grid: {
        bottom: '25%',
        left: '53',
        right: '53',
        top: '10%'
      },
  
      legend: {     //图例的设置
        show: true,
        data: ['温度', '实际烧损率', '目标值', '计划值']
      },
  
      xAxis: [
        {
          // name: data.x_label,//'开轧温度(℃)',
          type: 'category',
          data: using_time,   //['00:10', '00:20', '00:30', '00:40', '00:50', '01:00', '01:10'],
          axisPointer: {
            type: 'shadow'
          },
          axisLabel: { color: '#6E707D' },
          axisLine: { lineStyle: { color: '#E3E6EF' } },
        },
  
      ],

      yAxis: [
        {
          type: 'value',

          name: data.y_label,       //'开轧温度(℃)',

          nameTextStyle: {
            padding: [0, 36, 0, 0]
          },

          axisLabel: {
            formatter: '{value} '
          },
  
        //     //829.254   856.539
          min: function(value){         //value 是一个对象， 里面把y轴值的最大最小算出来了
            minValue = value.min
            maxValue = value.max

            if (isNaN(value.min)) return 0;

            if (value.min > data.avg_value) {
              value.min = data.avg_value;
            }
            let temp = value.min - (value.max - value.min) / 5;
            if (value.max === value.min) temp = value.min*0.99;
            if (temp < 0) temp = 0;
            
            return fixedTs(temp, 2);
          },

          max: (value) => {
            if (isNaN(value.max)) return 100;
            if (value.max < data.avg_value) {
                console.log("value.max < data.avg_value")
              value.max = data.avg_value;
              console.log(value.max)
            }
            const temp = value.max + (value.max - value.min) / 5;
            if (value.max === value.min) return value.max*1.01;
  
  
            return fixedTs(temp, 2);
          },

        // min: min,
        // max: max,
        }
      ],
  
      dataZoom: [     //区域缩放组件
        {   //当鼠标放在图形区域之后，滚动滚轮会进行缩放
          type: 'inside',
          realtime: true,
          start: 0,
          end: 100
        },
        {
          show: true,
          realtime: true,     //拖动时时候更新视图
          start: 0,
          end: 100,
          bottom: '5%',
        }
      ],
      series: [
  
        {
          name: '温度',
          type: 'line',
          symbol: 'none',
          lineStyle: { color: 'rgb(64, 129, 252)' },

          data: feature_value,                      //[102.0, 222.2, 333.3, 324.5, 426.3, 310.2, 420.3, 123.4, 223.0, 316.5, 112.0, 66.2],

          markArea: {       //y轴不同区域分颜色展示
            silent: true,
            data: areas,
          },

          label:{
            show:true,       //鼠标进入后，展示曲线的y轴值
          },

          markPoint:{           //标记特殊点，比如最大值最小值点， 异常点
            symbol:"circle",
            symbolSize: 8,    //设置标记点的大小
            itemStyle:{
                color: "black"
            },
            
            label:{     //设置标记点的文字
                show: true,
                position: "top",
                color: "black",
                fontSize:15
            },

            data:[      //标记折线上某些特殊点
                {
                    name:"最大值",
                    type:"max"
                },
                {
                    name:"最小值",
                    type:"min"
                },
                {
                    name:"某个坐标",
                    coord:["2022-06-15 04:55:30", 1220]
                }
            ]
          }
        },

        {
          // name: '分炉线',     这是两根红色的竖线
          type: 'line',
          color: '#F56464',
          symbol: 'none',

          markLine: {
            silent: false,
            label: { position: 'end', lineHeight: -35 },
            symbol: 'none', //  标线两端样式
            data: current_batch_x

            // [{
            //   xAxis: '2022-06-30 03:00:00',
            //   lineStyle: { width: '2', type: 'solid' },
            //   emphasis: { label: { color: 'inherit', formatter: '炉号:' + '20120608' } },
            //   label: { color: 'inherit', formatter: '' },
            // }],
          },
        },


        {       //这是中间的均值线
          name: '平均装炉温度',
          type: 'line',
          symbol: 'none',
          color: '#5CCC81',
          data: [],
          markLine: {
            silent: false,
            symbol: ['none', 'triangle'], //  标线两端样式
            data: [
              {
                yAxis: data.avg_value ? data.avg_value : 0,
                lineStyle: { width: '2' },
                label: { position: 'insideEndTop', color: 'inherit', formatter: '均值{c}' },
              },
            ],
          },
        },

        {       //这是最大值线
            name: '最大装炉温度',
            type: 'line',
            symbol: 'none',
            color: '#5CCC81',
            data: [],
            markLine: {
              silent: false,
              symbol: ['none', 'triangle'], //  标线两端样式
              data: [
                {
                  yAxis: max,
                  lineStyle: { width: '2' },
                  label: { position: 'insideEndTop', color: 'inherit', formatter: '最大值{c}' },
                },
              ],
            },
        },
        {       //这是最小值线
            name: '最小装炉温度',
            type: 'line',
            symbol: 'none',
            color: '#5CCC81',
            data: [],
            markLine: {
              silent: false,
              symbol: ['none', 'triangle'], //  标线两端样式
              data: [
                {
                  yAxis: min,
                  lineStyle: { width: '2' },
                  label: { position: 'insideEndTop', color: 'inherit', formatter: '最小值{c}' },
                },
              ],
            },
          },
      ]
    }
  }

export default handleSequence