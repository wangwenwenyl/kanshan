/**
 * @description: 全局注册底部组件
 */
import VFooter from './footer'

VFooter.install = function(Vue) {
  Vue.component(VFooter.name, VFooter)
}
  
export default VFooter