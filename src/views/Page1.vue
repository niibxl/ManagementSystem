<template>
   <input type="text" v-show="showMe" id="inp">
  <button @click="handleInput">点击显示输入框并且获取焦点</button>
</template>

<script>
import { getCurrentInstance ,ref} from 'vue'
export default {
  setup(){
    const showMe = ref(false)
    // 注意proxy要解构出来
    const {proxy} = getCurrentInstance()  
    const handleInput = () => {
      showMe.value = true 
      // console.log(document.getElementById('inp').style.display);
      // 实现的逻辑：先把input框display出来，然后再focus，但是getid时input框的display为none，所以foucus方法不生效。
      proxy.$nextTick(() =>{
        document.getElementById('inp').focus()
      })
      
    }

    return {
      showMe,
      handleInput,
    }
  }
}
</script>

<style>

</style>