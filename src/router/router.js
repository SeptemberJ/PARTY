import Vue from 'vue'
import VueRouter from 'vue-router'
import Store from '../store/store'
import App from '../app'
import Index from '../page/Index'
import MemberCenter from '../page/MemberCenter'
import Login from '../page/Login'
import Transfer from '../page/Transfer'
import Application from '../page/Application'
import Learn from '../page/Learn'
import VideoDetail from '../page/VideoDetail'
import {deviceInfo} from "../util/device"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: App,
    children: [
    {path: '/Index', name: '首页', component: Index},
    {path: '/Login', name: '登录', component: Login},
    {path: '/Transfer', name: '党组织接转', component: Transfer},
    {path: '/Application', name: '入党申请', component: Application},
    {path: '/Learn', name: '三会一课', component: Learn},
    {path: '/VideoDetail/:id', name: '详情', component: VideoDetail},
    {path: '/MemberCenter', name: '党员中心', component: MemberCenter},
      {path:'*', redirect: '/Index'}
      // {path: '/article/:id', name: 'article', component: Article},
    ]
  }
]
const router = new VueRouter({
  routes: routes, // short for routes: routes
  //linkActiveClass: 'active',  // router-link的选中状态的class，也有一个默认的值
  saveScrollPosition: true ,//记住页面的滚动位置 html5模式适用
  //mode: 'history',
  //ashbang: false,
  history: true
})
//登录控制
router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
        if (localStorage.getItem("user_token")) {  // 通过vuex state获取当前的token是否存在
            next();
        }
        else {
            next({
                path: '/Login',
            })
        }
    }
    else {
        next();
    }
})
//导航显示当前路由名称
router.afterEach((to, from, next) => {
  var ISMobile = deviceInfo()
  Store.state.activeRoute=to.name;
  Store.state.isMobile=ISMobile;
  document.title = to.name;
  Store.commit('ROUTE_CHANGE',{activeRoute: to.name})
      
})
export default router
