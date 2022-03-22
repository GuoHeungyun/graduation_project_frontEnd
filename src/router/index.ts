import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const login = () => import('@/views/login/index.vue');
const signIn = () => import("@/views/login/components/signIn.vue");
const signUp = () => import("@/views/login/components/signUp.vue");
const findBack = () => import("@/views/login/components/findBack.vue");
const homeFrame = () => import("@/components/frame.vue");
const home = () => import("@/views/home/index.vue")
const moment = () => import("@/views/moment/index.vue");
const discovery = () => import("@/views/discovery/index.vue");
const people = () => import("@/views/profile/people.vue");
const information = () => import("@/views/profile/information.vue");
const modify = () => import("@/views/profile/modify.vue");
const homeList = () => import("@/views/home/components/homeList.vue");
const questionRecommendation = () => import("@/views/home/components/questionRecommendation.vue")
const hotList = () => import("@/views/home/components/hotList.vue")
const questionDetail = () => import("@/views/questionDetail/index.vue")

const routes: Array<RouteRecordRaw> = [
  {
    path:'/',
    redirect:'/login/signin'
  },
  {
    path:'/login',
    name:'login',
    component: login,
    redirect: '/login/signin',
    children: [
      {
        path: 'signin',
        name: 'signin',
        component: signIn
      },
      {
        path: 'signup',
        name: 'signup',
        component: signUp
      },
      {
        path: 'findback',
        name: 'findback',
        component: findBack
      }
    ]
  },
  {
    path: '/lexiang',
    name: 'home',
    redirect: '/lexiang/home/homelist',
    component: homeFrame,
    children: [
      {
        path: 'home',
        name: 'homePage',
        component: home,
        redirect: '/lexiang/home/homelist',
        children:[
          {
            path: 'homelist',
            name: 'homeList',
            component: homeList,
          },
          {
            path: 'questionrecommendation',
            name: 'questionRecommendation',
            component: questionRecommendation,
          },
          {
            path: 'hotlist',
            name: 'hotList',
            component: hotList,
          },
        ]
      },
      {
        path: 'moment',
        name: 'moment',
        component: moment
      },
      {
        path: 'discovery',
        name: 'discovery',
        component: discovery
      },
      {
        path: 'people/',
        name: 'people',
        component: people,
        redirect: '/lexiang/people/information',
        children: [
          {
            path: 'information',
            name: 'information',
            component: information
          },
          {
            path: 'modify',
            name: 'modify',
            component: modify
          },
        ]
      }
    ]
  },
  {
    path: '/question_detail/:questionId',
    name: 'questionDetail',
    component: questionDetail
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.afterEach((to,from) => {
  //当从修改信息跳转到别的页面，刷新页面，让别的页面更新信息
  if (from.fullPath == '/lexiang/people/modify'){
    location.reload()
  }
})

//判断是否已经登录
// router.beforeEach((to, from, next) => {
//   if(sessionStorage.getItem('username')){
//     next()
//   }else{
//     next({path: '/'})
//   }
// })

export default router
