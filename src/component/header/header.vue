/** 
 * @Desc: 公共头部
 */
<template>
  <div 
    class="header-page fill-width"
    :style="{'height': screenChange ? '80px' : '70px', 'lineHeight': screenChange ? '80px' : '70px'}" 
    :class="{'pos-fixed': scrollFlag || !isFixed, 'header-border-bottom': !isFixed }">
    <page-box style="padding: 0;position: relative" class="clear-float">
      <!-- logo -->
      <router-link to="/home-page" class="float-left" :style="{'height': screenChange ? '80px' : '70px'}" >
        <img src="../../image/logo2.png" v-if="scrollFlag || !isFixed" class="fill-height">
        <img src="../../image/logo1.png" v-else class="fill-height">
      </router-link>

      <!-- nav -->
      <nav class="nav-box clear-float" :class="[searchFlag ? 'nav-box-hide' : '']">
        <!-- nav标题 -->
        <nav-item 
          v-for="(list, index) in navData" 
          :key="index"
          :navText="list.title" 
          :navList="list.types"
          :colorChange="scrollFlag || !isFixed">
        </nav-item>

        <!-- 头像数据 -->
        <header-avatar></header-avatar>
        <!-- 搜索按钮 -->
        <div class="btn-box float-left clickable vertical-center" @click="_serachFlagClick">
          <Icon type="search" size="25" color="#ffffff" style="margin-left: 11px" ></Icon>
        </div>
      </nav>

      <!-- 搜索框  -->
      <div  class="search-box vertical-center" :class="[searchFlag ? 'search-box-show': 'search-box-hide' , scrollFlag || !isFixed ? 'inputBorder' : '']">
        <!-- input输入框 -->
        <input 
          type="text" 
          class="search-input" 
          placeholder="输入关键字" 
          v-model="searchValue" 
          @keyup.enter="_searchButtonClick">
        <!-- 关闭按钮 -->
        <Icon 
          type="android-close" 
          size="30" 
          style="cursor: pointer;color:#a1c205" 
          @click.native="searchFlag = false">
        </Icon>
      </div>
    </page-box>
  </div>
</template>

<script type="text/ecmascript-6">
  import NavItem from 'component/nav-item'
  import HeaderAvatar from 'component/header-avatar'
  import PageBox from 'component/page-box'
  import { requestGetHeaderMenuData } from 'api/home-page'

  export default {
    name: 'VHeader',
    components: {
      NavItem,
      HeaderAvatar,
      PageBox
    },
    props: {
      isFixed: {
        type: Boolean,
        default: false
      }
    },
    data: function() {
      return {
        visible: false,
        //屏幕大小的判断
        screenWidth: document.body.clientWidth,
        screenChange: true,
        // 导航数据
        navData: [],

        // 搜索文本值
        searchValue: '',
        // 搜索区域显示控制
        searchFlag: false,

        // 滚动标识
        scrollFlag: false,
        //滚动之后的颜色标识符
        colorChange: "",
      }
    },
    mounted() {
      // 根据isFixed的属性值来进行时间绑定和样式变化
      this._propsEvent()
      // 获取目录数据
      this._getNavData()
      //绑定屏幕缩放事件
      window.addEventListener('resize', this._resizeEvent)
    },
    destoryed: function() {
      // 解除绑定事件
      window.removeEventListener('scroll', this._scrollEvent)
      window.removeEventListener('resize', this._resizeEvent)
    },
    methods: {
      /** 
       * 根据传递的属性值来进行操作
      */
      _propsEvent: function() {
        if (this.isFixed) {
          // 监听滚动事件
          window.addEventListener('scroll', this._scrollEvent)
        } 
      },

      /** 
       * 监听屏幕滚动事件 
       */
      _scrollEvent: function() {
        let scrollValue = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        let clientWidth = document.body.clientWidth
        this.scrollFlag = Number(scrollValue) >= 620 ? true : false
      },

      /** 
       * 监听屏幕缩放事件
      */
      _resizeEvent: function() {
        window.screenWidth = document.body.clientWidth
        this.screenWidth = window.screenWidth
        this.screenChange = this.screenWidth >= 1600 ? true : false
      },
      
      /** 
       * nav中的搜索图标点击，出现搜索输入框
      */
      _serachFlagClick: function() {
        this.searchFlag = true
      },

      /** 
       * 查询按钮点击
      */
      _searchButtonClick: function() {
        // 先判断是否有值
        if (this.searchValue == '') {
          this.searchFlag = false
        } else {
          // 跳转搜索页面
          this.$router.push({path: 'search-page', query: { searchValue: this.searchValue}})
          // 当当前页面就是搜索页面时候
          this.searchValue = ''
          this.searchFlag = false
        }
      },

      /** 
       * 获取头部的nav数据 
      */
      _getNavData: function() {
        requestGetHeaderMenuData().then( response => {
          // console.log('requestGetHeaderMenuData:', response)
          if (response.code === 0) {
            this.navData = response.data
          }
        })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  /* 按需引入变量和方法 */
  @import '~style/variable'

  .pos-fixed
    position fixed !important
    background #ffffff !important
  .header-border-bottom
    border-bottom 1px solid #e8e8e8  
  .header-page
    position absolute
    top 0
    left 0
    z-index 999
   
    /* 导航容器 */
    .nav-box
      position absolute
      top 0
      right 0
      height 100%
      line-height 80px
      transition all .3s ease-in-out
      .btn-box
        height 100%
        margin 20px 10px
        width 40px
        height 40px
        background #a1c205
        border-radius 50%
        text-align center
    /* 导航容器隐藏 */
    .nav-box-hide
      transform translateX(-385px)
      opacity 0
      pointer-events none
    /* 导航容器显示 */
    .nav-box-show  
      transform translateX(0)
      opacity 1
      pointer-events auto

    /* 搜索容器显示 */  
    .search-box-show
      width 400px
      opacity 1
      background-color $color-background
      margin-top:15px; 
    /* 搜索容器隐藏 */
    .search-box-hide
      width 0 
      opacity 0
    /* 搜索容器 */
    .search-box
      float right 
      position absolute
      right 0px
      height 60%
      line-height 60px
      transition all .3s ease-in-out
      overflow hidden
      border-radius 30px
      background-color rgba(255,255,255,.3)
      .search-input
        width 360px
        height 100%
        padding 0 16px      
      .search-btn
        display inline-block
        height 100%
        line-height 60px
        /*滚动之后搜索框的颜色*/   
     .inputBorder
      border 2px solid #a1c205
  // /*判断屏幕分辨率*/        
  // .xiao-ping
  //   width 1060px
  //   height 70px
  //   line-height 70px
  // .da-ping
  //   width 1540px  
  //   height 80px
</style>