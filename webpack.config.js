const Path = require("path");
const TerserWebpackPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractplugin = require('mini-css-extract-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  entry: "./src/js/index.js",
  output: {
    filename: "bundle.js",
    path: Path.resolve(__dirname, "./dist"),
    clean: true
  },
  devtool: "source-map",
  mode: "development",
  devServer: {
    host: "localhost",
    port: 8080,
    open: true,
    watchFiles: 'index.html'
  },
  plugins: [
    new HtmlWebpackPlugin( {
      title: "image-slide",
      template: "./index.html",
      inject: "body",
    }),
    new MiniCssExtractplugin( {
      filename: "style.css"
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractplugin.loader, "css-loader"]
      }
    ]
  },
  optimization: {
    minimizer: [
      new TerserWebpackPlugin(),
      new CssMinimizerWebpackPlugin()
    ]
  }
}