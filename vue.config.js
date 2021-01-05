const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');

const isProd = process.env.NODE_ENV === 'production';


module.exports = {
  configureWebpack: {
    mode: 'none',
    plugins: [
      ...(isProd ? [new HtmlWebpackExternalsPlugin({
        externals: [
          {
            module: 'vue',
            entry: 'https://cdn.bootcdn.net/ajax/libs/vue/3.0.2/vue.runtime.global.prod.js',
            global: 'Vue',
            // files: [],
          },
          {
            module: 'vue-router',
            entry: 'https://cdn.bootcdn.net/ajax/libs/vue-router/4.0.0-rc.1/vue-router.global.prod.min.js',
            global: 'VueRouter',
            // files: [],
          },
          {
            module: 'vuex',
            entry: 'https://cdn.bootcdn.net/ajax/libs/vuex/4.0.0-rc.1/vuex.global.prod.min.js',
            global: 'Vuex',
            // files: [],
          }
        ]
      })] : []),
    ],
  },
  pages: {
    index: {
      // page 的入口
      entry: 'src/main/main.ts',
      // 模板来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename: 'index.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'Index Page',
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ['chunk-vendors', 'chunk-common', 'index'],
    },
    page1: 'src/page1/main.ts',
  },
};
