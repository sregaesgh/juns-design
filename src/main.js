import '@/assets/common.less'

import { createApp } from 'vue'
import pinia from '@/stores/index.js'

import App from './App.vue'
import router from './router'

// 完整导入elementplus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 全局注册图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// 创建根组件
const app = createApp(App)
// 图标全局挂载
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// 挂载elementPlus
app.use(ElementPlus)

app.use(pinia)
app.use(router)

app.mount('#app')
