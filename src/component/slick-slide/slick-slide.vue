/** 
 * @Desc: 滚动浏览组件
 */
<template>
  <div class="slick-slide-page">
    <!-- 头部标题 -->
    <div class="slide-title" >
      <img src="../../image/list-bg.png" alt="">
      <div class="slide-titleText" v-text="slickObj.parentTitle ? slickObj.parentTitle : '标题名称'"></div>
    </div>
   
    <!-- 显示容器 -->
    <div class="slide-box">
      <div class="slide-list-box" ref="slideListBox">
        <li class="slide-item-box" v-for="(videoItem, index) in slickObj.resources" :key="index">
          <video-item :videoItem="videoItem" @click.native="_videoItemClick(videoItem)"></video-item>
        </li>
      </div>
    </div>

    <!-- 左侧控制按钮 -->
    <div class="slide-control-left vertical-center" v-if="leftButtonFlag">
      <Icon 
        type="chevron-left" 
        size="25" 
        class="center clickable icon-transition slide-left-btn" 
        @click.native="_slideLeftButtonClick">
      </Icon>
    </div>

    <!-- 右侧控制按钮 -->
    <div class="slide-control-right vertical-center" v-if="rightButtonFlag">
      <Icon 
        type="chevron-right" 
        size="25" 
        class="center clickable icon-transition slide-right-btn" 
        @click.native="_slideRightButtonClick">
      </Icon>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import VideoItem from 'component/video-item'
  export default {
    name: 'slick-slide',
    components: {
      VideoItem
    },
    props: {
      slickObj: {
        type: Object,
        default: {},
        required: true
      }
    },
    data: function() {
      return {
        // 右侧按钮显示标识
        rightButtonFlag: false,
        // 左侧按钮显示标识
        leftButtonFlag: false
      }
    },
    computed: {
      boxWidth: function() {
        return this.$parent.$el.clientWidth
      },
      contentWidth: function() {
        return Number(this.$refs.slideListBox.getElementsByClassName('slide-item-box')[0].clientWidth) * Number(this.$refs.slideListBox.getElementsByClassName('slide-item-box').length)
      }
    },
    watch: {
     
    },
    created: function() {

    },
    mounted: function() {
      this._buttonVisibleFlag()
    },
    methods: {
      /** 
       * 根据prop传递的数据来设置左右按钮的显示与否
      */
      _buttonVisibleFlag: function() {
        this.rightButtonFlag = this.slickObj.resources.length > 6 ? true : false
      },

      /** 
       * 左侧控制按钮点击
      */
      _slideLeftButtonClick: function() {
         // 移动的基础距离（盒子容器的宽度）
        let distance = this.boxWidth
        // 内容容器的总长度
        let contentWidth = this.contentWidth
        // 获取元素已经偏移的距离
        let translateValue = this._getCurrentDistance()
         // 设置点击的偏移距离
        distance += translateValue
        this.$refs.slideListBox.style.transform = `translate3d(${distance}px, 0px, 0px)`
        // 根据偏移距离来设置按钮显示标识
        this.leftButtonFlag = distance === 0 ? false : true
        this.rightButtonFlag = true
      },

      /** 
       * 右侧控制按钮点击
      */
      _slideRightButtonClick: function() {
        // 移动的基础距离（盒子容器的宽度）
        let distance = this.boxWidth
        // 内容容器的总长度
        let contentWidth = this.contentWidth
        // 获取元素已经偏移的距离
        let translateValue = this._getCurrentDistance()
        // 设置点击的偏移距离
        distance = distance + (-translateValue)
        this.$refs.slideListBox.style.transform = `translate3d(${-distance}px, 0px, 0px)`
        // 根据总体的偏移距离来控制按钮的显示
        this.rightButtonFlag = ( Math.abs(2*distance) > contentWidth ) ? false : true
        this.leftButtonFlag = true
      },

      /** 
       * 获取当前的偏移距离
      */
      _getCurrentDistance: function() {
        // 获取当前的偏移距离
        let currentDistance
        // 根据获取到的属性值来获取偏移距离
        if(this.$refs.slideListBox.style.transform != '') {
          let startIndex = this.$refs.slideListBox.style.transform.indexOf('(') + 1
          let endIndex = this.$refs.slideListBox.style.transform.indexOf('px')
          currentDistance = Number( this.$refs.slideListBox.style.transform.substring(startIndex, endIndex))
        } else {
          currentDistance = 0
        }
        return currentDistance
      },

      /** 
       * 视频Item点击,进行传参的页面跳转
       * @param {object} item: 当前点击的视频对象
      */
      _videoItemClick: function(item) {
        if (item.resourceId) {
          let resourceId = item.resourceId
          window.open(window.location.origin + `/#/video-detail?resourceId=${resourceId}`)
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  /* 按需引入变量和方法 */
  @import '~style/variable'

  .slick-slide-page
    position relative
    width 100%
    margin 40px 0

    /* 标题 */
    .slide-title
      position absolute
      left -12px
      top -12px
      z-index 99
      display inline-block
      // padding 0 20px
      font-size 16px
      color $color-text-w
    /*标题内容*/
    .slide-titleText
      position absolute
      left 22px
      top 6px
      text-shadow 1px 1px 3px rgba(0, 0, 0, .5)
    /* 左侧控制按钮 */
    .slide-control-left
      position absolute
      left -30px
      top 0
      bottom 0
      width 25px
      &:hover
        background #e3edb4
      .slide-left-btn
        &:hover
          font-size 30px !important
      .icon-transition
        transition all .2s ease-in-out    

    /* 右侧控制按钮 */
    .slide-control-right
      position absolute
      right -30px
      top 0
      bottom 0 
      width 25px
      &:hover
        background #e3edb4
      .slide-right-btn
        &:hover
          font-size 30px !important
      .icon-transition
        transition all .2s ease-in-out

    /* 内容容器 */
    .slide-box
      position relative
      display block
      overflow hidden
      .slide-list-box
        position relative
        left 0
        top 0
        display flex
        flex-flow row no-wrap
        transform translate3d(0px, 0px, 0px)
        transition all .3s ease-in-out
        .slide-item-box
          flex-grow 0
          flex-shrink 0
          width 240px
          height 200px
          // padding 0 5px
          margin-right 20px
          &:nth-child(6)
            margin-right 0px
        @media screen and (max-width 1600px) 
          .slide-item-box
            width 160px
            height 136px 
</style>
