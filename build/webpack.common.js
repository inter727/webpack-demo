// path为Node的核心模块
const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const htmlWebpackPlugin = require('html-webpack-plugin')
const miniCssExtractPlugin = require('mini-css-extract-plugin')
const addAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')
const copyrightPlugin = require('../plugin/copyrightPlugin')

const makeHtmlPlugins = function(obj) {
  return Object.keys(obj).map(function (key) {
    return new htmlWebpackPlugin({
      template: 'src/page/index.html',
      filename: key + '.html',
      chunks: [key]
    })
  })
}

let config = {
  entry: {
    index: './src/js/index.js',
    detail: './src/js/detail.js',
    list: './src/js/list.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist')
  },
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
        use: [
          {
            loader: miniCssExtractPlugin.loader,
            options: {
              hmr: true,
              reloadAll: true
            }
          },
          'css-loader', 'postcss-loader'  //从右到左的顺序调用，所以顺序不能错
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
          {
            loader: "replaceLoader",
            options: { word: 'very good' }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      _: 'lodash',
      axios: 'axios'
    }),
    new webpack.DllReferencePlugin({
      manifest: path.resolve(__dirname, '../dll/vendors.manifest.json')
    }),
    new copyrightPlugin({
      name: 'zby'
    })
  ],
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
  resolve: {
    extensions: ['.js', '.css'],
    mainFields: ['main', 'index'],
    alias: {
      css: path.resolve(__dirname, '../src/css')
    }
  },
  resolveLoader: {
    modules: ['node_modules', path.resolve(__dirname, '../loader')]
  }
}

config.plugins = config.plugins.concat(makeHtmlPlugins(config.entry))

// 动态分析文件
const files = fs.readdirSync(path.resolve(__dirname, '../dll'))
files.forEach(file => {
  // 如果是xxx.dll.js文件
  if(/.*\.dll.js/.test(file)) {
    config.plugins.push(
      new addAssetHtmlWebpackPlugin({
        filepath: path.resolve(__dirname, '../dll', file)
      })
    )
  }
  // 如果是xxx.manifest.json文件
  if(/.*\.manifest.json/.test(file)) {
    config.plugins.push(
      new webpack.DllReferencePlugin({
        manifest: path.resolve(__dirname, '../dll', file)
      })
    )
  }
})

module.exports = config