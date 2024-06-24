import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/indexLogin.vue'
import Home from '@/views/junsHome.vue'
import containerCard from '@/views/components/containerCard.vue'
import Management from '@/views/components/ArticleManagement.vue'
import UserInfo from '@/views/components/userInfo.vue'
import UserAvatar from '@/views/components/UserAvatar.vue'
import UpdatePassword from '@/views/components/UpdatePassword.vue'
import { useUserStore } from '@/stores/index'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '', component: Login, redirect: '/login' },
    { name: 'login', path: '/login', component: Login },
    {
      path: '/home', component: Home, children: [
        {
          path: "category", component: containerCard
        },
        { path: 'management', component: Management },
        { path: 'userinfo', component: UserInfo },
        { path: 'userAvatar', component: UserAvatar },
        { path: 'updatePassword', component: UpdatePassword }
      ]
    }

  ]
})

// 配置全局导航守卫, 阻止用户在未登录的状态下访问组件
router.beforeEach(to => {
  const userStore = useUserStore()
  if (!userStore.token && to.name !== "login") {
    return router.replace("/login")
  }
})

export default router
