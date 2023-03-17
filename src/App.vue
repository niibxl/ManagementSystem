<script setup>
// 写在app里有问题，当组件要开始渲染页面，而此时才开始添加动态路由，不合适，应写在main.js
// import { useRouter } from 'vue-router'
// import {useStore} from 'vuex'
// const store = useStore()
// const router = useRouter()
// store.commit("addMenu",router)
</script>

<template>
  <!-- <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div> -->
  <!-- <HelloWorld msg="Vite + Vue" /> -->

  <!-- 只需在此放置router-view -->
    <router-view />
  
</template>

<style>
/* 
设置高度100%时，div的高度会等同于其父元素的高度。而上面中id为app的div
（vue挂载的div）的父节点是body标签，body标签的父节点是html标签。在默
认情况下html和body标签的高度为auto，而浏览器是不会自动给标签添加高度
的，所以html和body标签就为0，自然子div的高度设置为100%就不起作用了。 */
/* 所以将app的父节点也都设置为height100% */
html,body{
  height: 100%;
}
#app{
  height: 100%;
}
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
