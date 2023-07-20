const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const WebpackDevServer = require("webpack-dev-server");

new webpack.EnvironmentPlugin([
  'WEBPACK_PROXY_ip', 'WEBPACK_PROXY_PORT'
]);

const htmlWebpack = new HtmlWebpackPlugin({
  filename: './index.html',
  template: './public/index.html', 
  publicPath: '/',
  favicon: './public/favicon.ico'
});

const miniCssExtract = new MiniCssExtractPlugin({
  filename: "./static/css/[name].css"
}); 

const proxyIp = process.env.WEBPACK_PROXY_IP || 'localhost';
const proxyPort = process.env.WEBPACK_PROXY_PORT || 3001;
const proxyUrl = `http://${proxyIp}:${proxyPort}`;

function customOutputMsg(devServer) {
  const name = devServer.compiler.name || 'your project';
  const type = devServer.options.server.type;
  const port = devServer.options.port;
  const localIPv4 = WebpackDevServer.internalIPSync("v4");
  const loopback = `${type}://localhost:${port}`;
  const lan = `${type}://${localIPv4}:${port}`;

  console.clear();
  console.log("You can open \x1b[1m\x1b[36m%s\x1b[0m", name, "in browser.\n");
  console.log("\x1b[1m%s".padStart(8), "Loopback:", `\x1b[33m${loopback}\x1b[0m`);
  console.log("\x1b[1m%s".padStart(8), "LAN:".padEnd(9), `\x1b[33m${lan}\x1b[0m`, '\n');
}

module.exports = {
  name: 'stamp',
  mode: 'development',
  entry: './src/index.js',
  output: {
    clean: true,
    filename: './static/js/main.js',
    path: path.resolve(__dirname, 'build'),
    publicPath: '/'
  },
  stats: {assets: false, modules: false},
  infrastructureLogging: { level: 'warn' },
  module: {
    rules: [
      { test: /\.(js|jsx)$/, exclude: /node_modules/, use: "babel-loader" },
      { test: /\.html$/, use: "html-loader" },
      { test: /\.css$/, use: ["style-loader", "css-loader"] }
    ]
  },
  devServer: {
    onListening: function(devServer) { customOutputMsg(devServer); },
    static: { directory: path.join(__dirname, 'public') },
    historyApiFallback: true,
    port: 3000,
    open: true,
    host: '0.0.0.0',
    proxy: {
      "/api": proxyUrl
    },
    client: {
      overlay: { errors: true, runtimeErrors: true, warnings: false }
    }
  },
  devtool: 'source-map',
  plugins: [htmlWebpack, miniCssExtract, new ESLintPlugin]
};
