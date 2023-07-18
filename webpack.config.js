const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

new webpack.EnvironmentPlugin([
  'NODE_ENV', 'WEBPACK_PROXY_ip', 'WEBPACK_PROXY_PORT'
]);

const htmlWebpack = new HtmlWebpackPlugin({
  filename: './index.html',
  template: './public/index.html', 
  publicPath: '/',
  favicon: './public/favicon.ico'
});

const miniCssExtract = new MiniCssExtractPlugin({
  filename: "./static/css/[name].[contenthash].css"
}); 

const devMode = process.env.NODE_ENV !== 'production';
const proxyIp = process.env.WEBPACK_PROXY_IP;
const proxyPort = process.env.WEBPACK_PROXY_PORT;
const proxyUrl = `http://${proxyIp}:${proxyPort}`;

module.exports = {
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
      { test: /\.css$/, use: [devMode ? "style-loader" : MiniCssExtractPlugin.loader, "css-loader"] }
    ]
  },
  devServer: {
    static: { directory: path.join(__dirname, 'public') },
    historyApiFallback: true,
    port: 3000,
    open: true,
    host: '0.0.0.0',
    proxy: {
      "/api": proxyUrl
    },
  },
  devtool: 'source-map',
  plugins: [htmlWebpack, miniCssExtract]
};
