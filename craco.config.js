const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,   //自定义主题颜色
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#697DFF' },  
            javascriptEnabled: true,
          },
        },
      },
    },
  ],

  babel: {
    plugins: [
      [
        'import',
        {
          libraryName: 'antd',
          libraryDirectory: 'es',
          style: true,
        },
      ],
    ],
  }
};
