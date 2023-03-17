// 环境配置文件
//     一般在企业开发中有三个环境
//         开发环境
//         测试环境
//         线上环境

// 当前的环境           (prod 指线上)
const env = import.meta.env.MODE || 'prod'

const envConfig = {
    development:{
        baseApi:'/api',
        mockApi:'https://www.fastmock.site/mock/0499ce0f605e56f307c7f6cecc234dec/api'
    },
    test:{
        // baseApi在真正开发时由公司提供
        baseApi:'//test.com/api',
        mockApi:'https://www.fastmock.site/mock/0499ce0f605e56f307c7f6cecc234dec/api'
    },
    pro:{
        baseApi:'//pro.com/api',
        mockApi:'https://www.fastmock.site/mock/0499ce0f605e56f307c7f6cecc234dec/api'
    }
}

// 导出数据
export default {
    env,
    // mock的总开关  总开关的设置不影响单个mock的开关
    mock:true,
    // envConfig对象里选其中的env这个对象
    ...envConfig[env]
}