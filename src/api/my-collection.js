/** 
 * @description 我的收藏相关api
*/
import requester from 'config/requester'

/** 
 * 获取收藏数据
 * @param {Object} param: 请求的参数
*/
export function requestGetCollectData(param) {
  const url = 'collect'
  const params = {
    pageNum: param.pageNum,
    pageSize: param.pageSize
  }
  return requester.request({ url, params })
    .then( response => {
      return Promise.resolve(response.data)
    })
    .catch( error => {
      return Promise.reject(error)
    })
}