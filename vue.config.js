/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
// eslint-disable-next-line import/no-extraneous-dependencies
const webpack = require('webpack');
// eslint-disable-next-line import/no-extraneous-dependencies
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');

const isProd = process.env.NODE_ENV === 'production';
// console.log(process.env.VUE_APP_PAGES);

module.exports = {
  publicPath: './',
  configureWebpack: {
    mode: 'none',
    plugins: [
      ...(isProd ? [
        new HtmlWebpackExternalsPlugin({
          // files: ['index.html'],
          externals: [
            {
              module: 'vue',
              entry: 'https://cdn.bootcdn.net/ajax/libs/vue/3.0.2/vue.runtime.global.prod.js',
              global: 'Vue',
            },
            {
              module: 'vue-router',
              entry: 'https://cdn.bootcdn.net/ajax/libs/vue-router/4.0.0-rc.1/vue-router.global.prod.min.js',
              global: 'VueRouter',
            },
            {
              module: 'vuex',
              entry: 'https://cdn.bootcdn.net/ajax/libs/vuex/4.0.0-rc.1/vuex.global.prod.min.js',
              global: 'Vuex',
            },
          ],
        }),
        // dll引用配置
        new webpack.DllReferencePlugin({
          // eslint-disable-next-line global-require
          manifest: require('./dll/dist/dll-manifest.json'),
        }),
        // dll文件拷贝到dist文件夹
        new CopyPlugin(
          [
            {
              from: './dll/dist/*.*',
              to: './dll/[name].[ext]',
              toType: 'template',
            },
          ],
        ),
        // 在html文件中引入dll文件
        // FIXME: 版本号是否可以自动修改
        new HtmlWebpackTagsPlugin({
          tags: ['dll/dll_9073a.js'],
          append: false,
          files: ['index.html'],
        }),
      ] : []),
    ],
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendors: false,
          common: false,
          // common: {
          //   name: 'chunk-common',
          //   test: /[\\/]common[\\/]/,
          //   minChunks: 1,
          //   minSize: 0,
          //   priority: 0,
          //   chunks: 'all',
          // },
        },
      },
    },
  },
  // pages: {
  //   index: 'src/index/main.ts',
  //   page1: 'src/page1/main.ts',
  // },
};
