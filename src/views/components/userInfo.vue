<script setup>
import ContainerHeader from '@/components/containerHeader.vue'
import { useUserStore } from '@/stores/index';
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const userStore = useUserStore()
userStore.getUserInfo()
const router = useRouter()
const userInfo = userStore.userInfo
const username = ref(userInfo.username)
const userInfoModel = ref({
  nickname: "",
  email: ""
})

const rules = ref({
  nickname: [{ required: true, message: "不能为空", trigger: "blur"}],
  email: [{ required: true, message: "不能为空", trigger: "blur"}],
})

// 修改用户信息
const updateUserInfo = async () => {
  const { id, username, user_pic } = userInfo
  const { nickname, email } = userInfoModel.value
  const newUserInfo = { id, username, nickname, email, user_pic}
  await userStore.setUserInfo(newUserInfo)
  ElMessage({
    message: "修改信息成功",
    type: "success"
  })
  router.push("/login")
}
</script>

<template>
  <div class="userInfo">
    <ContainerHeader title="基本资料">
      <template #default>
        <el-form :model="userInfoModel" :rules="rules" min-height="100%" size="large">
          <el-form-item label="用户账号" style="margin-left: 10px;">
            <el-input style="width: 400px;" disabled :value="username"></el-input>
          </el-form-item>
          <el-form-item label="用户昵称" prop="nickname">
            <el-input style="width: 400px;" v-model="userInfoModel.nickname"></el-input>
          </el-form-item>
          <el-form-item label="邮箱地址" prop="email">
            <el-input style="width: 400px;" v-model="userInfoModel.email"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" style="margin-left: 77px;" size="large" @click="updateUserInfo">提交修改</el-button>
      </template>
    </ContainerHeader>

  </div>
</template>


<style lang="less" scoped>

.userInfo {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  border: 20px solid rgb(245, 245, 245);
}
</style>