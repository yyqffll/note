module.exports = {
  plugins: {
    autoprefixer: {},
    'postcss-px-to-viewport': {
      viewportWidth: 1920,
      unitPrecision: 5,
      propList: [],
      viewportUnit: 'vw',
      fontViewportUnit: 'vw',
      replace: true,
      selectorBlackList: [],
      minPixelValue: 1,
      mediaQuery: true
    }
  }
}
