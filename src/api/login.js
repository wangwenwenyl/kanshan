/** 
 * 登录页面相关api
*/
import axios from 'axios'
import { baseURL, auth } from "config/config"

/** 
 * 获取token
 * @param {Object} param: 参数对象
*/
export function requestGetToken(param) {
  const url = 'oauth/token'
  const method = 'post'
  const params = {
    username: param.username,
    password: param.password,
    grant_type: 'password'
  }
  return axios.request({ baseURL, params, method, url, auth })
    .then( response => {
      return Promise.resolve(response)
    })
    .catch( error => {
      return Promise.reject(error.response)
    })
}