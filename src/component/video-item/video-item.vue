/** 
 * @Desc: 视频item组件
 */
<template>
  <div class="video-item-page fill clickable">
    <!-- 照片容器 -->
    <div class="img-box fill-width">
      <span class="video-time">{{videoItem.duration | tranformTime }}</span>
      <img class="fill" src="../../image/demo.jpg" alt="">
      <div class="video-gradient"></div>
    </div>
    <!-- <div> {{tranformTime(9000)}}</div> -->
    <!-- 文字容器 -->
    <div class="text-box" :title="videoItem.title" v-if="videoItem.title">{{ videoItem.title | textLength }}</div>
    <div class="text-box" :title="videoItem.title" v-else>资源名称</div> 
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    name: 'video-item',
    props: {
      videoItem: {
        type: Object,
        default: {}
      }
    },
    data: function() {
      return {

      }
    },
    computed: {

    },
    watch: {

    },
    created: function() {

    },
    mounted: function() {

    },
    methods: {
    
    },
   
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  /* 按需引入变量和方法 */
  @import '~style/variable'

  .video-item-page
    position relative
    height 100%
    border 1px solid #ddd
    .img-box
      position relative
      height 69%
      .video-time
        position absolute
        display inline-block
        padding 5px 10px
        right 0
        bottom 0
        color #fff

      /*video中背景渐变*/    
      .video-gradient
        position absolute
        bottom 0
        width 100%
        height 35%
        background linear-gradient(bottom, rgba(0, 0, 0, .4), rgba(0, 0, 0, .1))
    .text-box
      display -webkit-box
      height 31%
      padding 10px 15px
      font-size 16px
      overflow hidden
      &:hover
        color #cb8919
    @media screen and (max-width 1600px) 
      .text-box
        font-size 12px
        padding 4px 10px   
    
</style>
