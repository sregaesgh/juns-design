<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores'; 
import { ElMessage } from 'element-plus'
import { userRegisterService } from '@/api/userRegisterService';
import { userLoginService } from '@/api/userLoginService';


// 表单数据对象
const ruleForm = ref({
  username: "",
  password: "",
  repassword: ""
  
})

// 自定义密码验证规则pass
const pass = (rule, value, callback) => {
  const reg = /^[0-9a-zA-Z]{6,15}$/
  if(!reg.test(value)) {
    return callback(new Error("请输入6-15位格式的密码"))
  }
  callback()
}

// 自定义注册密码前后一致性规则
const regPassword = (rule, value, callback) => {
  if(value !== ruleForm.value.password) {
    callback(new Error("密码不一致"))
  } else {
    callback()
  }
}

// 登录验证对象
const rules = ref({
  username: [
  { required: true, message: '请输入用户名', trigger: "blur" },
  { min: 4, max: 10, message: "用户长度为4-10个字符", trigger: "blur"}
  ],
  password: [
    {validator: pass, trigger: "blur"}
  ]
})

// 注册验证对象
const regRules = ref({
  username: [{ required: true, message: "用户名不能为空", trigger: "blur"},
    {min: 4, max: 10, message: "请注册4-10位的用户名", trigger: "blur"}
  ],
  password: [{ validator: pass, trigger: "blur"}],
  repassword: [{ validator: regPassword, trigger: "blur"}]
})


const form = ref()
const register = ref()
const isLogin = ref(true)
const isRemember = ref(true)
const inputWidth = ref("width: 300px")
const router = useRouter()

// 切换登录和注册
const changeLogin = () => {
  return isLogin.value = !isLogin.value
}

// 登录按钮跳转
const goToHome = () => {
  form.value.validate(async (isValid, inValidFields) => {
    if(isValid) {
      const res = await userLoginService(ruleForm.value.username, ruleForm.value.password)
      if(res.data.code === 0) {
      const userStore = useUserStore()
      userStore.setToken(res.data.token)
      ElMessage.success("登录成功")
      router.push("/home/category")
      } else {
        ElMessage.warning("登录失败")
      }
    }
    else {
      console.log(inValidFields)
    }
  })
}

// 注册按钮跳转
const successReg = async (formEl) => {
    if(!formEl) return console.log("表单传入失败")
    await formEl.validate()
    await userRegisterService(ruleForm.value.username, ruleForm.value.password, ruleForm.value.repassword )
    ElMessage.success("注册成功")
    changeLogin() 
}

// 表单监听enter跳转
window.addEventListener("keydown", (event) => {
  if(event.key === "Enter") {
    goToHome()
  } 
})


// 监听isLogin
watch(isLogin, () => {
  ruleForm.value = {
  username: "",
  password: "",
  repassword: ""
}
})
</script>

<template>
    <el-row class="login-page">
      <el-col :span="12" class="loginBG"></el-col>
      <el-col :span="6" :offset="3" class="loginForm">
          <el-form ref="form" size="large" v-if="isLogin" :model="ruleForm" :rules="rules" status-icon>
            <el-form-item>
              <h1>登录</h1>
            </el-form-item>
            <el-form-item prop="username">
              <el-input prefix-icon="User" v-model="ruleForm.username" :style="inputWidth" placeholder="用户名" />
            </el-form-item>
            <el-form-item prop="password">
              <el-input 
              name="password"
              type="password" 
              prefix-icon="Lock" 
              v-model="ruleForm.password" 
              :style="inputWidth"
              placeholder="密码" />
            </el-form-item>
            <el-form-item>
              <div class="flex">
                <el-checkbox v-model="isRemember">记住我</el-checkbox>
                <el-link type="primary" href="#" :underline="false">忘记密码？</el-link>
              </div>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" auto-insert-space @click="goToHome">登录</el-button>
            </el-form-item>
            <el-form-item>
              <el-link type="info" :underline="false" @click="changeLogin">注册&nbsp;→</el-link>
            </el-form-item>
            <el-form-item >
              <p>juns-design组件封装项目</p>
            </el-form-item>
            <el-form-item class="author">
              <p>作者: 吴帆</p>
            </el-form-item>
          </el-form>
          <el-form ref="register" v-else size="large" :model="ruleForm" :rules="regRules" status-icon>
            <el-form-item>
              <h1>注册</h1>
            </el-form-item>
            <el-form-item prop="username">
              <el-input v-model="ruleForm.username" prefix-icon="User" :style="inputWidth" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input 
                v-model="ruleForm.password"
                type="password"
                :style="inputWidth"
                prefix-icon="Lock"
                placeholder="请输入密码"
              ></el-input>
            </el-form-item>
            <el-form-item prop="repassword">
              <el-input v-model="ruleForm.repassword" prefix-icon="View" type="password" :style="inputWidth" placeholder="请确认密码"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" auto-insert-space @click="successReg(register)">注册</el-button>
            </el-form-item>
            <el-form-item>
              <el-link type="info" @click="changeLogin">←&nbsp;返回</el-link>
            </el-form-item>
          </el-form>
      </el-col>
    </el-row>
</template>

<style lang="less" scoped>
.login-page {
  height: 100vh;
  background-color: #fff;
  
  .loginBG {
    background: url("../assets/pattern-7455773_1280.png") no-repeat ;
    background-size: cover;
    background-position: center;
    border-radius: 0 20px 20px 0;
  }
  .loginForm {
    display: flex;
    flex-direction: column;
    justify-content: center;
    .flex {
      width: 240px;
      display: flex;
      justify-content: space-between;
    }
    .el-button {
      width: 300px;
    }
  }
}

.author {
  margin-top: -30px;
}
</style>
