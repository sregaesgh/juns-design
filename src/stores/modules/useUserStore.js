import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getUserInfoService } from '@/api/getUserInfoService'
import { updateUserInfoService } from '@/api/updateUserInfo'


export const useUserStore = defineStore("userStore", () => {
  const token = ref("")
  const userInfo = ref({})
  const setToken = (newToken) => {
    token.value = newToken
  }
  const removeToken = () => {
    token.value = ""
  }
  const getUserInfo = async () => {
    const res = await getUserInfoService(token)
    userInfo.value = res.data.data
  }
  const setUserInfo = (newUserInfo) => {
    return updateUserInfoService(newUserInfo)
  }

  return {
    token,
    userInfo,
    removeToken,
    setToken,
    getUserInfo,
    setUserInfo
  }
}, {
  persist: true //持久化
})