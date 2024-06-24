import requset from '@/utils/request'

export const getUserInfoService = () => {
  return requset.get("/my/userinfo")
}