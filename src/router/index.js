/** 
 * @description 路由定义，懒加载
*/
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 登录
const Login = r => require.ensure([], () => r(require('page/login')), 'Login')

// 首页
const HomePage = r => require.ensure([], () => r(require('page/home-page')), 'HomePage')

// 主题页面
const TopicPage = r => require.ensure([], () => r(require('page/topic-page')), 'TopicPage')

// 视频详情页面
const VideoDetail = r => require.ensure([], () => r(require('page/video-detail')), 'VideoDetail')

// 我的收藏
const MyCollection = r => require.ensure([], () => r(require('page/my-collection')), 'MyCollection')

// 观看记录
const WatchRecord = r => require.ensure([], () => r(require('page/watch-record')), 'WatchRecord')

// 搜索
const SearchPage = r => require.ensure([], () => r(require('page/search-page')), 'SearchPage')

// 路由
const routers = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      title: '登录'
    }
  },
  {
    path: '/home-page',
    name: 'home-page',
    component: HomePage,
    children:[{
      path:'aaa',
      component: MyCollection,
      alias: 'nested-alias',
    }],
    meta: {
      title: '首页',
      requireAuth: true
    }
  },
  {
    path: '/topic-page',
    name: 'topic-page',
    component: TopicPage,
    meta: {
      title: '主题',
      requireAuth: true
    }
  },  
  {
    path: '/video-detail',
    name: 'video-detail',
    component: VideoDetail,
    meta: {
      title: '视频详情',
      requireAuth: true
    }
  },
  {
    path: '/my-collection',
    name: 'my-collection',
    component: MyCollection,
    meta: {
      title: '我的收藏',
      requireAuth: true
    }
  },
  {
    path: '/watch-record',
    name: 'watch-record',
    component: WatchRecord,
    meta: {
      title: '观看记录',
      requireAuth: true
    }
  },
  {
    path: '/search-page',
    name: 'search-page',
    component: SearchPage,
    meta: {
      title: '搜索',
      requireAuth: true
    }
  },
  {
    path: '*',
    redirect: '/login'
  }
]

const router = new Router({
  linkActiveClass: 'router-active',
  routes: routers,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 500 }
    }
  }
})
export default router
