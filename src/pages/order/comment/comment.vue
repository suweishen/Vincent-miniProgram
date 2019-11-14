<template>
  <div>
    <view class="title-wrapper">
      <van-row class="row-wrapper">
        <van-col class="img-wrapper" span="6">
          <img class="goods-img" src="/static/images/15.jpg" />
        </van-col>
        <van-col :class="good" span="6" @click="goodComment('good')"><van-icon name="flower-o" size="40rpx" />好评</van-col>
        <van-col :class="middle" span="6" @click="goodComment('middle')"><van-icon name="flower-o" size="40rpx" />中评</van-col>
        <van-col :class="low" span="6" @click="goodComment('low')"><van-icon name="flower-o" size="40rpx" />差评</van-col>
      </van-row>
    </view>

    <view class="input-container">
      <view>
        <van-field
          input-class="input-class"
          :value="message"
          type="textarea"
          placeholder="宝贝满足您的期待吗？说说它的优点和美中不足的地方吧"
          maxlength="200"
          :border="border"
          @change="inputChange"
        />
        <view class="input-length">{{inputLength}}/200</view>
      </view>
      <view class="img-wrapper" @click="chooseImage">
        <view class="img-inner-class">+</view>
      </view>
    </view>

    <view class="store-comment">店铺评价</view>
    <van-row custom-class="goods-like">
      <van-col class="desc-class" span="4">描述相符</van-col>
      <van-col span="8" offset="2"><van-rate :value="value" color="#f44" icon="like" void-icon="like-o" @change="descChange($event)"/></van-col>
    </van-row>

    <van-row custom-class="goods-like">
      <van-col class="desc-class" span="4">物流服务</van-col>
      <van-col span="8" offset="2"><van-rate :value="value" color="#f44" icon="like" void-icon="like-o" @change="expressChange($event)"/></van-col>
    </van-row>

    <van-row custom-class="goods-like">
      <van-col class="desc-class" span="4">服务态度</van-col>
      <van-col span="8" offset="2"><van-rate :value="value" color="#f44" icon="like" void-icon="like-o" @change="serviceChange($event)"/></van-col>
    </van-row>

    <van-button custom-class="confirm-btn" size="large" type="info" @tap="commitComment">提交</van-button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'comment',
  data () {
    return {
      inputLength: 0,
      message: '',
      value: '0',
      descNum: 0,
      commentStatus: '',
      good: 'comment',
      middle: 'comment',
      low: 'comment',
      accord: '', // 描述相符
      express: '', // 物流服务
      service: '', // 服务态度
    }
  },
  methods: {
    // 上传图片
    chooseImage (e) {
      var that = this
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          wx.showLoading({
            title: '上传中...',
            mask: true
          })
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          that.readImageAsBase64(res.tempFilePaths[0], e)
        }
      })
    },
    // 图片转base64
    readImageAsBase64 (tempFilePaths, e) {
      let FileSystemManager = wx.getFileSystemManager()
      let base64 = FileSystemManager.readFileSync(tempFilePaths, 'base64')
      let src = 'data:image/jpeg;base64,' + base64
      // this.commitComment(src)
      // uploadImage.uploadImg( 'product', src).then( res => {
      //   if (res === '') {
      //     return
      //   }
      //   wx.showToast({
      //     title: '上传成功',
      //     icon: 'none',
      //     duration: 2000
      //   })
      //   this.picList.push({ url: res.data.imageUrls[0] })
      //   this.picList.forEach( (item, index) => {
      //     item.index = index
      //   })
      //   this.productList.forEach( item => {
      //     if (item.productId === e.productId) {
      //       item.picList.push({ url: res.data.imageUrls[0] })
      //     }
      //   })
      // })
    },
    // 建议输入框改变
    inputChange (event) {
      this.message = event.mp.detail
      this.inputLength = this.message.length
      if (this.inputLength === 200) {
        wx.showToast({
          title: '已达到最大长度',
          icon: 'none'
        })
      }
    },
    // 点击好评
    goodComment (desc) {
      if (desc === 'good') {
        this.good = 'active'
        this.middle = 'comment'
        this.low = 'comment'
        this.commentStatus = desc
        console.log(this.commentStatus)
      }
      if (desc === 'middle') {
        this.middle = 'active'
        this.good = 'comment'
        this.low = 'comment'
        this.commentStatus = desc
        console.log(this.commentStatus)
      }
      if (desc === 'low') {
        this.low = 'active'
        this.middle = 'comment'
        this.good = 'comment'
        this.commentStatus = desc
        console.log(this.commentStatus)
      }
    },
    // 描述评价
    descChange (e) {
      this.accord = e.mp.detail
    },
    // 物流服务
    expressChange (e) {
      this.express = e.mp.detail
    },
    // 服务态度
    serviceChange (e) {
      this.service = e.mp.detail
    },
    // 提交评价
    commitComment () {
      let data = {
        commentDesc: this.message
      }
      axios.post('/users/orderComment', data).then((response) => {
        let res = response.data
        if(res.status !== '0') {
          return
        }
        wx.showToast({
          title: '评论成功',
          icon: 'none',
          duration: 2000
        })
      })
    },
  }
}
</script>

<style lang="less" scoped>
  @import 'comment';
</style>

<style lang="less">
  .input-class {
    height: 180rpx !important;
    line-height: 30rpx !important;
  }
  .goods-like {
    margin: 30rpx 0 0 20rpx !important;
  }
  .confirm-btn {
    border-radius: 10rpx !important;
    margin: 60rpx 20rpx 0 20rpx;
    width: 710rpx !important;
  }
</style>