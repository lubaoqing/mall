module.exports = {
  plugins: {
    autoprefixer: {},
    'postcss-px-to-viewport': {
      viewportWidth: 375, // 视窗的宽度，对应的是我们设计稿的宽度
      unitPrecision: 5, // 指定‘px’转化为视窗单位的小数为数
      viewportUnit: 'vw', // 指定需要转化成的视窗单位，推荐vw
      selectorBlackList: ['tab-bar'],// 指定不需要转换的类
      minPixelValue: 1,// 小于或等于'1px'步转换为视窗单位
      mediaQuery: false,// 允许在媒体查询中转换'px'
      exclude: [/TabBar/,/NavBar/],// 不需要转换的文件，内部使用正则
    }
  }
}