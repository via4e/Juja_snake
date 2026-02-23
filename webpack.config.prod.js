const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//const CopyPlugin = require('copy-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/juja.js',
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new CleanWebpackPlugin(),
    // new CopyPlugin({
    //   patterns: [{ from: 'src/assets', to: 'assets' }]
    // }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].css',
    }),
    new ESLintPlugin({
      extensions: ['.js'],
      exclude: 'node_modules'
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader',
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true
          }
        }
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(wav|mp3|ogg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'sounds/[hash][ext][query]'
        }
      },
    ],
  },
  resolve: {
    extensions: ['.js'],
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'img/[hash][ext][query]'
  },
};
