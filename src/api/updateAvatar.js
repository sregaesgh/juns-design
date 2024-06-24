import request from '@/utils/request.js'

export const updataAvatarService = (avatar) => {
  return request.patch("/my/update/avatar", { avatar })
}