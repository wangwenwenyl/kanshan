/** 
 * @Desc: 头部的头像列表
 */
<template>
  <li class="header-avatar-page float-left">
    <!-- 头像 -->
    <Avatar class="clickable tou-xiang" :src="avavtarSrc" />

    <!-- 下一级数据列表 -->
    <ul class="nav-ul">
      <li class="nav-li clickable" @click="_accoutFormModelShow('accoutForm')">我的帐号</li>
      <li class="nav-li clickable" @click="_passwordFormModelShow('passwordForm')">修改密码</li>
      <router-link tag="li" class="nav-li clickable" to="/my-collection">我的收藏</router-link>
      <router-link tag="li" class="nav-li clickable" to="watch-record">观看记录</router-link>
      <router-link tag="li" class="nav-li clickable" to="login">退出登录</router-link>
    </ul>


    <!-- 帐号弹窗 -->
    <Modal v-model="accoutVisible" title="个人信息">
      <Form ref="accoutForm" :model="accoutForm" :rules="accoutRule" :label-width="100" style="padding-top: 20px">
        <FormItem label="姓名" prop="name" style="margin-bottom: 30px">
          <Input v-model="accoutForm.name" disabled placeholder="姓名" style="width: 80%"></Input>
        </FormItem>
        <FormItem label="昵称" prop="nickName" style="margin-bottom: 30px">
          <Input v-model="accoutForm.nickName" placeholder="昵称" style="width: 80%" :maxlength="15"></Input>
        </FormItem>
        <FormItem label="性别" prop="gender" style="margin-bottom: 30px">
          <RadioGroup v-model="accoutForm.gender">
            <Radio :label="1">男</Radio>
            <Radio :label="2">女</Radio>
          </RadioGroup>
        </FormItem>
      </Form>
      <div slot="footer">
        <button @click="_handleSubmitAccout('accoutForm')" class="clickable" style="backgroundColor: #a1c205; color: #ffffff; padding: 5px 15px; margin: 0 10px">保存</button>
        <button @click="_handleResetAccout('accoutForm')" class="clickable" style="padding: 5px 15px">取消</button>
      </div>
    </Modal>

    <!-- 密码对应的弹窗 -->
    <Modal v-model="passwordVisible" title="修改密码">
      <Form ref="passwordForm" :model="passwordForm" :rules="passwordRule" :label-width="100" style="padding-top: 20px">
        <FormItem label="初始密码" prop="originPassword" style="margin-bottom: 30px">
          <Input v-model="passwordForm.originPassword" type="password" placeholder="初始密码" style="width: 80%"></Input>
        </FormItem>
        <FormItem label="新密码" prop="password" style="margin-bottom: 30px">
          <Input v-model="passwordForm.password" type="password" placeholder="新密码" style="width: 80%"></Input>
        </FormItem>
        <FormItem label="确认新密码" prop="confirmPassword" style="margin-bottom: 30px">
          <Input v-model="passwordForm.confirmPassword" type="password" placeholder="确认新密码" style="width: 80%"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <button @click="_handleSubmitPassword('passwordForm')" class="clickable" style="backgroundColor: #a1c205; color: #ffffff; padding: 5px 15px; margin: 0 10px">保存</button>
        <button @click="_handleResetPassword('passwordForm')" class="clickable" style="padding: 5px 15px">取消</button>
      </div>
    </Modal>
  </li>
</template>

