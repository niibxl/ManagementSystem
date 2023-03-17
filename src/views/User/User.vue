<template>
  <div class="user-header">
    <el-button type="primary" @click="handleAdd">+新增</el-button>
    <el-form :inline="true" :model="formInline">
      <el-form-item label="请输入">
        <el-input v-model="formInline.keyword" placeholder="请输入用户名" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="handleSearch">搜索</el-button>
      </el-form-item>
    </el-form>
  </div>
  <div class="table">
    <!-- table中可以设置高度，会固定在此高度并出现滚动条 -->
    <el-table :data="list" style="width: 100%">
      <el-table-column
        v-for="item in tableLabel"
        :key="item.prop"
        :label="item.label"
        :prop="item.prop"
        :width="item.width ? item.width : 125"
      />
      <el-table-column fixed="right" label="操作" min-width="180">
        <!-- 使用插槽 实现编辑时把数据传过来 scope.row的target就是要传的某条数据-->
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.row)"
            >编辑</el-button
          >
          <el-button type="danger" size="small" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      small
      background
      layout="prev, pager, next"
      :total="config.total"
      class="mt-4"
      @current-change="changePage"
    />
  </div>
  <!-- 改变新增和编辑时的title，两者复用一个模态框 -->
  <el-dialog
    v-model="dialogVisible"
    :title="action == 'add' ? '新增用户' : '编辑用户'"
    width="40%"
    :before-close="handleClose"
  >
    <!-- 模态框的表单 -->
    <!-- 使用el-row和el-col包裹 :span=12 分为两列 实 -->
    <el-form :inline="true" :model="formUser" ref="userForm">
      <el-row>
        <!-- required为true，必填项 -->
        <el-col :span="12">
          <el-form-item
            label="姓名"
            prop="name"
            :rules="[
              {
                required: true,
                message: '姓名是必填项',
              },
            ]"
          >
            <el-input v-model="formUser.name" placeholder="请输入姓名" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="年龄"
            prop="age"
            :rules="[
              {
                required: true,
                message: '年龄是必填项',
              },
              {
                type: 'number',
                message: '年龄必须是数字',
              },
            ]"
          >
            <el-input v-model.number="formUser.age" placeholder="请输入年龄" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <!-- 性别设置为一个下拉框 -->
          <el-form-item
            label="性别"
            prop="sex"
            :rules="[
              {
                required: true,
                message: '性别是必填项',
              },
            ]"
          >
            <el-select v-model="formUser.sex" placeholder="请选择性别">
              <el-option label="男" value="0" />
              <el-option label="女" value="1" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <!-- 出生日期使用el-date-picker组件 -->
          <!-- 可在里面修改value-format属性，设置输入日期的格式 -->
          <el-form-item
            label="出生日期"
            prop="birth"
            :rules="[
              {
                required: true,
                message: '出生日期是必填项',
              },
            ]"
          >
            <el-date-picker
              v-model="formUser.birth"
              type="date"
              label="出生日期"
              placeholder="请选择出生日期"
              style="width: 100%"
              value-format="YYYY-MM-DD"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="地址"
            prop="addr"
            :rules="[
              {
                required: true,
                message: '地址是必填项',
              },
            ]"
          >
            <el-input v-model="formUser.addr" placeholder="请输入地址" />
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 在el-row设置样式让其居右 -->
      <el-row style="justify-content: flex-end">
        <el-form-item>
          <el-button type="info" @click="handleCancer">取消</el-button>
          <el-button type="primary" @click="onSubmit">确定</el-button>
        </el-form-item>
      </el-row>
    </el-form>
    <!-- <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogVisible = false">
          确定
        </el-button>
      </span>
    </template> -->
  </el-dialog>
</template>

<script>
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  reactive,
  ref,
} from "vue";

