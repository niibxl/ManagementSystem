<template>
    <el-form :v-model="loginForm" class="loginContainer" :rules = "rules">
        <h3>系统登录</h3>
        <el-form-item>
            <el-input type="input" placeholder="请输入账号" v-model="loginForm.username" ></el-input>
        </el-form-item>
        <el-form-item>
            <el-input type="password" placeholder="请输入密码" v-model="loginForm.password" ></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="login" >登录</el-button>
        </el-form-item>
    </el-form>
</template>

<script>

import {getCurrentInstance, reactive} from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
export default {
    setup() {
        // 此处proxy需要解构一下
        const {proxy} = getCurrentInstance()
        const store = useStore()
        const router = useRouter()
        const loginForm = reactive({
            username:'admin',
            password:'admin'
        })
        const rules = reactive({           
                username: [
                    { required: true, trigger: 'blur', message: '请输入用户名' }
                ],
                password: [
                    { required: true, trigger: 'blur', message: '请输入密码' }
                ]          
        })
        const login = async () =>{
            // 把loginForm传过去getMenu这个后端接口l
            const res = await  proxy.$api.getMenu(loginForm)
            // console.log(res);res里的menu就是permission里的menu数据
            store.commit("setMenu",res.menu)
            // 调用commit,把路由传过去
            store.commit("addMenu",router)
            // 设置token
            store.commit('setToken',res.token)
            // 设置路由跳转到home
            router.push({
                name:'home'
            })

        }

        return {
            loginForm,
            login,
            rules
        }
    }
}
</script>

<style lang="less" scoped>
    .loginContainer{
        width: 350px;
        background: #fff;
        border: 1px solid #eaeaea;
        border-radius: 15px;
        padding: 35px 35px 15px 35px;
        // 设置盒子的阴影效果
        box-shadow: 0 0 25px #cacaca;
        margin: 180px auto;
        h3{
            text-align: center;
            margin-bottom: 20px;
            color: #505450;
        }
        :deep(.el-form-item__content){
            justify-content: center;
        } 
    }
</style>