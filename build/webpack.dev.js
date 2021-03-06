const webpack = require('webpack')
const merge = require('webpack-merge')
const miniCssExtractPlugin = require('mini-css-extract-plugin')
const commonConfig = require('./webpack.common')

const devConfig = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: 'dist',  // 以dist文件为基础启动一个服务器，服务器运行在4200端口上，每次启动时自动打开浏览器
    open: true,
    port: 4200,
    hot: true, // 启用模块热更新
    hotOnly: true, // 模块热更新启动失败时，重新刷新浏览器
    proxy: {
      '/react/api': {
        target: 'http://www.dell-lee.com',
        pathRewrite: {
          'header.json': 'demo.json'
        }
      }
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new miniCssExtractPlugin({
      filename: '[name].css'
    })
  ]
}

module.exports = merge(commonConfig, devConfig)