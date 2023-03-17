import { createStore  } from 'vuex'
import { defineAsyncComponent } from 'vue';
// 引入cookie
import Cookie from  'js-cookie'
export default createStore({
    state: {
        isCollapse: true,
        currentMenu: null,
        // tab的相关数据
        tagsList: [
            {
                path: '/',
                name: 'home',
                label: '首页',
                icon: 'home'
            }
        ],
        menu: [],
        token:''
    },
    mutations: {
        updateIsCollapse(state, payload) {
            console.log(payload);
            // payload是传过来的数据
            state.isCollapse = !state.isCollapse
        },
        selectMenu(state, val) {
            // 做一些判断 若val.name是首页，则currentMenu仍未null,否则将val赋给val.name
            // val.name == 'home' ? (state.currentMenu = null) : (state.currentMenu = val)
            if (val.name == 'home') {
                state.currentMenu = null
            } else {
                state.currentMenu = val
                // 通过findIndex函数来遍历，看点击的name是否和val.name一致，若不同，则push一个新的val
                let result = state.tagsList.findIndex(item => item.name === val.name)
                result == -1 ? state.tagsList.push(val) : ''
            }
        },
        closeTab(state, val) {
            let res = state.tagsList.findIndex(item => item.name === val.name)
            // 若点击的tags和找到的索引相同，删除它
            state.tagsList.splice(res, 1)
        },
        // 设置登录后把menu数据存储到localStorage
        setMenu(state, val) {
            state.menu = val
            localStorage.setItem('menu', JSON.stringify(val))
        },
        // 看本地存储是否有menu，有的话getItem把里面的menu赋值给state.menu
        // 在App.vue里commit此事件
        addMenu(state, router) {
            // 如果获取不到本地存储的menu，直接return退出
            if (!localStorage.getItem('menu')) {
                return
            }
            // 使用 JSON.parse() 方法将数据转换为 JavaScript 对象
            const menu = JSON.parse(localStorage.getItem('menu'))
            // 再把拿到的menu赋给state.menu
            state.menu = menu

            // 动态生成路由
            const menuArray = []
            menu.forEach((item) => {
                // 如果有item.children
                if (item.children) {
                    // map生成一个新的item
                    item.children = item.children.map(item => {
                        let url = `../views/${item.url}.vue`
                        // 把url所指向的文件赋值给component
                        item.component = () => defineAsyncComponent(()=> import(/* @vite-ignore */url))   
                        return item
                    })
                    menuArray.push(...item.children)
                    
                } else {
                    let url = `../views/${item.url}.vue`
                    item.component = () => defineAsyncComponent(()=> import(/* @vite-ignore */url))   
                    
                    menuArray.push(item)
                }
            })
            menuArray.forEach(item => {
                router.addRoute('home1', item)
            });

        },
      
        // 退出功能，清除数据
        cleanMenu(state){
            state.menu = []
            localStorage.removeItem('menu')
            console.log(Cookie);
        },
        // 设置token
        setToken(state,val){
            state.token = val
            Cookie.set('token',val)
        },
        // 清除token
        cleanToken(state){
            state.token = ''
            Cookie.remove('token')
        },
        // 获取token
        getToken(state){
            state.token = state.token || Cookie.get('token')
        }
    }
})
// 在编写vue动态路由导入时发现vite一直警告，写完之后页面也报错便想来解决；
// 查找一波之后发现vite+vue3只有用 defineAsyncComponent 才能拼接成功 不然会一直报错找不到模块 ；加上defineAsyncComponent 之后需要加上/* @vite-ignore */才能消除警告；