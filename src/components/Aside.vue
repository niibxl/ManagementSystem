<template>
  <el-aside width="$store.state.isCollapse ? '180px' : '64px'">
    <!-- 把element源码放到el-aside里面来   collapse是折叠属性-->
    <!-- collapse-transition属性  设置过渡的动画效果 -->
    <el-menu
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      :collapse="!$store.state.isCollapse"
      :collapse-transition="false"
    >
      <h3 v-show="$store.state.isCollapse">后台管理</h3>
      <h3 v-show="!$store.state.isCollapse">后台</h3>
      <!-- el-sub-menu是二级菜单，el-menu-item是一级的菜单。 -->
      <!-- 一级菜单所以没有children元素，调用noChildren方法过滤 -->
      <!-- 绑定点击后路由跳转事件clickMenu -->
      <el-menu-item
        :index="item.path"
        v-for="item in noChildren()"
        :key="item.path"
        @click="clickMenu(item)"
      >
        <!-- vue3使用component实现动态图标的引入  is属性实现动态  为什么可以遍历图标？因为在main.js里面已经引入相关配置-->
        <component class="icons" :is="item.icon"></component>
        <span>{{ item.label }}</span>
      </el-menu-item>
      <el-sub-menu
        :index="item.path"
        v-for="item in hasChildren()"
        :key="item.path"
      >
        <template #title>
          <component class="icons" :is="item.icon"></component>
          <span>{{ item.label }}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item
            :index="subItem.path"
            v-for="(subItem, subIndex) in item.children"
            :key="subIndex"
            @click="clickMenu(subItem)"
          >
            <component class="icons" :is="subItem.icon"></component>
            <span>{{ subItem.label }}</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
    </el-menu>
  </el-aside>
</template>

<script>
// 引入useRouter
import { useRouter } from "vue-router";
import { useStore } from "vuex";
export default {
  setup() {
    // 引入store
    const store = useStore();
    const list = [
      {
        path: "/",
        name: "home",
        label: "首页",
        // 此时icon图标的home改名了，到官网上查看改一下就好。
        icon: "HomeFilled",
        url: "Home/Home",
      },
      {
        path: "/mall",
        name: "mall",
        label: "商品管理",
        icon: "video-play",
        url: "MallManage/MallManage",
      },
      {
        path: "/user",
        name: "user",
        label: "用户管理",
        icon: "user",
        url: "UserManage/UserManage",
      },
      {
        label: "其他",
        icon: "location",
        path: "/others",
        children: [
          {
            path: "/page1",
            name: "page1",
            label: "页面1",
            icon: "Document",
            url: "Other/PageOne",
          },
          {
            path: "/page2",
            name: "page2",
            label: "页面2",
            icon: "Document",
            url: "Other/PageTwo",
          },
        ],
      },
    ];
    // 调用useRouter
    const router = useRouter();
    // 把state里的menu传入到list,根据不同用户信息登入改变左侧状态栏的显示
    const asyncList = store.state.menu
    // 引入两个原先有的函数
    // 此处filter是数组方法
    const noChildren = () => {
      return asyncList.filter((item) => !item.children);
    };
    const hasChildren = () => {
      return asyncList.filter((item) => item.children);
    };

    // 在Header里点击菜单图标后调用tab.js里的mutation事件来改变state存储的值，然后改变的值会在Aside里的computed属性被监测到，Aside根据变化的值做出响应式动作——展开或关闭。
    const clickMenu = (item) => {
      router.push({
        name: item.name,
      });
      // 面包屑：点击Aside里的 显示的是Header里的 使用vuex来实现组件间通信
      // item是一个对象
      store.commit("selectMenu", item);
    };

    // 把函数交出去
    return {
      noChildren,
      hasChildren,
      clickMenu,
      asyncList
    };
  },
};
</script>

<style lang="less">
.icons {
  width: 18px;
  height: 18px;
}
.el-menu {
  border-right: none;
  h3 {
    line-height: 48px;
    text-align: center;
    color: #fff;
  }
}
</style>