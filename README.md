# 30project

```
$ npm init -y
$ npm i -D webpack
$ npm i -D webpack-cli webpack-dev-server@next
$ npm i -D terser-webpack-plugin
```

```javascript
const path = require("path");
const TerserWebpackPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: "./src/js/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./dist"),
    clean: true
  },
  devtool: "source-map",
  mode: "development",
  optimization: {
    minimizer: [
      new TerserWebpackPlugin()
    ]
  }
}
```

```
$ npm i -D html-webpack-plugin
$ npm i -D mini-css-extract-plugin
$ npm i -D css-loader
$ npm i -D css-minimizer-webpack-plugin
```

```javascript
const path = require("path");
const TerserWebpackPlugin = require('terser-webpack-plugin'); // 추가됨
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 추가됨

module.exports = {
  entry: "./src/js/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./dist"),
    clean: true
  },
  devtool: "source-map",
  mode: "development",
  plugins: [ // 추가됨
    new HtmlWebpackPlugin( {
      title: "keyboard",
      template: "./index.html",
      inject: "body",
      favicon: "./favicon.ico"
    })
  ],
  optimization: {
    minimizer: [
      new TerserWebpackPlugin()
    ]
  }
}
```