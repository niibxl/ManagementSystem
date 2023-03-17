import { createApp } from 'vue'
// 注释掉原先样式
// import './style.css'
// 引入less 样式  并且引入前需先yarn add less
import './assets/less/index.less'
// 引入store
import store from './store'
// 引入mock
import './api/mock.js'
import App from './App.vue'
// 引入配置好的路由router
import router from './router'
// 引入icon
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// App是根组件
const app = createApp(App)
// 完成图标注册（注意放在创建app的下面）
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }

  // 引入api
import api from './api/api'
// 在全局挂载一个$api
app.config.globalProperties.$api = api
// 使用router()
// 注意：app.use(router) 需放在app.mount(’#app’)前面 不然加载时router-view、router-link等未被渲染
// 放在app.use(router).use(store)之前，准备好动态路由
store.commit("addMenu",router)



// 未登录时输入其他页面地址，强制跳转到login
router.beforeEach((to,from,next)=>{
  store.commit('getToken')
  const token = store.state.token
  // 如果没有token且地址不是login地址，转到login地址
  if (!token && to.name !== 'login') {
    next ({name:'login'} )
  }else{
    next()
  }
})


app.use(router).use(store)
app.mount('#app')

// createApp(App).mount('#app')
