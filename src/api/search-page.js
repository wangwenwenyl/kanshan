/** 
 * @description 搜索相关api
*/
import requester from 'config/requester'

/** 
 * 获取搜索数据
 * @param {Object} param: 请求的参数
*/
export function requestGetSearchData(param) {
  const url = 'resource/catcher'
  const params = {
    pageNum: param.pageNum,
    pageSize: param.pageSize,
    ball: param.ball
  }
  return requester.request({ url, params })
    .then( response => {
      return Promise.resolve(response.data)
    })
    .catch( error => {
      return Promise.reject(error)
    })
}