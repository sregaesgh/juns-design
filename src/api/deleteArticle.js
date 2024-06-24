import request from '@/utils/request.js'

export const deleteArticleService = (id) => {
  return request.delete("/my/article/info", {
    params: {
      id
    }
  })
}