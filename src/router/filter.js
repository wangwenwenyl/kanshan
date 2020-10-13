/** 
 * 路由校验
*/
import router from 'router'
import cookie from 'js-cookie'

// router.beforeEach((to, from, next) => {
//   // 页面title
//   document.title = to.meta.title

//   // 登出
//   if (to.path === '/login') {
//     // 清空cookie存储的token数据
//     cookie.get('vltoken') && cookie.remove('vltoken') 
//     next()
//   }

//   // 框架权限校验
//   if (to.meta && to.meta.requireAuth) {
//     if (cookie.get('vltoken')) {
//       next()
//     } else {
//       confirm('登录过期，为您跳转到登陆页面？') ? next('/login') : next()
//     }
//   }

//   next()
// })