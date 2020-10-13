/** 
 * @Desc: 搜索页面
 */
<template>
  <div class="search-page fill">
    <!-- 公共头部 -->
    <v-header></v-header>

    <!-- 居中内容容器 -->
    <page-box style="margin-top: 60px">
      <!-- 搜索框 -->
      <div class="title-box">
        <input type="text" class="title-input fill" v-model.trim="queryParam.ball" placeholder="请输入关键字">
        <span class="title-btn clickable" @click="_requestGetSearchResult">搜索</span>
      </div>

      <!-- 数据列表 -->
      <div class="search-data-box fill-width" v-if="dataVisible">
        <li class="data-list" v-for="(videoItem, index) in searchData.datas" :key="index">
          <video-item :videoItem="videoItem" @click.native="_videoItemClick(videoItem)"></video-item>
        </li>
      </div>
      <div v-else class="search-nodata">
        <img src="../../image/nodata.png" style="margin-top: 50px">
      </div>

      <!-- 分页数据 -->
      <Page 
        v-show="pageVisible"
        :total="pageTotal" 
        :current="queryParam.pageNum" 
        :page-size="queryParam.pageSize"
        @on-change="_pageNumChange" 
        style="text-align: center">
      </Page>
    </page-box>

    <!-- 公共底部 -->
    <v-footer></v-footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import PageBox from 'component/page-box'
  import VideoItem from 'component/video-item'
  import { requestGetSearchData } from 'api/search-page'

  export default {
    name: 'search-page',
    components: {
      PageBox,
      VideoItem
    },
    data: function() {
      return {
        // 主题数据
        searchData: {},

        // 请求参数对象（包括分页）
        queryParam: {
          pageNum: 1,
          pageSize: 30,
          ball: ''
        },

        // 分页
        pageTotal: 0,
        pageVisible: false,

        // 是否有数据
        dataVisible: true
      }
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route': '_getQueryValue',
      // 监听请求参数，调用后台请求
      queryParam: {
        deep: true,
        handler(newValue) {
          this.$router.push({path: 'search-page', query: { searchValue: newValue.ball}})
        }
      }
    },
    mounted: function() {
      // 确保回到顶部
      document.documentElement.scrollTop = document.body.scrollTop = 0
      this._getQueryValue()
    },
    methods: {
      /** 
       * 获取当前页面的路由数据
      */
      _getQueryValue: function() {
        let query = this.$route.query
        this.queryParam.ball = query.searchValue ? query.searchValue : ''
        this._requestGetSearchResult()
      },

      /** 
       * 页码改变
      */
      _pageNumChange: function(val) {
        this.queryParam.pageNum = val
        this._requestGetSearchResult()
      },

      /** 
       * 视频item点击
       * @param {Object} item: 点击的视频对象数据信息
      */
      _videoItemClick: function(item) {
        if (item.resourceId) {
          let resourceId = item.resourceId
          window.open(window.location.origin + `/#/video-detail?resourceId=${resourceId}`)
        }
      },

      /** 
       * 请求参数改变调用api方法事件
      */
      _requestGetSearchResult: function() {
        let param = {
          pageNum: this.queryParam.pageNum,
          pageSize: this.queryParam.pageSize,
          ball: this.queryParam.ball
        }
        requestGetSearchData(param).then( response => {
          if (response.code === 0) {
            // console.log('requestGetSearchData:', response)
            if ( response.data) {
              // 设置有无数据的图片显示
              this.dataVisible = response.data.datas.length ? true : false
              this.searchData = response.data 
              this.pageTotal = response.totalCount
              // 根据总数进行分页显示的判断
              this.pageVisible = response.totalCount > response.pageSize ? true : false
            } 
            // 没有搜索值的时候 
            else {
              this.dataVisible = false
              this.searchData = {}
              this.pageTotal = 0
              this.pageVisible = false
            }
          }
        })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  /* 按需引入变量和方法 */
  @import '~style/variable'
  
  .search-page
    position relative
    overflow-y auto
    
    /* 标题容器 */
    .title-box
      position relative
      width 500px
      height 50px
      line-height 50px
      margin 45px auto 
      text-align center
      .title-input
        display inline-block
        padding-left 25px
        border 1px solid $color-border
        border-radius 25px
        font-size 18px
        &::-webkit-input-placeholder
          color #d9d8d8
        &::-moz-placeholder
          color #d9d8d8
        &::-ms-input-placeholder
          color #d9d8d8
       
      .title-btn
        position absolute
        top 0
        right 0px
        width 90px
        height 50px
        line-height 50px
        text-align center
        letter-spacing 5px
        font-size 18px
        color $color-text-w
        background-color $color-border
        border-radius 0 25px 25px 0   

    /* 数据容器 */  
    .search-data-box
      display flex
      flex-flow row wrap
      padding-bottom 12px
      min-height 600px
    @media screen and (max-width 1600px)
      .search-data-box
        min-height 440px

    .search-nodata
      min-height 600px
      text-align center
    @media screen and (max-width 1600px)
      .search-nodata
        min-height 440px  

    .search-data-box  
      .data-list
        flex-grow 0
        flex-shrink 0
        width 240px
        height 200px
        margin-bottom 20px
        margin-right 16px
        box-shadow 0px 0px 3px rgba(0, 0, 0, .3)
      @media screen and (max-width 1600px) 
        .data-list
          width 160px
          height 136px 
</style>
