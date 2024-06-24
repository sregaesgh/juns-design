import request from '@/utils/request.js'

export const updateUserInfoService = (newUserInfo) => {
  return request.put("/my/userinfo", { ...newUserInfo })
}