<script type="text/ecmascript-6">
  import { requestGetUserInfo, requestPatchUserInfo, requestPatchPassword } from 'api/home-page'
  import { localStorageUtil } from 'lib/util'

  export default {
    name: 'header-avatar',
    data: function() {
      const validatePassCheck = (rule, value, callback) => {
        if (value !== this.passwordForm.password) {
          callback(new Error('两次密码输入不一致'))
        } else {
          callback()
        }
      }
      return {
        // 用户信息对象数据
        userInfo: {},

        // 帐号表单
        accoutForm: {
          name: '',
          nickName: '',
          gender: 2
        },
        // 帐号校验规则
        accoutRule: {
          nickName: [
            { required: true, trigger: 'blur', message: '请填写昵称' }
          ]
        },

        // 密码表单
        passwordForm: {
          originPassword: '',
          password: '',
          confirmPassword: ''
        },
        // 密码校验规则
        passwordRule: {
          originPassword: [
            { required: true, trigger: 'blur', message: '请填写初始密码' }
          ],
          password: [
            { required: true, trigger: 'blur', message: '请填写新密码' },
            { min: 6, max: 32, message: '请输入6-32位密码', trigger: 'blur' }
          ],
          confirmPassword: [
            { required: true, trigger: 'blur', message: '请确认新密码' },
            { validator: validatePassCheck, trigger: 'blur' }
          ]
        },

        // 帐号表单flag
        accoutVisible: false,
        // 密码表单flag
        passwordVisible: false,

        // 头像数据
        avavtarSrc: 'https://i.loli.net/2017/08/21/599a521472424.jpg',
      }
    },
    mounted: function() {
      this._getUserInfo()
    },
    methods: {
      /** 
       * 我的帐号按钮点击
       * @param {String} name: 表单的ID名称
      */
      _accoutFormModelShow: function(name) {
        // 清空表单的填入值
        this.$refs[name].resetFields()
        // 给表单赋值
        this.accoutForm = {
          name: this.userInfo.userName,
          nickName: this.userInfo.nickname,
          gender: this.userInfo.gender
        }
        this.accoutVisible = true
      },

      /** 
       * 帐号弹窗确定
       * @param {String} name: 表单的ID名称
      */
      _handleSubmitAccout: function(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            let param = {
              nickname: this.accoutForm.nickName,
              gender: Number(this.accoutForm.gender)
            }
            requestPatchUserInfo(param).then( response => {
              if (response.code === 0) {
                this.$Message.success('个人信息修改成功')
                this._getUserInfo()
                this.accoutVisible = false
              }
            })
          } 
        })
      },

      /** 
       * 帐号弹窗取消
       * @param {String} name: 表单的ID名称
      */
      _handleResetAccout: function(name) {
        this.$refs[name].resetFields()
        this.accoutVisible = false
      },

      /** 
       * 修改密码图标点击
      */
      _passwordFormModelShow: function(name) {
        // 清空表单的填入值
        this.$refs[name].resetFields()
        this.passwordVisible = true
      },

      /** 
       * 密码弹窗确定
       * @param {String} name: 表单的ID名称
      */
      _handleSubmitPassword: function(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            let param = {
              oldPassword: this.passwordForm.originPassword,
              newPassword: this.passwordForm.password
            }
            // 后台api
            requestPatchPassword(param).then( response => {
              let code = response.code
              let message = response.message
              if (code === 0) {
                this.$Message.success(message)
                this.passwordVisible = false
                // 设置新的密码
                localStorageUtil.set('vl-password', param.newPassword)
              } else if (code === 1) {
                this.$Message.error(message)
                this.passwordVisible = true                
              }
            })
          } 
        })
      },

      /** 
       * 密码弹窗取消
       * @param {String} name: 表单的ID名称
      */
      _handleResetPassword: function(name) {
        this.$refs[name].resetFields()
        this.passwordVisible = false
      },

      /** 
       * 获取用户信息的zpi
      */
      _getUserInfo: function() {
        requestGetUserInfo().then( response => {
          // console.log('requestGetUserInfo:', response)
          if (response.code === 0) {
            this.userInfo = response.data
          }
        })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  /* 按需引入变量和方法 */
  @import '~style/variable'

  .header-avatar-page
    position relative
    top 0
    left 0
    height 100%
    text-align center
    margin 0 20px
    &:hover 
      .nav-ul
        display block
     
    /* img头像 */
    .nav-title
      display inline-block
      height 40px
      width 40px
      border-radius 50%
      line-height 40px
      text-align center
      color $color-text-w
      background-color rgba(200, 200, 200, .8)  

      
     /* 列表 */
    .nav-ul
      position absolute
      left 50%
      margin-left -60px
      z-index 9
      display none
      background-color $color-background
      box-shadow rgba(0,0,0,.16) 0 0 13px
      border-top 2px solid #a4c40c
      &::after
        content ''
        position absolute
        top -10px
        left 50%
        display block
        width 0
        height 0
        margin-left -10px
        border-left 10px solid transparent
        border-right 10px solid transparent 
        border-bottom 10px solid #a4c40c
        border-top none
      &::before
        content ''
        position absolute
        top -8px
        left 50%
        z-index 10
        display block
        width 0
        height 0
        margin-left -8px
        border-left 8px solid transparent
        border-right 8px solid transparent 
        border-bottom 8px solid #ffffff
        border-top none  

      /* 列表li */
      .nav-li
        width 120px
        height 40px
        line-height 40px
        text-align center
        &:hover
          background-color rgba(200, 200, 200, .0)
          color #cb8919
        &:last-child
          border-radius 0 0 2px 2px  
  .tou-xiang    
    width 40px 
    height 40px 
    border-radius   50%
  /*表单样式*/  
  .input-box
    text-align center
    margin 20px
  .input-label
    display inline-block
    width 100px
    text-align right
    font-size 16px
    margin-right 30px
    vertical-align top
    line-height 40px
  .input-search
    display inline-block
    width 200px
    height 35px
    border 1px solid #ddd  
    padding 0 10px
    font-size 16px
  .error-remind
    color red
    font-size 14px  
    margin-top:5px
  .remind-box
    display inline-block
    text-align left
  .new-password,.sure-password,.old-password
    border 1px solid red  
</style>
