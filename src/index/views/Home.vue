<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
// webpack打包时会通过dll的dll-manifest.json导入dll目录下的模块
import alpha from '../../../dll/alpha';
import { sayHello } from '../../../dll/index';
import HelloWorld from '../components/HelloWorld.vue';

export default defineComponent({
  name: 'Home',
  components: {
    HelloWorld,
  },
  setup() {
    sayHello();
    console.log(alpha);
  },
});
</script>
