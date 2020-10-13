/**
 * 网络请求相关配置
 */

let NODE_ENV = process.env.NODE_ENV
let baseURL = ''  //教师端

// 生产环境
if (NODE_ENV === 'production') {
  baseURL = 'http://192.168.0.158:18080'
}

// 开发环境
if (NODE_ENV === 'development') {
  baseURL = 'http://192.168.0.158:18080'
}

const auth = {
  username: 'viewshare',
  password: 'c2086987642a76666ec166886005c4a3'
}

export {
  baseURL,
  auth
}