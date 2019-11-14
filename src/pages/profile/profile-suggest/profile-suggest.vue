<template>
  <div>
    <view class="page-top">
      <view class="question-class">问题类型</view>
      <view class="check-wrapper">
        <van-checkbox
          :value="func"
          checked-color="#07c160"
          @change="funcChange"
        >
          功能异常
        </van-checkbox>

        <van-checkbox
          custom-class="checkbox-right"
          :value="suggest"
          checked-color="#07c160"
          @change="suggestChange"
        >
          优化建议
        </van-checkbox>
      </view>
    </view>

    <view class="input-container">
      <view class="title">问题或建议</view>
      <view>
        <van-field
          input-class="input-class"
          :value="message"
          type="textarea"
          placeholder="请描述您的问题或建议，我们将尽快优化体验，感谢您的反馈"
          maxlength="100"
          :border="border"
          @change="inputChange"
        />
        <view class="input-length">{{inputLength}}/100</view>
      </view>
    </view>

    <view class="contact-container">
      <view class="title">联系方式 (选填)</view>
      <view>
        <van-field
          :value="phoneNum"
          type="textarea"
          placeholder="请留下您的手机号码"
          maxlength="20"
          :border="border"
          @change="phoneChange"
        />
      </view>
    </view>

    <van-button custom-class="confirm-btn" size="large" type="info" @tap="confirm">提交</van-button>
  </div>
</template>

<script>
export default {
  name: 'profile-suggest',
  data () {
    return {
      func: true,
      suggest: false,
      message: '',
      phoneNum: '',
      border: false,
      inputLength: 0
    }
  },
  methods: {
    funcChange (event) {
      this.func = event.mp.detail
      this.suggest = !this.suggest
    },
    suggestChange (event) {
      this.suggest = event.mp.detail
      this.func = !this.func
    },
    // 建议输入框改变
    inputChange (event) {
      this.message = event.mp.detail
      this.inputLength = this.message.length
      if (this.inputLength === 100) {
        wx.showToast({
          title: '已达到最大长度',
          icon: 'none'
        })
      }
    },
    // 电话号码改变
    phoneChange (event) {
      this.phoneNum = event.mp.detail
    },
    // 提交反馈
    confirm () {
      let reg = /^1[3456789]\d{9}$/
      if (this.phoneNum !== '') {
        if (!reg.test(this.phoneNum)) {
          wx.showToast({
            title: '请输入正确的手机号',
            icon: 'none'
          })
          return
        }
      }
    },
  }
}
</script>

<style lang="less" scoped>
  @import 'profile-suggest';
</style>

<style lang="less">
  .checkbox-right {
    margin-left: 35rpx;
  }
  .input-class {
    height: 130rpx !important;
    line-height: 30rpx !important;
  }
  .confirm-btn {
    border-radius: 10rpx !important;
    margin: 40rpx 20rpx 0 20rpx;
    width: 710rpx !important;
  }
</style>
