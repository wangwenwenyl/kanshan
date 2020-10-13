/** 
 * @description 首页相关api
*/
import requester from 'config/requester'

/** 
 * 获取公共头部中的资源种类数据
*/
export function requestGetHeaderMenuData() {
  const url = 'type/tree'
  return requester.request({ url })
    .then( response => {
      return Promise.resolve(response.data)
    })
    .catch( error => {
      return Promise.reject(error)
    })
}


/** 
 * 获取账号的个人信息
*/
export function requestGetUserInfo() {
  const url ='user'
  return requester.request({ url })
    .then( response => {
      return Promise.resolve(response.data)
    })
    .catch( error => {
      return Promise.reject(error)
    })
}

/** 
 * 修改个人信息
 * @param {object} param: 参数对象
*/
export function requestPatchUserInfo(param) {
  const url = 'user'
  const method = 'patch'
  const params = {
    nickname: param.nickname,
    gender: param.gender
  }
  return requester.request({ url, method, params })
    .then( response => {
      return Promise.resolve(response.data)
    })
    .catch( error => {
      return Promise.reject(error)
    })
}


/** 
 * 修改密码
 * @param {object} param: 参数对象
*/
export function requestPatchPassword(param) {
  const url = 'user'
  const method = 'patch'
  const params = {
    oldPassword: param.oldPassword,
    newPassword: param.newPassword
  }
  return requester.request({ url, method, params })
    .then( response => {
      return Promise.resolve(response.data)
    })
    .catch( error => {
      return Promise.reject(error)
    })
}


/**
 * 获取轮播视频资源
*/
export function requestSliderDate(){
  const url='slider/1'
  return requester.request({url})
    .then( response => {
      return Promise.resolve(response.data)
    })
    .catch( error => {
      return Promise.reject(error)
    })

}
/**
 * 获取推荐视频列表资源
*/
export function requestRecommendData(){
   const url='resource/recommendation'
   return requester.request({url})
    .then( response => {
      return Promise.resolve(response.data)
    })
    .catch( error => {
      return Promise.reject(error)
    })
}