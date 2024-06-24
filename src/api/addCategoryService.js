import request from '@/utils/request.js'

export const addCategoryService = (cate_name, cate_alias) => {
  return request.post("/my/cate/add", {
    cate_name,
    cate_alias
  })
}