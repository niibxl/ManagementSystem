import axios from 'axios'
import config from '../config'
import {ElMessage} from 'element-plus'


const NETWORK_ERROR = '网络请求异常，请稍后重试！'
// 创建一个axios实例对象
const service = axios.create({
    baseURL:config.baseApi
})
// 在请求之前做一些事情
// 接收一个req请求
service.interceptors.request.use((req)=>{
    // 例如在jwt-token 认证时会用到 
    // 必须要return回req，不然回阻塞程序
    return req
})

// 在请求之后做一些事情
// 返回一个res
service.interceptors.response.use((res)=>{
    // console.log(res.data);
    const {code,data,msg} = res.data
    // 根据后端要求协商  视情况而定
    if(code === 200){
        return data
    }else{
        // 网络请求错误  若有msg则返回msg，没有返回NETWORK_ERROR
        ElMessage.error(msg || NETWORK_ERROR)
        // 返回Promise的错误信息
        return Promise.reject(msg || NETWORK_ERROR)
    }
})

// 封装的核心函数
// options是一个形参对象
function request(options){
    options.method = options.method || 'get'
    if(options.method.toLowerCase() === 'get'){
        options.params = options.data
    }
    // 对mock的处理
    let isMock = config.mock //此mock为总体配置文件的mock,即总开关
    if (typeof options.mock !== 'undefined'){ //当在核心函数里有定义mock值时，此时的mock会覆盖掉总开关的mock,实现接口自定义开关mock
        isMock = options.mock
    }
    // 对线上环境做处理
    if(config.env === 'prod'){
        // 若为线上环境，不给用mock的机会
        service.defaults.baseURL = config.baseApi
    }else{ 
        // 若开启了mock，则使用mockApi,否则使用baseApi
        service.defaults.baseURL = isMock ? config.mockApi : config.baseApi
    }

    return service(options)
}

// 导出request函数
export default request