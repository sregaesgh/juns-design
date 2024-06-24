import request from '@/utils/request.js'

export const getArticleDetailsService = (id) => {
  return request.get("/my/article/info", {
    params: { id }
  })
}