import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout/index.vue'
import storage from '../utils/storage'
Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'layout',
    component: Layout,
    redirect: '/home',
    children: [{
      path: '/home',
      name: 'home',
      component: () => import('@/views/home/index.vue'),
      meta: {
        title: '首页'
      }
    }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login.vue')
  }
]
const router = new Router({ routes: routes })
// 设置路由守卫
router.beforeEach((to, from, next) => {
  const token = storage.get('token')
  if (!token && to.path !== '/login') {
    next('/login')
  } else {
    next()
  }
})
export default router
