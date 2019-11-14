<template>
  <div>
    <view class="title">账号信息</view>
    <van-cell-group>
      <van-field
        :value="userid"
        clearable
        required
        label="用户名"
        placeholder="请输入用户名"
        @change="changeid"
      />
      <van-field
        :value="password"
        required
        type="password"
        label="密码"
        placeholder="请输入密码"
        right-icon="eye-o"
        @change="changepwd"
      />
    </van-cell-group>
    <view class="title">个人信息</view>
    <van-cell-group>
      <van-field
        :value="accountname"
        clearable
        required
        label="账号名"
        placeholder="请输入账号名"
        @change="changeaccountname"
      />
      <van-field
        :value="username"
        clearable
        required
        label="姓名"
        placeholder="请输入您的姓名"
        @change="changename"
      />
      <van-field
        :value="userphone"
        clearable
        required
        label="手机号"
        placeholder="请输入本人手机号"
        @change="changephone"
      />
    </van-cell-group>
    <van-button custom-class="register-btn" size="large" type="info" @tap="register">注册</van-button>
  </div>
</template>

<script>
export default {
  name: 'register',
  data () {
    return {
      userid: '',
      password: '',
      username: '',
      userphone: '',
      userInfo: [],
      accountname: '',
    }
  },
  methods: {
    changeid (event) {
      this.userid = event.mp.detail
    },
    changepwd (event) {
      this.password = event.mp.detail
    },
    changename (event) {
      this.username = event.mp.detail
    },
    changephone (event) {
      this.userphone = event.mp.detail
    },
    changeaccountname (event) {
      this.accountname = event.mp.detail
    },
    register () {
      if (this.userid === '' || this.password === '' || this.username === '' || this.userphone === '') {
        wx.showToast({
          title: '请确保所有资料填写完毕',
          icon: 'none',
        })
        return
      }
      let payload = {
        userid: this.userid,
        password: this.password,
        accountname: this.accountname,
        username: this.username,
        userphone: this.userphone,
      }
      this.userInfo.push(payload)
      wx.setStorageSync('userInfo', this.userInfo)
      wx.showToast({
        title: '注册成功',
        icon: 'none'
      })
      wx.redirectTo({
        url: '/pages/login/log/main'
      })
    },
  }
}
</script>

<style lang="less" scoped>
  @import 'register';
</style>

<style lang="less">
  .register-btn {
    margin: 40rpx 20rpx 0 20rpx;
    width: 710rpx !important;
    border-radius: 10rpx !important;
  }
</style>
