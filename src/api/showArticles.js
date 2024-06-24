import request from '@/utils/request.js'

export const showArticlesService = (params) => {
  return request.get("/my/article/list", { params })
}