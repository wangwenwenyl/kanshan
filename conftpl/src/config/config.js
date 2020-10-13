/** 
 * @Desc: 全局敞亮配置，发版动态配置
 */

let NODE_ENV = process.env.NODE_ENV
let baseURL = ''

// 生产环境
if (NODE_ENV === 'production') {
  baseURL = '@PROD.BASEURL@'
}

// 开发环境
if (NODE_ENV === 'development') {
  baseURL = '@DEV.BASEURL@'
}

// auth验证
const auth = {
  username: 'viewshare',
  password: 'c2086987642a76666ec166886005c4a3'
}

export {
  baseURL,
  auth
}