export default defineComponent({
  setup() {
    const { proxy } = getCurrentInstance();
    const list = ref([]);
    const tableLabel = reactive([
      {
        prop: "name",
        label: "姓名",
      },
      {
        prop: "age",
        label: "年龄",
      },
      {
        prop: "sexLabel",
        label: "性别",
      },
      {
        prop: "birth",
        label: "出生日期",
        width: 200,
      },
      {
        prop: "addr",
        label: "地址",
        width: 320,
      },
    ]);
    onMounted(() => {
      // 切换页码时将config传进去
      getUserData(config);
    });
    // 设置pagination
    const config = reactive({
      total: 0,
      page: 1,
      name: "",
    });
    const getUserData = async (config) => {
      let res = await proxy.$api.getUserData(config);
      config.total = res.count;
      // console.log(res);
      // 渲染上数据   sex后端中的数据是sex：0或1，必须要与前端中prop项sexLabel相同才可以，所以这里做一些映射
      list.value = res.list.map((item) => {
        item.sexLabel = item.sex === 0 ? "女" : "男";
        // 必须返回一个新的item
        return item;
      });
    };
    const changePage = (page) => {
      // console.log(page); 默认的参数page是当前页码数  将当前页码数赋值给config.page
      config.page = page;
      // 再次调用getUserData，把更新后的config传过去
      getUserData(config);
    };

    const formInline = reactive({
      keyword: "",
    });
    const handleSearch = () => {
      config.name = formInline.keyword;
      getUserData(config);
    };
    // 控制模态框的显示与隐藏
    const dialogVisible = ref(false);

    // handleClose事件
    const handleClose = (done) => {
      ElMessageBox.confirm("确认关闭吗？")
        .then(() => {
          // 重置表单数据
          proxy.$refs.userForm.resetFields();
          done();
        })
        .catch(() => {
          // catch error
        });
    };
    // 添加用户的form数据
    const formUser = reactive({
      name: "",
      age: "",
      sexLabel: "",
      birth: "",
      addr: "",
    });
    // 添加用户
    const onSubmit = () => {
      // 在添加时设置校验
      // 调用proxy.$refs.userForm下的validate方法校验，若返回的valid参数是false，
      // 则校验不通过，返回的valid有效时才执行添加的a逻辑。
      // await和async是成对出现，且await会找到上一个回调函数里的async，所以async要改变位置。
      proxy.$refs.userForm.validate(async (valid) => {
        console.log(valid);
        if (valid) {
          // 添加用户的接口
          if (action.value == "add") {
            let res = await proxy.$api.addUser(formUser);
            console.log(res);
            if (res) {
              // 若有res，调用此函数并在各项里添加prop属性，还要重置输入框
              proxy.$refs.userForm.resetFields();
              // 接着把模态框消失，并把数据传给getUserData
              dialogVisible.value = false;
              getUserData(config);
            }
          } else {
            // 编辑用户的接口
            // 输出的是可以拿到id的，后台会根据id来进行操作
            // console.log(formUser);
            // 将sex又转化为数字0和1
            formUser.sex == "男" ? (formUser.sex = 1) : (formUser.sex = 0);
            let res = await proxy.$api.editUser(formUser);
            if (res) {
              // 若有res，调用此函数并在各项里添加prop属性，还要重置输入框
              proxy.$refs.userForm.resetFields();
              // 接着把模态框消失，并把数据传给getUserData
              dialogVisible.value = false;
              getUserData(config);
            }
          }
        } //输入不符合要求时做一些提示
        else {
          // 调用函数ElMessage，传入对象，showClose指是否显示关闭按钮，message指提示的内容，type指消息类型
          ElMessage({
            showClose: true,
            message: "请输入正确的内容！",
            type: "error ",
          });
        }
      });
    };
    // 在模态框点击取消时
    const handleCancer = () => {
      dialogVisible.value = false;
      proxy.$refs.userForm.resetFields();
    };
    // 定义一个变量，改变模态框的title 新增用户和编辑用户
    const action = ref("add");
    // 编辑事件
    const handleEdit = (row) => {
      // console.log(row);
      dialogVisible.value = true;
      action.value = "edit";
      // 返回的sex是数字,做一些处理
      row.sex == 1 ? (row.sex = "男") : (row.sex = "女");
      // 使用浅拷贝，把row的值赋值到模态框上
      // 把赋值写在nextTick回调里，解决点击编辑后再点击新增时残留上次操作数据的问题
      // Object.assign(formUser, row);
      proxy.$nextTick(() => {
        Object.assign(formUser, row);
      });
    };
    // 新增事件
    const handleAdd = () => {
      dialogVisible.value = true;
      action.value = "add";
    };
    // 删除事件
    const handleDelete = (row) =>{
      ElMessageBox.confirm("你确定要删除吗？")
        .then( async () => {
          // 确定要删除,则把id传给后端执行删除操作
          // 调用后端接口deleteUser执行删除操作
          await proxy.$api.deleteUser({
            id:row.id
          })
          // 设置提示框
          ElMessage({
            showClose:true,
            message:'删除成功！',
            type:'success'
          })
          // 重新调用getUserData
          getUserData(config)
        })
        .catch(() => {
          // catch error
        });
    }
    return {
      list,
      tableLabel,
      config,
      changePage,
      formInline,
      handleSearch,
      dialogVisible,
      handleClose,
      formUser,
      onSubmit,
      handleCancer,
      action,
      handleEdit,
      handleAdd,
      handleDelete,
    };
  },
});
</script>

<style lang="less" scoped>
.table {
  position: relative;
  height: 520px;
  // 页码栏为什么无法靠右
  .mt-4 {
    position: absolute;
    right: 10px;
    bottom: -390px;
  }
}
.user-header {
  display: flex;
  justify-content: space-between;
}
</style>