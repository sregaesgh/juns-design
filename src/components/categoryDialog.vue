<script setup>
import { ref } from 'vue'
import { useCategoryStore } from '@/stores/index'

const categoryStore = useCategoryStore()
const dialogVisible = ref(false)
const dialogData = ref({
  cate_name: "",
  cate_alias: ""
})


// cate_alias的自定义验证
const validateCate_alias = (rule, value, callback) => {
  const reg = /^[0-9a-zA-Z]{1,15}$/
  if(reg.test(value)) {
    return callback()
  }
  callback(new Error("请输入1-15位数字加字母组合的密码"))
}

// 文章添加dialog中的表单验证规则
const rules = ref({
  cate_name: [
     { required: true, message: "分类名称不能为空", trigger: "blur"}
    ,{ min: 1, max: 10, message: "请输入1-10位非空字符", trigger: "blur"}
  ],
  cate_alias: [
     { required: true, message: "分类别名不能为空", trigger: "blur"}
    ,{ validator: validateCate_alias, trigger: "blur"}
  ]
})


// 确认添加按钮点击事件
const comfirmAdd = async (title) => {
  if(title === "添加分类") {
    await categoryStore.addCategory(dialogData.value.cate_name, dialogData.value.cate_alias)
    dialogData.value = {}
    const res = await categoryStore.getCategorys()
    // categoryStore.categoryList.value = res.data.data
    categoryStore.setCategoryList(res.data.data)
    dialogVisible.value = false
  } else {
    await categoryStore.updateCategory(dialogData.value.id, dialogData.value.cate_name, dialogData.value.cate_alias)
    dialogData.value = {}
    const res = await categoryStore.getCategorys()
    await categoryStore.setCategoryList(res.data.data)
    dialogVisible.value = false
  }
}

const open = (row) => {
  dialogVisible.value = true
  dialogData.value = { ...row }
}

defineProps({
  title: String
})

defineExpose({
  open
})
</script>


<template>
  <el-dialog :title="title" v-model="dialogVisible" width="25%">
    <el-form :model="dialogData" :rules="rules">
      <el-form-item prop="cate_name" label="分类名称">
        <el-input v-model="dialogData.cate_name" maxlength="10" minlength="1">
        </el-input>
      </el-form-item>
      <el-form-item label="分类别名" prop="cate_alias">
        <el-input v-model="dialogData.cate_alias" maxlength="15" minlength="1">
        </el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button plain @click="dialogVisible = false;">取消</el-button>
      <el-button type="primary" @click="comfirmAdd(title)">确认</el-button>
    </template>
  </el-dialog>
</template>