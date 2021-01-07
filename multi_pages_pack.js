/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */

const glob = require('glob');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');

// 获取所有模块，拼接为pages
function getPages(args) {
  const { page } = args;
  console.log(page);
  const pages = glob.sync('./src/*/main.ts', {});

  if (!pages || !pages.length) {
    throw Error('src文件夹没有任何模块');
  }

  const pageNames = pages.map((d) => (d.replace(/\.\/src\/([^/]*)\/main.ts/, '$1')));

  if (page && pageNames.indexOf(page) < 0) {
    throw new Error(`页面${page}不存在！`);
  }

  const rPages = {};

  for (let i = 0; i < pageNames.length; i += 1) {
    if (!page || page === pageNames[i]) {
      rPages[pageNames[i]] = pages[i];
    }
  }

  return rPages;
}

module.exports = (api, options) => {
  function createServeOrBuildFn(commend, fn) {
    return (args, rawArgs) => {
      const isProd = process.env.NODE_ENV === 'production';

      // eslint-disable-next-line no-param-reassign
      options.pages = getPages(args);
      console.log(options.pages);

      api.configureWebpack({
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
              tags: ['dll/dll_e73b9.js'],
              append: false,
              files: ['index.html'],
            }),
          ] : []),
        ],
        optimization: {
          // 禁用vendors 和 common
          splitChunks: {
            cacheGroups: {
              vendors: false,
              common: false,
            },
          },
        },
      });

      return fn(args, rawArgs).then((res) => {
        // console.log(res);
      });
    };
  }
  // console.log(options);
  const { build, serve } = api.service.commands;

  build.fn = createServeOrBuildFn('build', build.fn, options);
  serve.fn = createServeOrBuildFn('serve', serve.fn, options);

  // 补充单元测试命令的pages选项
  // FIXME： 是否所有命令都需要补充pages选项
  // const testUnit = api.service.commands['test:unit'];
  // const testUnitFn = testUnit.fn;

  // testUnit.fn = (args, rawArgs) => {
  //   // eslint-disable-next-line no-param-reassign
  //   options.pages = getPages(args);
  //   console.log(options.pages);
  //   return testUnitFn(args, rawArgs);
  // };
};
