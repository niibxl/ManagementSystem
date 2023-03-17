<template>
  <!-- 一般导航栏和页面头部叫做Main -->
  <!-- 在element官网上引入合适的布局容器 -->
  <div class="common-layout">
    <el-container class="lay-container" >
      <Aside></Aside>
      <el-container >
        <!-- <el-header>Header</el-header> -->
        <Header></Header>
        <Tab></Tab>
        <el-main class="right-main">
            <!-- 放置home组件 -->
            <!-- 根据路由跳转来显示不同的页面 -->
            <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";
// 引入Header组件
import Header from '../components/Header.vue'
import Aside from '../components/Aside.vue'
import Tab from '../components/Tab.vue'
export default  defineComponent ({
  components:{
    Header,Aside,
    Tab
  }
})
</script>

<style lang="less" scoped>
  .el-container{
    /* 使强制换行 */
    flex-wrap: wrap;
    align-items: flex-start;
    // 把右侧home部分高度设为100%
    height: 100%;
  }
  .common-layout{
    height: 100%;
     & >  .el-container{
      height: 100%;
      & > .el-aside{
        height: 100%;
        background-color: #545c64;
      }
    }
    .lay-container{
      flex-wrap: nowrap;
      .right-main{
        height: calc(100% - 124px);
      }
    }
  }
</style>