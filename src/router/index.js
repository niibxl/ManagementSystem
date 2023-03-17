// 引入路由配置的两个函数
import { createRouter, createWebHashHistory } from 'vue-router'

const routes =  [
    {
        path:'/',
        // component后写一个箭头函数，在此处import时路径必须引入完整
        component:()=> import('../views/Main.vue'),
        name:'home1',
        // 重定向，若是根路径则重定向到home
        // 修改为login后没有token就无法通过路径访问
        redirect:'/login',
        // children的写法也是一个数组，里面再来一个对象
        // children:[
        //     {
        //         path:'/',
        //         name:'home',
        //         component:()=>import('../views/home/Home.vue')
        //     },
        //     {
        //         path:'/user',
        //         name:'user',
        //         component:()=>import('../views/User/User.vue')
        //     },
        //     {
        //         path:'/page1',
        //         name:'page1',
        //         component:()=>import('../views/Page1.vue')
        //     },
        //     {
        //         path:'/page2',
        //         name:'page2',
        //         component:()=>import('../views/Page2.vue')
        //     }
        // ]
        children:[]
    },
    // 登录的路由
    {
        path:'/login',
        name:'login',
        component:()=>import('../views/Login.vue')
    }
]

// 创建router,调用createRouter和createWebHashHistory和routes这几个方法,然后去main.js里使用router
const router = createRouter({
    history:createWebHashHistory(),
    routes
})
// 导出路由
export default router