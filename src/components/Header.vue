<template>
  <el-header>
    <div class="l-content">
      <!-- 图标的展示 -->

      <!-- 这里需要套在按钮里使用 -->
      <el-button size="small" @click="handleCollapse">
        <el-icon :size="20">
          <Menu />
        </el-icon>
      </el-button>
      <el-breadcrumb separator="/" class="bread">
      <!-- 首页是一定要有的  直接写死 -->
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="current.path" v-if="current">{{current.label}}</el-breadcrumb-item>
        
      </el-breadcrumb>
      <!-- 用法一：使用 el-icon 为 SVG 图标提供属性 -->
      <!-- <el-icon :size="size" :color="color">
        <Edit />
      </el-icon> -->
      <!-- 用法二：直接使用 SVG 图标 -->
      <!-- SVG是一种基于XML的矢量图形格式 -->
      <!-- 用于在Web和其他环境中显示各种图形;它允许我们编写可缩放的二维图形,并可通过CSS或JavaScript进行操作。 -->
      <!-- 由于SVG图标默认不携带任何属性 -->
      <!-- 你需要直接提供它们 -->
      <!-- <Edit style="width: 1em; height: 1em; margin-right: 8px" /> -->
    </div>
    <div class="r-content">
      <el-dropdown>
        <span class="el-dropdown-link">
          <!-- 动态引入图片  注意src前绑定:-->
          <img class="user" :src="getImgSrc('wukong')" alt="" />
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item @click="handleLoginOut">退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>

<script>
import { computed } from '@vue/runtime-core';
// 引入store
import { useStore } from "vuex";
import { useRouter } from 'vue-router';
export default {
  setup() {
    // 不再是像vue2里this.$store去调用
    let store = useStore();
    // 动态引入图片
    // vite中不支持require
    // const imgSrc  = require('../assets/images/user.png')
    // 正确方式是定义一个函数
    const getImgSrc = (wukong) => {
      // console.log(import.meta.url); // /src/components/Header.vue
      // console.log(new URL(`../assets/images/${user}.png`, import.meta.url)); //输出是一个URL对象，里面的href属性"http://localhost:5173/src/assets/images/user.png"
      // vue3+vite动态引入图片的公式  第二个参数是base基准路径，以此为基准将图片的完整路径拼接起来放在URL对象的href里面，将其返回
      return new URL(`../assets/images/${wukong}.png`, import.meta.url).href;
    };
    // 定义一个处理按钮点击收缩Aside栏
    let handleCollapse = () => {
      // 调用vuex中的mutations  commit参数和mutations定义的事件名一样
      store.commit("updateIsCollapse", "可以传输数据给store配置里的payload");
    };

    // 写计算属性
    const current = computed(()=>{
      return store.state.currentMenu
    }) 
    // 设置退出功能
    const router = useRouter()
    const handleLoginOut =() =>{
      // 清除本地存储的数据
      store.commit('cleanMenu')
      // 跳转到登录界面
      router.push({
        name:'login'
      }) 
      // 退出后清除token
      store.commit('cleanToken')
    }
    return {
      getImgSrc,
      handleCollapse,
      current,
      handleLoginOut
    };
  },
};
</script>

<style lang="less" scoped>
/* css两个选择器之间要加, */
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background: #333;
}
.r-context,
.user {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.l-content {
  display: flex;
  align-items: center;
  .el-button {
    margin-right: 20px;
  }
  h3 {
    color: #fff;
  }
}
.bread :deep(span) {
  color: #fff !important;
  // 有一个小手的效果
  cursor: pointer !important;
}
</style>

