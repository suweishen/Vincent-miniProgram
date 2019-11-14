<template>
  <div>
    <van-notice-bar
      left-icon="volume-o"
      :text="noticeText"
    />
    <van-cell-group class="fieldGroup">
      <van-field
        :value="oldPassword"
        required
        clearable
        type="password"
        label="原密码"
        placeholder="请输入原密码"
        @change="oldPasswordChange"
      />

      <van-field
        :value="newPassword"
        type="password"
        label="新密码"
        placeholder="请输入新密码"
        required
        clearable
        @change="newPasswordChange"
      />      

      <van-field
        :value="repeatPassword"
        type="password"
        label="确认新密码"
        placeholder="再次输入新密码"
        required
        clearable
        @change="repeatPasswordChange"
      />
    </van-cell-group>

    <van-button custom-class="resetpwd-btn" :loading="showLoading" size="large" type="info" @tap="resetpwd">确定</van-button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'profile-resetpwd',
  data () {
    return {
      oldPassword: '',
      newPassword: '',
      repeatPassword: '',
      noticeText: '账号安全中心:  定期修改您的登陆密码，可以更好地保障您的账号安全!',
      userInfo: {},
      showLoading: false,
    }
  },
  onShow () {
    this.userInfo = wx.getStorageSync('userInfo')
    this.showLoading = false
  },
  methods: {
    // 输入旧密码
    oldPasswordChange (event) {
      this.oldPassword = event.mp.detail
    },
    // 输入新密码
    newPasswordChange (event) {
      this.newPassword = event.mp.detail
    },
    // 再次输入新密码
    repeatPasswordChange (event) {
      this.repeatPassword = event.mp.detail
    },
    resetpwd () {
      if (this.oldPassword === '') {
        wx.showToast({
          title: '请输入原密码',
          icon: 'none'
        })
        return
      }
      if (this.oldPassword !== this.userInfo.userPwd) {
        wx.showToast({
          title: '原密码错误',
          icon: 'none'
        })
        return
      }
      if (this.newPassword === '' || this.repeatPassword === '') {
        wx.showToast({
          title: '请输入新密码',
          icon: 'none'
        })
        return
      }
      if (this.newPassword !== this.repeatPassword) {
        wx.showToast({
          title: '请确保新密码一致',
          icon: 'none'
        })
        return
      }
      this.showLoading = true
      let data = {
        id: this.userInfo._id,
        userPwd: this.newPassword
      }
      axios.post("/users/resetPwd",data).then((response) => {
        let res = response.data;
        if(res.status !== '0') {
          this.showLoading = false
          return
        }
        this.showLoading = false
        wx.showToast({
          title: '修改成功,请重新登录',
          icon: 'none',
          duration: 2000
        })
        wx.redirectTo({
          url: '/pages/login/log/main'
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
  @import 'profile-resetpwd';
</style>

<style lang="less">
  .resetpwd-btn {
    margin: 0 20rpx 0 20rpx;
    width: 710rpx !important;
    border-radius: 10rpx !important;
  }
</style>