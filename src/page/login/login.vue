/** 
 * @desc 教师登录
 */
<template>
  <div class="login">
    <img src="../../image/login_bg.png" class="login-bg fill">
    <div class="login-form center">
      <!-- logo区域 -->
      <img src="../../image/logo.png" class="form-logo" alt="">
      <!-- 用户名 -->
      <div class="form-item">
        <img src="../../image/user.svg" class="form-icon" alt="">
        <input 
          type="text"
          ref="UserName" 
          placeholder="请输入账号" 
          class="input-item"
          maxlength="32"
          v-model.trim="loginForm.userName"/>
      </div>
      <!-- 密码 -->
      <div class="form-item" style="margin-bottom: 10px">
        <img src="../../image/key.svg" class="form-icon" alt="">
        <input 
          type="password"
          ref="Password" 
          placeholder="请输入密码" 
          class="input-item"
          maxlength="32"
          v-model.trim="loginForm.password"/>
      </div>
      <!-- 记住密码 -->
      <div class="form-item clear-float" style="margin-bottom: 10px">
        <Checkbox v-model="rememberFlag" class="float-left check-item">记住密码</Checkbox>
        <span class="float-right" style="color:red;font-size: 12px" v-show="loginTextVisible"><Icon type="ios-information" style="margin-right: 5px"></Icon>{{loginText}}</span>
      </div>
      <!-- 登录按钮 -->
      <div class="form-item">
        <button class="clickable button-item" @click="_loginClick">登录</button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { sessionStorageUtil, localStorageUtil, validatePassword, validateAccouts } from 'lib/util'
  import { Base64 } from 'js-base64'
  import cookie from 'js-cookie'
  import { requestGetToken } from 'api/login'

  export default {
    data: function() {
      return {
        loginForm: {
          userName: '',
          password: ''
        },
        checkbox: {
          text: '记住我',
          id: 'Forget'
        },

        // 文字提示觉和显示的flag
        loginText: '',
        loginTextVisible: false,
        rememberFlag: true,
        timeOut: null
      }
    },
    // 当前路由离开的时候要清除定时器
    beforeRouteLeave: function(to, from, next) {
      clearTimeout(this.timeOut)
      next()
    },
    mounted: function() {
      this._getDataFromStorage()
    },
    methods: {
      /** 
       * 5秒后自动清除登录的提示文字  
       */
      _clearLoginText: function() {
        this.timeOut =setTimeout( ()=> {
          this.loginText = ''
          this.loginTextVisible = false
        }, 5000)
      },

      /** 
       * 从存储中获取信息 
       */
      _getDataFromStorage: function() {
        // 有存储就赋值存储
        this.loginForm.userName = localStorageUtil.get('vl-userName') ? localStorageUtil.get('vl-userName') : ''
        this.loginForm.password = localStorageUtil.get('vl-password') ? localStorageUtil.get('vl-password') : ''
      },

      /** 
       * 登录点击 
       */
      _loginClick: function() {
        // 清空定时器和文字
        clearTimeout(this.timeOut)
        this.loginText = ''
        this.loginTextVisible = false

        // 前端校验格式变量设置
        let validateUserName = validateAccouts(this.loginForm.userName)
        let validatepassword = validatePassword(this.loginForm.password)

        //用户名为空
        if(null == this.loginForm.userName || this.loginForm.userName == '') {
          this.loginTextVisible = true
          this.loginText = '请填写帐号'
          this._clearLoginText()
          this.$refs.UserName.focus()
        } // 密码为空
        else if ( null == this.loginForm.password || this.loginForm.password == '') {
          this.loginTextVisible = true
          this.loginText = '请填写密码'
          this._clearLoginText()
          this.$refs.Password.focus()
        } 
        // 两者都不为空，同时格式通过前端校验,调用后台api
        else if (validateUserName && validatepassword) {
          this.loginText = ''
          // 设置token获取的后台参数，调用获取的方法函数
          const param = {
            'username': this.loginForm.userName,
            'password': Base64.encode(this.loginForm.password)
          }
          this._getToken(param)
        } 
        // 两者都不为空，但是格式校验不通过
        else {
          this.loginTextVisible = true
          this.loginText = '账号或密码错误'
          this._clearLoginText()
          this.$refs.UserName.focus()
        }
      },


      /** 
       * 发出登入请求
       * @param {Object} data: 请求的参数
       */
      _getToken: function(data) {
        // 调用后台api
        return requestGetToken(data).then( response => {
          console.log('requestGetToken：', response)
          // 成功获取token之后在进行记住或者不记住密码的操作
          this.rememberFlag ? this._storageUserInfo() : this._clearStorageData()
          cookie.set('vltoken', response.data.access_token, { expires: response.data.expires_in - 60})
          // cookie存在跳转页面
          cookie.get('vltoken') && this.$router.push({path: 'home-page'})
        }).catch( error => {
          // console.log('requestGetToken：:', error)
          this.loginTextVisible = true
          this.loginText = '帐号或密码错误'
          this._clearLoginText()
          this.$refs.UserName.focus()
        })
      },

      /** 
       * 存储账号信息 
       */
      _storageUserInfo: function() {
        localStorageUtil.set('vl-userName', this.loginForm.userName)
        localStorageUtil.set('vl-password', this.loginForm.password)
      },

      /** 
       * 清除账号信息 
       */
      _clearStorageData: function() {
        localStorageUtil.get('vl-userName') && localStorageUtil.remove('vl-userName')
        localStorageUtil.get('vl-password') && localStorageUtil.remove('vl-password')
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~style/variable'

  .login
    position relative
    width 100%
    height 100%
    /* 图片 */    
    .login-bg
      display block
     
    .login-form
      width 360px
      margin-top -80px
      /* logo */
      .form-logo
        display block
        margin-left 70px
        margin-bottom 30px

      /* 表单item */
      .form-item
        position relative
        height 40px
        line-height 40px
        margin-bottom 20px
        text-align center
        .input-item
          width 100%
          height 35px
          line-height 35px
          padding-left 40px
          text-align left
          border-bottom 3px solid #cda21e
          font-size 18px
          color #666666
        .button-item
          width 100%
          height 60px
          line-height 60px
          font-size 26px
          background-color $color
          color #ffffff
          text-shadow 1px 1px 2px rgba(0, 0 ,0 ,.8)  
        .check-item
          margin-left 8px
          color #ffffff
          text-shadow 1px 1px 2px rgba(0, 0 ,0 ,.8)  
        .form-icon
          position absolute
          width 25px
          height 25px
          left 4px
          top 6px

    @media screen and (max-width 1600px) 
      .login-form 
        width 300px
        .form-item
          .button-item
            height 50px
            line-height 50px
            font-size 22px           
</style>
