const devHosturl = 'http://localhost:2000'
const proHosturl = 'http://124.223.7.93:2000'
const baseUrl = process.env.NODE_ENV === 'development' ? devHosturl : proHosturl
const path = require('path')

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  assetsDir: 'static',
  outputDir: 'dist',
  indexPath: 'index.html',
  lintOnSave: false,
  parallel: false,
  chainWebpack (config) {
    config.plugin('html').tap((args) => {
      args[0].title = 'yyq博客'
      return args
    })
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        // 全局变量路径
        path.resolve(__dirname, './src/assets/css/global.less'),
      ],
    },
  },
  devServer: {
    proxy: {
      '/noteapi': {
        target: baseUrl,
        changeOrigin: true
      }
    }
  }
}
