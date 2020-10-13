/** 
 * @Desc: 主题目录组件
 */
<template>
  <div class="topic-title-page fill-width vertical-center">
    {{parentKind}} <Icon type="chevron-right" size="20" style="margin: 0 10px"></Icon> {{childKind}} <span class="topic-total">（{{totalCount}}）</span>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'topic-title',
    props: {
      parentKind: {
        type: String,
        default: '',
        required: true
      },
      childKind: {
        type: String,
        default: '',
        required: true
      },
      totalCount: {
        type: [String, Number],
        required: true,
        default: 0
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  /* 按需引入变量和方法 */
  @import '~style/variable'

  .topic-title-page
    margin 45px 0
    height 40px
    line-height 40px
    font-size 40px
    vertical-align middle
    .topic-total
      font-size 24px
  @media screen and (max-width 1600px) 
    .topic-title-page
      font-size 36px
      margin 40px 0
      .topic-total
        font-size 18px 
</style>
