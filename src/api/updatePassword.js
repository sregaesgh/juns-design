import request from '@/utils/request.js'


export const updatePasswordService = (old_pwd, new_pwd, re_pwd) => {
  return request.patch("/my/updatepwd", {
    old_pwd,
    new_pwd,
    re_pwd
  })
}