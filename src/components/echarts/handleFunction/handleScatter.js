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

const maxNumber = (value) => {
    if (isNaN(value.max)) return 100;
    if (value.max === value.min) return value.max + 10;
    const temp = value.max * 1.03;
    return fixedTs(temp, 2);
};


const minNumber = (value) => {      //echarts调用的时候，value={max:xxx, min:yyy}
    if (isNaN(value.min)) return 0;
    let temp = value.min - (value.max - value.min) / 5;
    if (value.max === value.min) temp = value.min - 10;
    if (temp < 0) temp = 0;
    return fixedTs(temp, 2);
};

const handleScatter = (data) => {

    return {
        legend: {
            itemWidth: 10,
            itemHeight: 10,
            right: '5%',
            orient: 'vertical',
            data: ['开轧温度']
        },

        xAxis: {
            min: minNumber,
            max: maxNumber,
        },
        yAxis:
        {
            type: 'value',
            name: '屈服强度',
            min: minNumber,
            max: maxNumber,
            nameTextStyle: { padding: [0, 0, 0, 0], color: '#6E707D' },
            axisLabel: { formatter: '{value}', color: '#6E707D' },
            axisLine: { show: true, lineStyle: { color: '#E3E6EF' } },
        },

        grid: {
            top: '10%',
            bottom: '10%'
        },

        series: [
            {

                name: data.y_label,
                symbolSize: 10,
                itemstyle: {
                    color: '#000'
                },
                data: data.chart_data,
                itemStyle: {
                    color: 'rgba(103, 200, 138, 1)'
                },
                type: 'scatter'
            }
        ]
    };
};

export default handleScatter