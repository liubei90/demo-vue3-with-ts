declare module '*.vue' {
  import type { DefineComponent } from 'vue';

  const component: DefineComponent<{}, {}, any>;
  export default component;
}

// NOTE: 导入js文件时，需要配置该声明
// declare module '*'
