var webpack = require("webpack");
var path = require("path");

var parentDir = path.join(__dirname);

module.exports = {
  entry: path.join(parentDir, "/src/index.js"),
  output: { path: parentDir + "/dist", publicPath: "/", filename: "bundle.js" },

  devServer: { contentBase: parentDir, historyApiFallback: true, port: 3000 },
  module: {
    rules: [
      { test: /\.(js|jsx)$/, exclude: /node_modules/, use: ["babel-loader"] }
    ]
  }
};
