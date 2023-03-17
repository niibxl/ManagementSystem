
<template>
  <!-- 一般除导航栏和页面头部，中间大的变化的部分叫做Home -->
  <el-row class="home" :gutter="20">
    <!-- home是栅格布局 左侧占8右侧占16 -->
    <el-col :span="8" style="margin-top: 20px">
      <el-card shadow="hover" class="el-card-define">
        <div class="user">
          <img src="../../assets/images/wukong.png" alt="" />
          <div class="user-info">
            <p class="name">Admin</p>
            <p class="role">超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登陆时间：<span>2023-1-30</span></p>
          <p>上次登陆地点：<span>汕头</span></p>
        </div>
      </el-card>
      <el-card shadow="hover" height="450px" style="margin-top: 20px">
        <el-table :data="tableData">
          <el-table-column
            v-for="(val, key) in tableLabel"
            :key="key"
            :prop="key"
            :label="val"
          ></el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16" style="margin-top: 20px">
      <div class="num">
        <el-card
          :body-style="{ display: 'flex', padding: 0 }"
          v-for="item in countData"
          :key="item.name"
        >
          <component
            class="icons"
            :is="item.icon"
            :style="{ background: item.color }"
          ></component>
          <div class="details">
            <p class="num">￥{{item.value}}</p>
            <p class="txt">{{item.name}}</p>
          </div>
        </el-card>
      </div>
      <el-card style="height:280pox">
        <div ref="echart1" style="height:280px"></div>
      </el-card>
      <div class="graph">
        <el-card style="height:260px">
          <div ref="userechart" style="height:240px"></div>
        </el-card>
        <el-card style="height:260px">
          <div ref="videoechart" style="height:240px"></div>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { onMounted, ref, getCurrentInstance, reactive } from "vue";
import * as echarts from 'echarts'
import axios from "axios"
export default {
  setup() {
    // 调用getCurrentInstance拿到里面的proxy，它类似于vue2里面的this
    const { proxy } = getCurrentInstance();
    // 使用ref来接受一下[]
    let tableData = ref([]);
    let countData = ref([]);
    const tableLabel = {
      name: "课程",
      todayBuy: "今日购买",
      monthBuy: "本月购买",
      totalBuy: "总购买",
    };
    //  异步调用，可以使用async
    const getTableList = async () => {
      // 在fastmock里生成接口地址
      // await axios.get("https://www.fastmock.site/mock/0499ce0f605e56f307c7f6cecc234dec/api/api").then((res) => {
      //    console.log(res);//结果为一个data对象，数据存放再res.data.data.tableData
      //    console.log(res);//当使用fastmock时，res为一个object对象，数据存放在res.data.data
      //    // tableData.value = res.data.data.tableData
      //    // 做一些判断再渲染
      //    if(res.data.code === 200){
      //       tableData.value = res.data.data
      //    }
      // })
      // 获取tableData数据
      let res = await proxy.$api.getTableData();
      tableData.value = res;
    };
    const getCountData = async () => {
      let res = await proxy.$api.getCountData();
      // console.log(res);
      countData.value = res;
    };
    onMounted(() => {
      // 调用一下getTableList
      getTableList();
      getCountData();
      getChartData()
    });
    // echarts表格的渲染部分
    let xOptions = reactive({
      legend: {
      // 图例文字颜色
      textStyle: {
        color: "#333",
      },
    },
    grid: {
      left: "20%",
    },
    // 提示框
    tooltip: {
      trigger: "axis",
    },
    xAxis: {
      type: "category", // 类目轴
      data: [],
      axisLine: {
        lineStyle: {
          color: "#17b3a3",
        },
      },
      axisLabel: {
        interval: 0,
        color: "#333",
      }
    },
    yAxis:{}
    })
    // 饼状图部分
    let pieOptions = reactive({
      tooltip: {
            trigger: "item",
          },
          color: [
            "#0f78f4",
            "#dd536b",
            "#9462e5",
            "#a6a6a6",
            "#e1bb22",
            "#39c362",
            "#3ed1cf",
          ],
          series: [],
    })
    let orderData = reactive({
      xData:[],
      series:[]
    })
    let userData = reactive({
      xData:[],
      series:[]
    })
    let videoData = reactive({
      series:[]
    })

    // 获取表格数据、
    const getChartData = async () => {
      let result = await proxy.$api.getChartData()
      console.log(result)
      // let a = 'orderData'
      // let res = result[a] 
      let res = result.orderData
      // console.log(result);
      let userRes = result.userData
      let videoData = result.videoData
      // console.log(res);
      // console.log(userRes);
      // console.log(videoData);
      orderData.xData = res.date
    
      const keyArray = Object.keys(res.data[0])
      const series = [] ;
      keyArray.forEach((key)=>{
        series.push({
          name:key,
          data:res.data.map((item)=>item[key]),
          type:"line"
        })
      })
      orderData.series = series
      xOptions.xAxis.data = orderData.xData
      xOptions.series = orderData.series
      // userData进行渲染
      let hEcharts = echarts.init(proxy.$refs["echart1"])
      hEcharts.setOption(xOptions)


      // // 柱状图进行渲染
      // userData.xData = userRes.map((item) => item.date)
      // userData.series = [
      //   {
      //     name:'新增用户',
      //     data:userRes.map((item) => item.new),
      //     type:'bar'
      //   },
      //   {
      //     name:'活跃用户',
      //     data:userRes.map((item) => item.active),
      //     type:'bar'
      //   }
      // ]
      // xOptions.xAxis.data = userData.xData
      // xOptions.series = userData.series
      // // userData进行渲染
      // let uEcharts = echarts.init(proxy.$refs["userechart"])
      // uEcharts.setOption(xOptions)
    }
    return {
      tableData,
      tableLabel,
      countData,
    };
  },
};
</script>

<style lang="less" scoped>
.home {
  .user {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 1px solid #ccc;
    margin-bottom: 20px;
    img {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      margin-right: 40px;
    }
  }
  .login-info {
    p {
      line-height: 30px;
      font-size: 14px;
      color: #999;
      span {
        color: #666;
        margin-left: 60px;
      }
    }
  }
  .num{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .el-card{
      width: 32%;
      margin-bottom: 20px;
    }
    .icons{
      width: 80px;
      height: 80px;
      font-size: 30px;
      text-align: center;
      line-height: 80px;
      color: #fff;
    }
    .details{
      margin-left: 15px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .num{
        font-size: 30px;
        margin-bottom: 10px;
      }
      .txt{
        font-size: 14px;
        text-align: center;
        color: #999;
      }
    }
  }
  .graph{
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    .el-card{
      width: 48%;
    }
  }
}
</style>