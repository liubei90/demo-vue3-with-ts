/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
// eslint-disable-next-line import/no-extraneous-dependencies
const webpack = require('webpack');

module.exports = {
  mode: 'none',
  entry: {
    dll: ['./dll/index.ts', './dll/alpha.js'],
  },
  output: {
    path: path.join(__dirname, 'dll/dist/'),
    filename: '[name]_[hash:5].js',
    library: '[name]_[hash:5]',
  },
  module: {
    rules: [
      {
        test: /\.m?jsx?$/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, 'dll/dist/', '[name]-manifest.json'),
      name: '[name]_[hash:5]',
    }),
  ],
};
