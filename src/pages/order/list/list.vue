<template>
  <div>
    <van-tabs v-model="active" @click="tabChange">
      <van-tab title="所有订单">
      <view class="page-middle" v-for="item in orderList" :key="item.index" @click.stop="toDetail(item)">
        <view class="store-name-container">
          <view class="store-name">
            <van-icon class="store-icon" size="40rpx" name="shop"/>
            <view>vincent专营店</view>
            <view class="orderStatus">已完成</view>
          </view>
        </view>

        <view class="card-wrapper">
          <view class="delivery-row">
            <view class="goods-container">
              <view class="goods-left" v-for="(item1, key) in item.dtlList" :key="item1.index">
                <image class="goods-picture" mode="aspectFill" :src="item1.productImage"></image>
                <view class="goods-tag">x{{item1.productNum}}</view>
              </view>
              <view class="goods-middle" v-for="(item1, key) in item.dtlList" :key="item1.index">
                <view class="goods-title-desc" v-if="item.dtlList.length === 1">{{item1.productName}}</view>
                <view class="goods-remark" v-if="item.dtlList.length === 1">{{item1.productType}}</view>
              </view>
            </view>
            <view class="price-num-container">
              <view class="stepper">共{{item.dtlList.length}}种商品</view>
              <view class="goods-price">￥ {{item.totalPrice}}</view>
            </view>
            <view class="detail-btn-class">
              <van-button custom-class="detail-btn" size="small" type="info">查看详情</van-button>
            </view>
          </view>
        </view>
      </view>
      </van-tab>
      <van-tab title="待付款">

      </van-tab>
      <van-tab title="待收货">

      </van-tab>
      <van-tab title="待评价">
        <view class="page-middle">
        <view class="store-name-container">
          <view class="store-name">
            <van-icon class="store-icon" size="40rpx" name="shop"/>
            <view>vincent专营店</view>
            <view class="orderStatus">待评价</view>
          </view>
        </view>

        <view class="card-wrapper">
          <view class="delivery-row">
            <view class="goods-container">
              <view class="goods-left">
                <image class="goods-picture" mode="aspectFill" src="/static/images/mi6.jpg"></image>
              </view>
              <view class="goods-middle">
                <view class="goods-title-desc">肯得起汉堡哈哈哈哈哈哈哈哈哈哈哈哈哈哈</view>
                <view class="goods-remark">哈哈哈哈哈哈哈哈</view>
                <view class="price-num-container">
                  <view class="stepper">共1件商品</view>
                  <view class="goods-price">￥ 88.50</view>
                </view>
                <view class="detail-btn-class">
                  <van-button custom-class="detail-btn" size="small" type="info" @tap="toComment">去评价</van-button>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'list',
  data () {
    return {
      userInfo: {},
      orderList: [],
    }
  },
  onShow () {
    this.initPage()
  },
  methods: {
    initPage () {
      this.userInfo = wx.getStorageSync('userInfo')
      this.getOrderList()
    },
    // 前往订单详情
    toDetail (item) {
      let data = JSON.stringify(item)
      wx.navigateTo({
        url: '/pages/order/detail/main?data=' + data
      })
    },
    // 获取订单列表
    async getOrderList () {
      let data = {
        userId: this.userInfo.userId
      }
      await axios.post('/users/orderList', data).then((responce) => {
        let res = responce.data
        if (res.status !== '0') {
          return
        }
        this.orderList = res.result.list
        console.log('this.orderList', this.orderList)
      })
    },
    tabChange (title) {
      console.log(title)
    },
    toComment () {
      wx.navigateTo({
        url: '/pages/order/comment/main'
      })
    },
  }
}
</script>

<style lang="less" scoped>
  @import 'list';
</style>

<style lang="less">
  .detail-btn {
    border-radius: 10rpx !important;
  }
</style>