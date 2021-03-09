const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");

const APP_DIR = path.resolve(__dirname, './src');

module.exports = {
  entry: {
    bundle: APP_DIR + "/index.tsx"
  },
  output: {
    path: path.resolve(__dirname, "./build"),
    filename: "[name].[hash].js"
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.tsx', '.ts'],
    alias: {
      '@': APP_DIR
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(jpeg|jpg|png|gif|svg|ico|txt|ttf|woff)$/i,
        use: 'file-loader?name=[name].[ext]'
      },
    ]
  },
  optimization: {
    splitChunks: {
        chunks: 'all'
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html"
    }),
    new CleanWebpackPlugin()
  ]
};
