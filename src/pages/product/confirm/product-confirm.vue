<template>
  <div>
    <view class="page-top" @click="toChoseAddress">
      <view v-if="isAddress">
        <view class="contact">{{addressDetail.receiverName}} {{addressDetail.receiverPhone}}</view>
        <view class="address">{{addressDetail.receiverProvince}}{{addressDetail.receiverCity}}{{addressDetail.receiverDict}}{{addressDetail.receiverAddressDetail}}</view>
      </view>
      <view v-else>
        <view class="contact txt-align">请选择收货地址</view>
        <view class="click-to-add txt-align">点击添加</view>
      </view>
      <van-icon class="page-top-icon" size="40rpx" name="arrow" />
      <view class="page-top-image"><img class="img" src='/static/images/slid.png' /></view>
    </view>
    
    <view class="page-middle">
      <view v-for="item in goodsDetail" :key="item.index">
        <view class="store-name-container">
          <view class="store-name">
            <van-icon class="store-icon" size="40rpx" name="shop"/>
            <view>vincent专营店</view>
          </view>
        </view>

        <view class="card-wrapper">
          <view class="delivery-row">
            <view class="goods-container">
              <view class="goods-left">
                <image class="goods-picture" mode="aspectFill" :src="item.productImage"></image>
              </view>
              <view class="goods-middle">
                <view class="goods-title-desc">{{item.productName}}</view>
                <view class="goods-remark">{{item.productType}}</view>
                <view class="price-num-container">
                  <view class="goods-price">￥ {{item.salePrice}}</view>
                  <view class="stepper">x{{item.productNum}}</view>
                </view>
                <view class="tips-container"><van-icon class="warning-icon" size="38rpx" color="#00bcd4" name="warning-o"/>&nbsp;购买后请仔细检查(质量问题可退货)</view>
              </view>
            </view>
          </view>

          <view class="express-wrapper">
            <view class="express-container">
              <view class="express-left">配送服务</view>
              <view class="express-right">快递运输</view>
            </view>
            <view class="express-container1">
              <view class="desc-left">中小件发货时间</view>
              <view class="desc-right">工作日、双休日与节假日均可发货</view>
            </view>
          </view>
          <view class="remark">
            <van-cell-group>
              <van-field
                label="店铺备注"
                type="textarea"
                placeholder="选填，给商家留言"
              />
            </van-cell-group>
          </view>
        </view>
      </view>
    </view>
    <view class="page-bottom">
      <view class="pay-wrapper">
        <view class="pay-container">
          <view class="pay-left">商品金额</view>
          <view class="pay-right">￥{{totalPrice}}</view>
        </view>
        <view class="pay-container1">
          <view class="pay-left">运费</view>
          <view class="pay-right">+￥0.00</view>
        </view>
      </view>
      <view class="pay-amount">
        <view>实付金额:&nbsp;</view>
        <view class="totle-price">￥{{totalPrice}}</view>
      </view>
    </view>
    <van-button custom-class="confirm-btn" size="large" type="info" @click="confirm">提交订单</van-button>
    
    <!-- 弹出层 -->
    <van-dialog
      message="请确认提交订单"
      :show="showDialog"
      show-cancel-button
      @close="showDialog = false"
      @confirm="toOrderDetail"
      close-on-click-overlay = "true"
    >
    </van-dialog>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'product-confirm',
  data () {
    return {
      showDialog: false,
      goodsDetail: [],
      totalPrice: 0,
      userInfo: {},
      addressDetail: {},
      addressList: [],
      isAddress: false,
      isCart: false,
      createTime: '',
    }
  },
  onLoad (options) {
    this.isCart = false
    if (options.isCart) {
      this.isCart = true
    }
    if (options.data) {
      var data = JSON.parse(options.data)
      this.goodsDetail = data
    }
    // 计算商金额
    this.totalPrice = 0
    this.goodsDetail.forEach(item => {
      this.totalPrice += item.salePrice * item.productNum
    });
    this.userInfo = wx.getStorageSync('userInfo')
  },
  onShow () {
    var day = new Date();
    day.setTime(day.getTime());
    var s2 = day.getFullYear() + "-" + (day.getMonth()+1) + "-" + day.getDate() + " " + day.getHours() + ":" + day.getMinutes() + ":" + day.getSeconds();
    this.createTime = s2
    this.addressDetail = wx.getStorageSync('addressDetail')
    var arr = Object.keys(this.addressDetail)
    if (arr.length == 0) {
      this.isAddress = false
    } else {
      this.isAddress = true
    }
  },
  methods: {
    confirm () {
      this.showDialog = true
    },
    // 前往选择地址页
    toChoseAddress () {
      let chose = 'choseAddress'
      wx.navigateTo({
        url: '/pages/profile/profile-address/main?chose=' + chose
      })
    },
    // 前往订单详情页面
    toOrderDetail () {
      if (!(this.isAddress)) {
        wx.showToast({
          title: '你还没选择收货地址',
          icon: 'none'
        })
        return
      }
      this.addressList.push(this.addressDetail)
      let data = {
        userId: this.userInfo.userId,
        totalPrice: this.totalPrice,
        dtlList: this.goodsDetail,
        addressList: this.addressList,
        createTime: this.createTime
      }
      axios.post('/users/createOrder', data).then((response) => {
        let res = response.data
        if(res.status !== '0') {
          wx.showToast({
            title: '创建失败',
            icon: 'none',
            duration: 2000
          })
          return
        }
        wx.showToast({
          title: '创建成功',
          icon: 'none',
          duration: 2000
        })
        if (this.isCart === true) {
          let productIds = this.goodsDetail.map( item => {
            return item.productId
          })
          let payload = {
            userId: this.userInfo.userId,
            productIds: productIds
          }
          axios.post("/users/deleteCartGoods", payload).then((responce) =>{
            let res = responce.data
            if(res.status !== '0') {
              return
            }
          })
        }
        wx.removeStorageSync('addressDetail')
        setTimeout( function() {
          wx.redirectTo({
            url: '/pages/order/list/main'
          })
        }, 1000)
      })
    },
  }
}
</script>

<style lang="less" scoped>
  @import 'product-confirm';
</style>

<style lang="less">
  .card-class {
    background: #fff !important;
  }
  .confirm-btn {
    margin: 120rpx 20rpx 50rpx 20rpx !important;
    width: 710rpx !important;
    border-radius: 10rpx !important;
  }
</style>