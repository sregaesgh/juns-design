<script setup>
import ContainerHeader from '@/components/containerHeader.vue'
import { ref } from 'vue'
import { updatePasswordService } from '@/api/updatePassword';
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router' 


const router = useRouter()
const passData = ref({
  old_pwd: "",
  new_pwd: "",
  re_pwd: ""
})

// 重置密码验证规则
const validatePass = (rule, value, callback) => {
  if(value !== passData.value.new_pwd) {
    return callback(new Error("密码不一致"))
  }
  callback()
}

// 自定义密码验证规则pass
const validatenew_pwd = (rule, value, callback) => {
  const reg = /^[0-9a-zA-Z]{6,15}$/
  if(!reg.test(value)) {
    return callback(new Error("请输入6-15位格式的密码"))
  }
  callback()
}

const rules = ref({
  old_pwd: [{ required: true, message: "不能为空", trigger: "blur"}],
  new_pwd: [{ validator: validatenew_pwd, trigger: "blur"}],
  re_pwd: [{ required: true, message: "不能为空", trigger: "blur"},
    { validator: validatePass, trigger: "blur"}
  ],
})

// 提交修改密码
const updatePass = async () => {
  const { old_pwd, new_pwd, re_pwd } = passData.value
  await updatePasswordService(old_pwd, new_pwd, re_pwd)
  ElMessage({
    message: "修改密码成功, 请重新登录",
    type: "success"
  })
  router.push("/login")
}
</script>


<template>
  <div class="reset">
    <ContainerHeader title="重置密码">
      <template #default>
        <el-form label-width="100px" size="large" :model="passData" :rules="rules" label="passForm">
          <el-form-item label="原密码" required prop="old_pwd">
            <el-input v-model="passData.old_pwd" style="width: 350px;"></el-input>
          </el-form-item>
          <el-form-item label="新密码" required prop="new_pwd">
            <el-input v-model="passData.new_pwd" style="width: 350px;"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" required prop="re_pwd">
            <el-input v-model="passData.re_pwd" style="width: 350px;"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="large" @click="updatePass">修改密码</el-button>
            <el-button type="primary" size="large" plain>重置</el-button>
          </el-form-item>
        </el-form>
        
      </template>
    </ContainerHeader>
  </div>
</template>

<style>
.reset {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  border: 20px solid rgb(245, 245, 245);
}
</style>