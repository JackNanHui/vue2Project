import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


import Layout from '@/layout'


export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: '首页',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: '视频工坊',
    meta: { title: '视频工坊', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'templateManage',
        name: '模板管理',
        component: () => import('@/views/templateManage/index'),
        meta: { title: '模板管理', icon: 'table' }
      },
      {
        path: 'clipVideo',
        name: '视频剪辑',
        component: () => import('@/views/clipVideo/index'),
        meta: { title: '视频剪辑', icon: 'tree' }
      }
    ]
  },
  {
    path: '/openAI',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'openAI',
        component: () => import('@/views/form/index'),
        meta: { title: 'openAI', icon: 'form' }
      }
    ]
  },
  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: '文字转图片',
        component: () => import('@/views/form/index'),
        meta: { title: '文字转图片', icon: 'form' }
      }
    ]
  },
 
  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: '文字转语音',
        component: () => import('@/views/form/index'),
        meta: { title: '文字转语音', icon: 'form' }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: '文字转视频',
        component: () => import('@/views/form/index'),
        meta: { title: '文字转视频', icon: 'form' }
      }
    ]
  },
  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: '文字转语音',
        component: () => import('@/views/form/index'),
        meta: { title: '文字转语音', icon: 'form' }
      }
    ]
  },
  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: '项目商城',
        component: () => import('@/views/form/index'),
        meta: { title: '项目商城', icon: 'form' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
