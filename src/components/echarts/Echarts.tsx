import React, {ForwardedRef, useEffect, useImperativeHandle, useLayoutEffect, useRef,} from 'react';

import * as echarts from 'echarts/core';         // 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口

import {EChartsType} from 'echarts/core';

import {
  DatasetComponent,
  DatasetComponentOption,           // Dataset 专门用来管理数据的组件

  DataZoomComponent,                // 用于区域缩放
  DataZoomComponentOption,

  GridComponent,
  GridComponentOption,

  LegendComponent,
  LegendComponentOption,        //图例组件

  TitleComponent,
  TitleComponentOption,     // 工具栏组件，提供比如图片导出等功能

  ToolboxComponent,
  ToolboxComponentOption,

  TooltipComponent,
  TooltipComponentOption        // 提示框组件
} from 'echarts/components';        // 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component

import {BarChart, BarSeriesOption, LineChart, LineSeriesOption,} from 'echarts/charts';

import {UniversalTransition} from 'echarts/features';       // 引入一些特性，可用的只有两个，标签自动布局特性 LabelLayout 和全局过渡动画特性 UniversalTransition。

import {SVGRenderer} from 'echarts/renderers';      // 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步, svg是位图

import {ECElementEvent} from 'echarts/types/src/util/types';

import {Spin} from 'antd';

// 注册必须的组件
echarts.use([
  DatasetComponent,
  DataZoomComponent,
  GridComponent,
  LegendComponent,
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  LineChart,
  BarChart,
  UniversalTransition,
  SVGRenderer,
]);

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
// 开发者的组件是按需引入的，我们还提供了一个 ComposeOption 类型方法，可以组合出一个只包含了引入组件的配置项类型
export type MyChartOption = echarts.ComposeOption<| DatasetComponentOption
  | DataZoomComponentOption
  | GridComponentOption
  | LegendComponentOption
  | TitleComponentOption
  | ToolboxComponentOption
  | TooltipComponentOption
  | LineSeriesOption
  | BarSeriesOption>;

export interface MyChartProps {
  option: MyChartOption | null | undefined;
  width: number | string;
  height: number | string;
  merge?: boolean;
  loading?: boolean;
  empty?: React.ReactElement;
  onClick?(event: ECElementEvent): any;
}

export interface MyChartRef {
  instance(): EChartsType | undefined;
}

const MyChartInner: React.ForwardRefRenderFunction<MyChartRef, MyChartProps> = (
  {option, width, height, loading = false, onClick},
  ref: ForwardedRef<MyChartRef>
) => {
    
  const cRef = useRef<HTMLDivElement>(null);
  const cInstance = useRef<EChartsType>();

  // 初始化注册组件，监听 cRef 和 option 变化
  useEffect(() => {
    if (cRef.current) {
      // 校验 Dom 节点上是否已经挂载了 ECharts 实例，只有未挂载时才初始化
      cInstance.current = echarts.getInstanceByDom(cRef.current);
      if (!cInstance.current) {
        cInstance.current = echarts.init(cRef.current, undefined, {
          renderer: 'svg',
        });

        cInstance.current.on('click', (event) => {
          const ec = event as ECElementEvent;
          if (ec && onClick) onClick(ec);
        });
      }

      // 设置配置项
      if (option) cInstance.current?.setOption(option);
    }
  }, [cRef, option]);

  // 监听窗口大小变化重绘
  useEffect(() => {
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
    };
  }, [option]);

  // 监听高度变化
  useLayoutEffect(() => {
    resize();
  }, [width, height]);

  // 重新适配大小并开启过渡动画
  const resize = () => {
    cInstance.current?.resize({
      animation: {duration: 300}
    });
  }

  // 获取实例
  const instance = () => {
    return cInstance.current;
  }

  // 对父组件暴露的方法
  useImperativeHandle(ref, () => ({
    instance
  }));

  return (
    <Spin spinning={loading}>
      <div ref={cRef} style={{width: width, height: height}}/>
    </Spin>
  );
};

const MyChart = React.forwardRef(MyChartInner);

export default MyChart;
