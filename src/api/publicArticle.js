import request from '@/utils/request.js'

export const publicArticleService = (data) => {
  return request.post("/my/article/add", data,
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  )
} 