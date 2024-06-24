import request from '@/utils/request.js'


export const userLoginService = (username, password) => {
  return request.post("/api/login", { username, password })
}