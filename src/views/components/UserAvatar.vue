<script setup>
import ContainerHeader from '@/components/containerHeader.vue'
import { useUserStore } from '@/stores/index';
import { updataAvatarService } from '@/api/updateAvatar';
import { ref } from 'vue'
import { ElLoading } from 'element-plus'


const isLoading = ref(true)
const imageUrl = ref("")
const uploadRef = ref()
const userStore = useUserStore()
// 用户头像选择 + 预览
const avatarSelect = (uploadFile) => {
  isLoading.value = false
  const reader = new FileReader()
  reader.readAsDataURL(uploadFile.raw)
  reader.onload = () => {
    imageUrl.value = reader.result
  }
}

// 用户头像上传
const avatarUpload = async () => {
  // console.log(userStore.userInfo);
  const loadingInstance = ElLoading.service({fullscreen: true})
  await updataAvatarService(imageUrl.value)
  await userStore.getUserInfo()
  location.reload()
  loadingInstance.close()
}
</script>

<template>
  <div class="avatar">
    <ContainerHeader title="更换头像">
      <template #default>
        <el-upload
          class="avatar-uploader"
          :auto-upload="false"
          :show-file-list="false"
          :on-change="avatarSelect"
          ref="uploadRef"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <span v-else class="avatar-uploader-icon">请选择头像</span>
        </el-upload>
        <div class="avatarBtns">
          <el-button type="primary" size="large" @click="uploadRef.$el.querySelector('input').click()">
            <el-icon><plus></plus></el-icon>
            &nbsp;
            选择图片
          </el-button>
          <el-button type="success" size="large" :disabled="isLoading" @click="avatarUpload">
            <el-icon><Upload /></el-icon>
            &nbsp;
            上传头像
          </el-button>
        </div>
        
      </template>
    </ContainerHeader>
  </div>

</template>


<style scoped>
.avatar-uploader .avatar {
  width: 278px;
  height: 278px;
  display: block;
}
</style>

<style>
.avatar {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  border: 20px solid rgb(245, 245, 245);
}

.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 278px;
  height: 278px;
  text-align: center;
  line-height: 278px;
  background-color: rgb(239, 239, 239);
}

.avatarBtns {
  margin-top: 20px;
}
</style>