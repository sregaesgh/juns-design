import axios from 'axios'
import { useUserStore } from '@/stores/index'

const baseURL = "http://big-event-vue-api-t.itheima.net"

const request = axios.create({
  baseURL,
  timeout: 10000,

})

// 添加请求拦截器interceptor
request.interceptors.request.use((config) => {
  const userStore = useUserStore()
  if (userStore.token) {
    config.headers.Authorization = userStore.token
  }
  return config
}, (err) => Promise.reject(err))

export default request