<template>
  <div>
    <view class="title-desc">
      <view>帮助</view>
      <view class="register" @tap="toRegister">注册账号</view>
    </view>
    <van-cell-group v-if="loginType === 'password' ? true : false">
      <van-field
        :value="userid"
        label="用户名"
        placeholder="请输入用户名"
        left-icon="contact"
        border="false"
        @change="changeid"
      />
      <van-field
        :value="password"
        :type="pwdType ? 'password' : 'text'"
        label="密码"
        left-icon="info-o"
        placeholder="请输入密码"
        :right-icon="pwdType ? 'closed-eye' : 'eye-o'"
        border="false"
        @click-right-icon="clickRightIcon"
        @change="changepwd"
      />
    </van-cell-group>

    <van-cell-group v-if="loginType === 'phone' ? true : false">
      <van-field
        label="+86"
        placeholder="请输入手机号码"
        left-icon="phone-o"
        border="false"
      />
      <van-field
        left-icon="info-o"
        label="验证码"
        clearable
        placeholder="请输入短信验证码"
        border="false"
        use-button-slot
      >
        <van-button slot="button" custom-class="message-btn" size="mini" type="info" @tap="isClick && sendCode()">{{time}}</van-button>
      </van-field>
    </van-cell-group>
    <van-button custom-class="login-btn" :loading="showLoading" size="large" type="info" @tap="login">登录</van-button>
    <view class="other-login-function">其他登录方式</view>
    <view class="page-bottom">
      <view @tap="changeLoginFunc">
        <view class="icon-container"><van-icon custom-class="icon-class" size="60rpx" color="#fff" :name="loginType === 'password' ? 'graphic' : 'lock'" /></view>
        <view class="login-desc">{{[loginType === 'password' ? '短信登陆' : '账号登录']}}</view>
      </view>
    </view>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'log',
  data () {
    return {
      pwdType: true,
      loginType: 'password',
      changeLogin: true,
      isClick:  true, // 是否控制获取验证码的点击事件
      time: '获取验证码',
      userInfo: {},
      userid: '',
      password: '',
      showLoading: false,
    }
  },
  onShow () {
    this.initPage()
  },
  methods: {
    initPage () {
      this.isClick = true
      this.showLoading = false
      let interval = this.interval    // 保存定时器的id
      clearInterval(interval)
      this.time = '获取验证码'
      this.userInfo = wx.getStorageSync('userInfo')
    },
    clickRightIcon () {
      console.log(1)
      this.pwdType = !this.pwdType
    },
    // 输入用户名
    changeid (event) {
      this.userid = event.mp.detail
    },
    // 输入密码
    changepwd (event) {
      this.password = event.mp.detail
    },
    // 改变登录方式
    changeLoginFunc () {
      this.changeLogin = !this.changeLogin
      if (this.changeLogin) {
        this.loginType = 'password'
      } else {
        this.loginType = 'phone'
      }
    },
    //  验证码功能
    sendCode () {
      wx.showToast({
        title: '验证码已发送，请注意查收',
        icon: 'none'
      })
      this.isClick = false;
      let times = 60; // 用于倒计时
      this.time = times+'s';
      this.interval = setInterval(() =>{
        times--;
        this.time = times+'s';
        if (times < 0){
          this.time = '重新获取';
          this.isClick = true;
          clearInterval(this.interval);
        }
      },1000)
    },
    // 登录
    login () {
      if (this.loginType === 'password') {
        this.showLoading = true
        let data = {
          userName: this.userid,
          userPwd: this.password
        }
        axios.post("/users",data).then((response) => {
            let res = response.data;
            if(res.status !== '0') {
              this.showLoading = false
              wx.showToast({
                title: '账号或密码错误',
                icon: 'none',
                duration: 2000
              })
              return
            }
            wx.setStorageSync('token',res.result.token)
            wx.setStorageSync('userInfo',res.result.list[0])
            wx.showToast({
              title: '登录成功',
              icon: 'none',
              duration: 2000
            })
            this.showLoading = false
            wx.redirectTo({
              url: '/pages/index/main'
            })
          })
      }
    },
    toRegister () {
      wx.navigateTo({
        url: '/pages/login/register/main'
      })
    }
  }
}
</script>

<style lang="less" scoped>
  @import 'log';
</style>

<style lang="less">
  .login-btn {
    margin: 40rpx 20rpx 0 20rpx;
    width: 710rpx !important;
    border-radius: 10rpx !important;
  }
  .icon-class {
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    height: 100% !important;
    width: 100% !important;
  }
</style>


