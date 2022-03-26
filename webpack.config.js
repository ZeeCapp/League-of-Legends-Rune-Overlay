const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  entry: './src/client-app/index.tsx',
  output: {
    path: path.resolve(__dirname, 'build/client-app'),
    filename: 'bundle.js',
    publicPath: "/"
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.ts(x)?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          configFile: "tsconfig.webpack.json"
        }
      },
      {
        test: /\.css$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: "css-loader" }
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        type: "asset/resource",
      }
    ]
  },
  resolve: {
    extensions: [
      '.tsx',
      '.ts',
      '.js',
      '.css',
    ]
  },
  devServer: {
    static: {
      directory: path.join(__dirname, '/build/client-app'),
    },
    hot: true,
    port: 3001,
    historyApiFallback: true
  },
  plugins: [
    new MiniCssExtractPlugin({filename: "bundle.css"}),
    new HtmlWebpackPlugin({
        template: './src/client-app/index.html',
        filename: 'index.html',
        inject: "body"

    })
  ]
};

module.exports = config;