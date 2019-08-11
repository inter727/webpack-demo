const merge = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const miniCssExtractPlugin = require('mini-css-extract-plugin')
const optimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const workboxWebpackPlugin = require('workbox-webpack-plugin')
const commonConfig = require('./webpack.common')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const prodConfig = {
  output: {
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].js'
  },
  mode: 'production',
  devtool: 'cheap-module-source-map',
  plugins: [
    new CleanWebpackPlugin(),
    new miniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    }),
    new workboxWebpackPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true
    }),
    new BundleAnalyzerPlugin()
  ],
  optimization: {
    usedExports: true,
    minimizer: [
      new optimizeCssAssetsWebpackPlugin()
    ]
  }
}

module.exports = merge(commonConfig, prodConfig)