<template>
  <div class="tags">
    <!-- :effect是主题  若相同，dark设置为蓝色。   绑定一个点击事件，把点击的tag传进去函数，切换路由。-->
    <el-tag  
        :key="tag.name"
        v-for="(tag, index) in tags" 
        :closable="tag.name !== 'home'" 
        :disable-transitions="false" 
        :effect = "$route.name === tag.name ? 'dark' : 'plain'"
        @click="changeMenu(tag)"
        @close="handleClose(tag,index)"
    >
    {{tag.label}}</el-tag>
  </div>
</template>

<script>
import {useRoute, useRouter} from "vue-router"
import { useStore } from 'vuex';

export default {
    setup() {
        const store = useStore()
        const router = useRouter()
        const route = useRoute()
        const tags = store.state.tagsList
        // 点击切换菜单事件
        const changeMenu = (item)=>{
            router.push({name:item.name})
        }
        // 点击关闭tag
        const handleClose = (tag,index)=>{
            let length = tags.length - 1
            // 处理vuex中的tabsList
            store.commit("closeTab",tag)
            // 做第一个判断
            if(tag.name !== route.name){
                return
            }
            if( index === length ){
                router.push({
                    // 是最后一个，删除时跳到它前一个
                    name:tags[index -1 ].name
                })
            }else{
                router.push({
                    // 若是直接删除当前页面，跳到后一个
                    name:tags[index].name
                })
            }
        }

        return {
            tags,
            changeMenu,
            handleClose
        }
        
    }
};
</script>

<style lang="less" scoped>
    .tags{
        padding: 20px;
        width: 100%;
        .el-tag{
            margin-right: 15px;
            cursor: pointer;
        }
    }
</style>