const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const htmlWebpack = new HtmlWebpackPlugin({
  filename: './index.html',
  template: './public/index.html', 
  publicPath: '/',
  favicon: './public/favicon.ico'
});

const miniCssExtract = new MiniCssExtractPlugin({
  filename: "./static/css/[name].[contenthash].css"
}); 

module.exports = {
  name: 'stamp',
  mode: 'production',
  entry: './src/index.js',
  output: {
    clean: true,
    filename: './static/js/main.[contenthash].js',
    path: path.resolve(__dirname, 'build'),
    publicPath: '/'
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/, exclude: /node_modules/, use: "babel-loader" },
      { test: /\.html$/, use: "html-loader" },
      { test: /\.css$/, use: [MiniCssExtractPlugin.loader, "css-loader"] }
    ]
  },
  devtool: 'source-map',
  plugins: [htmlWebpack, miniCssExtract]
};
