// path为Node的核心模块
const path = require('path')
const webpack = require('webpack')
const htmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name]_[hash].[ext]'
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', {
          loader: 'css-loader',
          options: {
            modules: true
          }
        }, 'postcss-loader']   //从右到左的顺序调用，所以顺序不能错
      }
    ]
  },
  plugins: [
    new htmlWebpackPlugin({template: './src/index.html'}),
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: 'dist',  // 以dist文件为基础启动一个服务器，服务器运行在4200端口上，每次启动时自动打开浏览器
    open: true,
    port: 4200,
    hot: true, // 启用模块热更新
    hotOnly: true // 模块热更新启动失败时，重新刷新浏览器
  },
  devtool: "cheap-module-eval-source-map"
}

