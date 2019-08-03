const merge = require('webpack-merge')
const miniCssExtractPlugin = require('mini-css-extract-plugin')
const commonConfig = require('./webpack.common')

const prodConfig = {
  output: {
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].js'
  },
  mode: 'production',
  devtool: 'cheap-module-source-map',
  plugins: [
    new miniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    })
  ],
  optimization: {
    usedExports: true
  }
}

module.exports = merge(commonConfig, prodConfig)