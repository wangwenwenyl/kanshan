/** 
 * @Desc: 视频详情页面
 */
<template>
  <div class="video-detail-page fill-width">
    <!-- 公共头部 -->
    <v-header></v-header>
    <!-- 居中内容容器 -->
    <page-box>
      <!-- 视频展示 -->
      <div class="video-box">
        <!-- 视频播放器 -->
        <div class="left-detail">
          <img src="../../image/demo.jpg" alt="" style="width:100%;">
        </div>

        <!-- 内容介绍 -->
        <div class="right-detail" :style ="note">
          <div class="video-title">
            南极帝企鹅
          </div>
          <div class="tag-box">
            <span class="tag-item">生命科学</span>
            <span class="tag-item">动物</span>
            <span class="tag-item">生命极限</span>
          </div>
          <div class="introduce-video">
            <span class="introduce-left">来源：</span>
            <span class="introduce-right">英国广播公司</span>
          </div>
          <div class="introduce-video">
            <span class="introduce-left">语言：</span>
            <span class="introduce-right">英语</span>
          </div>
          <div class="introduce-video">
            <span class="introduce-left">字幕：</span>
            <span class="introduce-right">无</span>
          </div>
          <div class="introduce-video">
            <span class="introduce-left">时长：</span>
            <span class="introduce-right">21`60°</span>
          </div>
          <div class="introduce-video clear-float">
            <span class="introduce-left float-left ">简介：</span>
            <span class="introduce-right introduce-content float-left">{{this.textContent | textCententLength}}</span>

          </div>
          <div class="collect-box clickable" @click="_collectHandle">
            <Icon type="heart" size="22" class="heart-icon" :class="{'already-collect':collectFlag}"></Icon>
            <span class="collect-text" :class="{'already-collect':collectFlag}">收藏</span>
          </div>
        </div>
      </div>

      <!-- 推荐的视频列表 -->
      <div class="slide-box">
        <div class="relate-video">相关视频</div>
        <div class="slide-list-box" ref="slideListBox" >
          <li class="slide-item-box" v-for="(videoItem, index) in data.resources" :key="index" >
            <div class="video-item-page" @click="_videoItemClick(videoItem)">
              <div class="img-box fill-width">
                <span class="video-time">05:30</span>
                <img class="fill" src="../../image/demo.jpg" alt="">
                <div class="video-gradient"></div>
              </div>
              <div class="text-box" :title="videoItem.title" v-if="videoItem.title">{{videoItem.title | textLength}}</div>
              <div class="text-box" :title="videoItem.title" v-else>资源名称</div>
            </div>
          </li>
        </div>
      </div>
    </page-box>
    <!-- 公共底部 -->
    <v-footer></v-footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import PageBox from 'component/page-box'

  export default {
    name: 'video-detail',
    components: {
      PageBox
    },
    data: function() {
      return {
        textContent:"每当恶劣的气候来临，它们会挤在一起防风御寒。可以潜入水底150至500米，最深的潜水记录甚至可达565米。主要以甲壳类动物为食可以潜入水底150至500米，最深的潜水记录甚至可达565米可以潜入水底150至500米，最深的潜水记录甚至可达565米可以潜入水底150至500米，最深的潜水记录甚至可达565米可以潜入水最深的潜水记录甚至可达565米可以潜入水最深的潜水记录甚至可达565米可以潜入水最深的潜水记录甚至可达565米可以潜入水最深的潜水记录甚至可达565米可以潜入水底150至500米，最深的潜水记录甚至可达565米",
        collectFlag: false,
        /*右侧背景的设置*/
        note: {
          backgroundImage: "url(" + require("../../image/video-right.png") + ")",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover"
        },
        data: 
          {
            "resources":[
              {
                "resourceId":1,
                "coverUrl":"xxx/xxx/xxx",
                "duration":500,
                "title":"蓝色星球蓝色星球蓝色星球蓝色星球蓝色星球蓝色星球蓝色星球蓝色星球"
              },
              {
                "resourceId":2,
                "coverUrl":"xxx/xxx/xxx",
                "duration":600,
                "title":"幽黯深海"
              },
               {
                "resourceId":2,
                "coverUrl":"xxx/xxx/xxx",
                "duration":600,
                "title":"幽黯深海"
              },
              
            ],
            'length': 18
          }
      }
    },
    computed: {

    },
    watch: {

    },
    mounted: function() {
      // 确保回到顶部
      document.documentElement.scrollTop = document.body.scrollTop = 0
    },
    methods: {
      /*点击收藏*/
      _collectHandle(){
        this.collectFlag = !this.collectFlag
      },

      /*点击视频区域*/  
      _videoItemClick(item){
        if (item.resourceId) {
          let resourceId = item.resourceId
          // window.open(window.location.origin + `/#/video-detail?resourceId=${resourceId}`)
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  /* 按需引入变量和方法 */
  .video-detail-page
    position relative
    overflow-y auto
  .video-box 
    height:630px
    width:100%
    margin-top:100px
  .left-detail
    width 1120px
    height 630px
    float left 
  .right-detail
    position relative
    width 400px
    height 630px
    float left    
    font-family  "微软雅黑"
    padding 40px 20px 20px 40px
    border 1px solid #f5f5f5
    box-shadow 1px 1px 2px #f5f5f5
    margin-left 20px
    .tag-box
      margin-top 20px
      .tag-item
        background #f69f17
        padding 5px 10px
        color #ffffff
        font-size 12px
        margin-right 15px
    .introduce-video  
      font-size 18px  
      margin-top 27px
      .introduce-left
        display inline-block
        width 55px
        color #a0a0a0
      .introduce-right
        color #222222
        width 280px
      .introduce-content
         height 190px
         overflow hidden 
         word-break break-all
         text-overflow ellipsis 
    .collect-box
      position absolute
      right 40px
      bottom 30px
      .collect-text 
        font-size 20px
        color #222
      .already-collect
        color red 
      .heart-icon
        vertical-align middle
      &:hover
        cursor  pointer  
  .video-title
    font-size 42px  
    color #222222 
    line-height 42px
  .relate-video
    font-size 16px
    color #222222  
    margin-top 30px
  @media screen and (max-width 1600px)
    .video-box 
      height 405px
    .left-detail
      width 720px
      height 405px
    .right-detail
      width 320px
      height 405px  
      padding 20px 10px 10px 20px
      .tag-box
        margin-top 20px
      .introduce-video
        margin-top 10px
        font-size 14px
        .introduce-left 
          width 42px
        .introduce-right
          width 237px
        .introduce-content
          height 125px  
      .collect-box
        right 20px
        bottom 20px
        .collect-text 
          font-size 16px   
    .video-title
      font-size 30px
      line-height 30px 
    .slide-list-box
      .slide-item-box
        width 160px
        height 136px
        .text-box 
          font-size 12px    
          padding 4px 10px
  /*单独的视频列表*/  
  .slide-item-box
    display inline-block
    margin-right 20px
    margin-top 20px
    width 240px
    height 200px
    &:nth-child(6n+0)
      margin-right 0px
   .video-item-page
    position relative
    height 100%
    border 1px solid #ddd
    &:hover
      cursor pointer
    .img-box
      position relative
      height 69%
      .video-time
        position absolute
        display inline-block
        padding 5px 10px
        right 0
        bottom 5px
        color #fff
      /*video中背景渐变*/    
      .video-gradient
        position absolute
        bottom 0px
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
    
</style>
