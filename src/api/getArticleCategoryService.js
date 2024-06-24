import request from '@/utils/request.js'

export const getArticleCategoryService = () => {
  return request.get("/my/cate/list")
}