const webpack = require("webpack");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

var parentDir = path.join(__dirname);

const HtmlWebPackPlugin = require("html-webpack-plugin");

const htmlPlugin = new HtmlWebPackPlugin({
  template: "./index.html",
  filename: "./index.html"
});

module.exports = {
  entry: path.join(parentDir, "/src/index.js"),
  output: {
    path: parentDir + "/dist",
    publicPath: "",
    filename: "bundle.js"
  },

  devServer: { contentBase: parentDir, historyApiFallback: true, port: 3000 },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.less$/,
        loaders: ["style-loader", "css-loader", "less-loader"]
      },
      {
        test: /\.css$/,
        loaders: ["style-loader", "css-loader"]
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"]
  },
  plugins: [
    htmlPlugin,
    new webpack.EnvironmentPlugin({
      API_URL: JSON.stringify(process.env.API_URL) || "",
      STATIC_URL: JSON.stringify(process.env.STATIC_URL)
    })
  ]
};
