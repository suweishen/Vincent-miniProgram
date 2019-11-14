<template>
  <div>
    <view class="page-top">
      <view class="page-title">我的账号</view>
      <view class="profile-container">
        <view class="row-container">
          <van-row>
            <van-col span="6">
              <view class="avatar-container">
                <img class="img" src="/static/images/user.png"/>
              </view>
            </van-col>
            <van-col span="12">
              <view class="user-id">jd_15217460423</view>
              <view class="user-name">用户名: {{userInfo.accountName}}</view>
            </van-col>
          </van-row>
        </view>
      </view>
    </view>

    <van-cell-group custom-class="cell-group">
      <van-cell title="我的收货地址" title-class="cell-title" is-link value="管理我的地址" @tap="toAddress" />
      <van-cell title="修改手机号" title-class="cell-title"  is-link :value="phone" @tap="toresetPhone"/>
      <van-cell title="账号登陆密码" title-class="cell-title" is-link value="定期修改更安全" @tap="toresetPwd" />
    </van-cell-group>

    <van-cell-group custom-class="cell-group">
      <van-cell title="联系客服" title-class="cell-title" is-link value="即时解答用户疑难" />
      <van-cell title="建议反馈" title-class="cell-title" is-link value="期待您的建议" @tap="toSuggest"/>
    </van-cell-group>

    <van-button custom-class="logout-btn" size="large" type="default" @tap="logout">退出登录</van-button>

    <van-dialog
      message="请确认是否退出登录"
      :show="showDialog"
      show-cancel-button
      @close="showDialog = false"
      @confirm="toLogin"
      close-on-click-overlay = "true"
    >
    </van-dialog>
  </div>
</template>

<script>
export default {
  name: 'profile-manage',
  data () {
    return {
      showDialog: false,
      userInfo: {},
      userphone: '',
      phone: '', // 加密后的电话号码
    }
  },
  onShow () {
    this.phone = ''
    this.showDialog = false
    this.userInfo = wx.getStorageSync('userInfo')
    this.userphone = this.userInfo.userPhone
    for ( let i = 0; i < 4; i++) {
      this.phone += this.userphone[i]
    }
    this.phone += '****'
    for ( let i = 8; i < 11; i++) {
      this.phone += this.userphone[i]
    }
  },
  methods: {
    logout () {
      this.showDialog = true
    },
    // 前往修改地址页面
    toAddress () {
      wx.navigateTo({
        url: '/pages/profile/profile-address/main'
      })
    },
    // 前往修改手机号页面
    toresetPhone () {
      wx.navigateTo({
        url: '/pages/profile/profile-resetphone/main'
      })
    },
    // 前往修改账号密码页面
    toresetPwd () {
      wx.navigateTo({
        url: '/pages/profile/profile-resetpwd/main'
      })
    },
    // 前往建议反馈界面
    toSuggest () {
      wx.navigateTo({
        url: '/pages/profile/profile-suggest/main'
      })
    },
    // 退出登录
    toLogin () {
      wx.clearStorageSync()
      wx.showToast({
        title: '退出登录成功',
        icon: 'none',
        duration: 2000
      })
      wx.redirectTo({
        url: '/pages/login/log/main',
      })
    },
  }
}
</script>

<style lang="less" scoped>
  @import 'profile-manage';
</style>

<style lang="less">
  .cell-group {
    margin-top: 20rpx;
  }
  .cell-title {
    font-size: 30rpx !important;
  }
  .logout-btn {
    margin: 40rpx 20rpx 0 20rpx;
    width: 710rpx !important;
  }
</style>
