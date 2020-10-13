/** 
 * @description 主题页相关api
*/
import requester from 'config/requester'

/** 
 * 获取对应资源类型ID的所有视频数据
 * @param {Object} param: 请求的参数
*/
export function requestGetTopicData(param) {
  const url = `type/resource/${param.typeId}`
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
