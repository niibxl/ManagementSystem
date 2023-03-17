// 整个项目api的管理
import request from "./require";
export default {
    // 在全局挂载api后，可以拿到此方法
    // home组件
    getTableData(params){
        // request是一个函数，支持传入对象
        return request({
            // url指调用的后端接口
            url:"/home/getTableData",
            method:'get',
            data:params,
            // 在此处开启mock开关
            mock:true
        })
    },
    // 定义一下getCountData函数
    getCountData(){
        return request({
            url:'/home/getCountData',
            method:'get',
            mock:true
        })
    },
    getChartData(){
        return request({
            url:'/home/getChartData',
            method:'get',
            mock:true
        })
    },
    getUserData(params){
        return request({
            url:'/user/getUser',
            method:'get',
            // 此处mock若为true,使用的是线上fastmock的数据。
            mock:false,
            data:params
            // 此时data的值就是传过来的config
        })
    },
    addUser(params){
        return request({
            url:'/user/add',
            method:'post',
            // 此处mock若为true,使用的是线上fastmock的数据。
            mock:false,
            data:params
            // 此时data的值就是传过来的config
        })
    },
    editUser(params){
        return request({
            url:'/user/edit',
            method:'post',
            // 此处mock若为true,使用的是线上fastmock的数据。
            mock:false,
            data:params
            // 此时data的值就是传过来的config
        })
    },
    deleteUser(params){
        return request({
            url:'/user/delete',
            method:'post',
            // 此处mock若为true,使用的是线上fastmock的数据。
            mock:false,
            data:params
            // 此时data的值就是传过来的config
        })
    },
    // 根据用户名不同返回不一样的菜单列表
    getMenu(params){
        return request({
            url:'/permission/getMenu',
            method:'post',
            // 此处mock若为true,使用的是线上fastmock的数据。
            mock:false,
            data:params
            // 此时data的值就是传过来的config
        })
    }
}