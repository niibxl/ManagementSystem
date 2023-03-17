// 使用mock模拟数据  首先下载：yarn add mockjs -S
// mockjs是在没有后端接口数据的情况下通过拦截Ajax请求返回随机数据的工具。
// 引入mock
import Mock from 'mockjs'
import homeApi from './mockData/home'
import userApi from './mockData/user'
import permissionApi from './mockData/permission'
// 拦截请求  第一个参数是拦截请求的地址  第二个参数是返回相关的数据
// Mock.mock('/home/getData',homeApi.getHomeData)


// problem:此处如何识别使用get和post
// 本地获取user的数据
Mock.mock(/user\/getUser/,'get',userApi.getUserList)
// 添加用户
Mock.mock(/user\/add/,'post',userApi.createUser)
// 编辑用户
Mock.mock(/user\/edit/,'post',userApi.updateUser)
// 删除用户
Mock.mock(/user\/delete/,'post',userApi.deleteUser)
// 根据用户名不同返回不一样的菜单列表
Mock.mock(/permission\/getMenu/,'post',permissionApi.getMenu)


