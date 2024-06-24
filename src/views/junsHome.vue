<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage ,ElMessageBox } from 'element-plus'
import { useUserStore } from '@/stores/index';
import { User, Crop, EditPen, SwitchButton } from '@element-plus/icons-vue'
import zh from 'element-plus/es/locale/lang/zh-cn.mjs'


const route = useRoute()
const path = ref(`${route.path}`)
const router = useRouter()
const userStore = useUserStore()
const avatar = userStore.userInfo.user_pic
const avatarUrl = ref(avatar) || ref("https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png")

userStore.getUserInfo()


// 用户服务handleCommand
const handleCommand = (command) => {
  if(command === "logout") {
    ElMessageBox.confirm("你确定要退出登录嘛?", "登出确认", {
      confirmButtonText: "确定",
      cancelButtonText: "我再想想",
      type: "info"
    })
    .then(() => {
      ElMessage({
        type: "success",
        message: "登出成功"
      })
      userStore.removeToken()
      userStore.userInfo.value = {}
      router.push("/login")

    })
    .catch((error) => {
      console.log(error)
      ElMessage({
        type: "info",
        message: "登出失败"
      })
    })
  }
  if(command === "profile") {
    router.push("/home/userinfo")
  }
  if(command === "avatar") {
    router.push("/home/userAvatar")
  }
  if(command === "password") {
    router.push("/home/updatePassword")
  }
}

</script>


<template>
  <el-container>
    <el-aside>
      <div class="logo"></div>
      <el-menu background-color="rgb(35, 35, 35)"
        text-color="rgb(255, 255, 255)"
        class="menu"
        :default-active="path"
        active-text-color="#ffd04b"
        :router="true" >
        <el-menu-item index="/home/category" @click="navToCategory">
          <el-icon><Management /></el-icon>
          <span>文章分类</span>
        </el-menu-item>
        <el-menu-item index="/home/management" @click="navToManage">
          <el-icon><Promotion /></el-icon>
          <span>文章管理</span>
        </el-menu-item>
        <el-sub-menu>
          <template #title>
            <el-icon><UserFilled /></el-icon>
            <span>个人中心</span>
          </template>
          <el-menu-item index="/home/userinfo">
            <el-icon><User /></el-icon>
            <span>基本资料</span>
          </el-menu-item>
          <el-menu-item index="/home/userAvatar">
            <el-icon><Crop /></el-icon>
            <span>更换头像</span>
          </el-menu-item>
          <el-menu-item index="/home/updatePassword">
            <el-icon><EditPen /></el-icon>
            <span>重置密码</span>
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-aside>
    <el-container class="homeBody">
      <el-header class="header">
        <span class="author">后台管理员:&nbsp;<strong>{{ userStore.userInfo.username }}</strong></span>
        <el-dropdown class="personalInfo" @command="handleCommand"> 
          <span>
            <el-avatar :size="50" shape="circle" :src="avatarUrl"></el-avatar>
            <el-icon><CaretBottom /></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item :icon="User" command="profile">基本资料</el-dropdown-item>
              <el-dropdown-item :icon="Crop" command="avatar">更换头像</el-dropdown-item>
              <el-dropdown-item :icon="EditPen" command="password">重置密码</el-dropdown-item>
              <el-dropdown-item :icon="SwitchButton" command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-header>
      <div class="contain">
        <el-config-provider :locale="zh">
          <router-view></router-view>
        </el-config-provider>
      </div>
      <!-- <router-view></router-view> -->
      <el-footer>
        <p>本项目用于后台管理系统的展示</p>
        <p>作者: 吴帆</p>
      </el-footer>
    </el-container>
  </el-container>
</template>

<style lang="less" scoped>
.el-aside {
  height: 100vh;
  background-color: rgb(35, 35, 35);
  .logo {
    margin-left: 40px;
    margin-bottom: 30px;
    width: 200px;
    height: 200px;
    background-image: url("../assets/logo.png");
    background-size: 200px 200px;
}
  .menu {
    border-right: 0;
    // >.el-menu-item:first-child, .el-menu-item:nth-child(2) {
    //   margin-left: 20px;
    // }
  }
}

.header {
  display: flex;
  justify-content: space-between;
  .author {
    display: flex;
    align-items: center;
    font-size: 17px;
  }
  .personalInfo {
    display: flex;
    align-items: center;
    >span {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}

// .contain {
//   padding: 17px;
//   background-color: rgb(245, 245, 245);
// }

.homeBody {
  display: flex;
  flex-direction: column;
  .contain {
    flex: 1;
  }
}

.el-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  background-color: rgb(245, 245, 245);
  p:first-child {
    text-align: center;
    width: 100%;
  }
}
</style>