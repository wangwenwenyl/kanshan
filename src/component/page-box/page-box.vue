/** 
 * @Desc: 页面内容容器
 */
<template>
  <div class="page-box-page grid">
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'page-box',
    methods:{
       shout:function(e){
         console.log(e)
       }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .page-box-page
    margin 0 auto
    padding 20px 0 0 0
</style>
