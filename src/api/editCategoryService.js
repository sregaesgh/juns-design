import request from '@/utils/request.js'

export const editCategoryService = (id, cate_name, cate_alias) => {
  return request.put("/my/cate/info", { id, cate_name, cate_alias })
}