<template>
  <div>
    <view class="page-wraper">
      <view class="title">请完成以下认证</view>
      <view class="title-desc">请输入以{{phone}}收到的短信验证码</view>
      <view class="message-container">
        <van-cell-group>
          <van-field
            center
            clearable
            placeholder="请输入短信验证码"
            border="false"
            use-button-slot
          >
            <van-button slot="button" custom-class="message-btn" size="small" type="info" @tap="isClick && sendCode()">{{time}}</van-button>
          </van-field>
        </van-cell-group>
      </view>
      <view class="next-step">
        <van-button slot="button" custom-class="message-btn" size="large" type="info">下一步</van-button>
      </view>
    </view>
  </div>
</template>

<script>
export default {
  name: 'profile-resetphone',
  data () {
    return {
      isClick:  true, // 是否控制获取验证码的点击事件
      time: '获取验证码',
      userInfo: {},
      phone: '',
    }
  },
  onShow () {
    this.initPage()
  },
  methods: {
    initPage () {
      this.phone = ''
      this.isClick = true
      let interval = this.interval;    // 保存定时器的id
      clearInterval(interval);
      this.time = '获取验证码'
      this.userInfo = wx.getStorageSync('userInfo')
      this.userphone = this.userInfo[0].userphone
      for ( let i = 0; i < 4; i++) {
        this.phone += this.userphone[i]
      }
      this.phone += '****'
      for ( let i = 8; i < 11; i++) {
        this.phone += this.userphone[i]
      }
    },
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
        if(times < 0){
          this.time = '重新获取';
          this.isClick = true;
          clearInterval(this.interval);
        }
      },1000)
    },
  }
}
</script>

<style lang="less" scoped>
  @import 'profile-resetphone';
</style>

<style lang="less">
  .message-btn {
    border-radius: 10rpx !important;
  }
</style>
