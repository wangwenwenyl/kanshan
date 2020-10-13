/** 
 * @description 观看记录相关api
*/
import requester from 'config/requester'

/** 
 * 获取观看记录数据
 * @param {Object} param: 请求的参数
*/
export function requestGetWatchRecordData(param) {
  const url = 'play/log'
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