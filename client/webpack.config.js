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

module.exports = env => {
  // env.Environment is defined in package json scripts
  const baseEnv = parentDir + "/.env";
  const envPath = baseEnv + "." + env.ENVIRONMENT;

  // Check if the env file exists -> default to .env
  const finalPath = fs.existsSync(envPath) ? envPath : baseEnv;

  const fileEnv = dotenv.config({ path: finalPath }).parsed;

  // reduce it to a nice object, the same as before
  const envKeys = Object.keys(fileEnv).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(fileEnv[next]);
    return prev;
  }, {});

  return {
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
    plugins: [htmlPlugin, new webpack.DefinePlugin(envKeys)]
  };
};
