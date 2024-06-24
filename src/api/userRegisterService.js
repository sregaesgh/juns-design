import request from '@/utils/request.js'


export const userRegisterService = (username, password, repassword) => {
  return request.post("/api/reg", { username, password, repassword })
} 