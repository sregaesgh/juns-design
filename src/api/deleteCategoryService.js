import request from '@/utils/request.js'


export const deleteCategoryService = (id) => {
  return request.delete("/my/cate/del", {
    params: {
      id
    }
  })
}