import Vue from 'vue'

/** 
 * 文字长度
*/
Vue.filter('textLength', function (value) {
  if(value.length > 22){
    return value.substring(0,22) + "..."
  }
  return value
})
/**
 * 视频详情页文本长度控制
*/
Vue.filter('textCententLength', function (value) {
  if(value.length > 105){
    return value.substring(0,105) + "..."
  }
  return value
})
/**
 * 将后台的毫秒转换为秒
*/
Vue.filter('tranformTime', function (value) {
  let hh, mm, ss
 
  //传入的时间为空或小于0
  if( value==null || value<0){
    return '00:00:00'
  }
  //得到小时
  hh = value/3600 | 0
  value = parseInt(value )- hh*3600
  if (parseInt(hh) < 10){
    hh = "0" + hh
  }
  //得到分
  mm = value/60 | 0
  //得到秒
  ss = parseInt(value) - mm*60
  if(parseInt(mm) < 10){
    mm = "0" + mm    
  }
  if(ss < 10){
    ss = "0" + ss     
  }
  return hh + ":" + mm + ":" + ss
})

Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})
Vue.component('button-counter', {
  data: function () {
    return {
      count: 0
    }
  },
  template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
})
Vue.component('blog-post', {
  render: function (createElement) {
    var header = this.$slots.header
    var body   = this.$slots.default
    var footer = this.$slots.footer
    return createElement('div', [
      createElement('header', header),
      createElement('main', body),
      createElement('footer', footer)
    ])
  }
})