import { defineStore } from 'pinia'
import { ref } from 'vue'
import { publicArticleService } from '@/api/publicArticle.js'
import { showArticlesService } from '@/api/showArticles'
import { formatTime } from '@/api/formatTime'


export const useArticleStore = defineStore("article", () => {
  const articleList = ref([])
  const total = ref(0)
  // 获取文章列表
  const getArticleList = async (params) => {
    const res = await showArticlesService(params)
    articleList.value = res.data.data
    total.value = res.data.total
    articleList.value.forEach((item) => {
      item["pub_date"] = formatTime(item["pub_date"])
    })
  }
  const addArticle = (data) => {
    return publicArticleService(data)
  }

  return {
    total,
    articleList,
    addArticle,
    getArticleList
  }
})