<template>
  <div>
    <van-row custom-class="row-class" v-for="item in addressList" :key="item.index" @click.stop="sendAddressToOrder(item)">
      <van-col span="3">
        <view class="left-container">
          <view class="left-container-desc">{{item.firstName}}</view>
        </view>
      </van-col>
      <van-col span="15" offset="1">
        <view class="phone-container">
          <view>{{item.receiverName}}</view>
          <view class="phone-num">{{item.receiverPhone}}</view>
        </view>
        <view>{{item.receiverProvince}}&nbsp;{{item.receiverCity}}&nbsp;{{item.receiverDict}}&nbsp;{{item.receiverAddressDetail}}</view>
      </van-col>
      <van-col span="4" offset="1" custom-class="right-col" @click.stop="toAddressEdit(item)">
        <view class="right-container">编辑<van-icon class="edit-icon" size="35rpx" name="edit"/></view>
      </van-col>
    </van-row>

    <van-button custom-class="add-newAddress" size="large" type="default" @tap="toAddressCreate">新增收货地址</van-button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'profile-address',
  data () {
    return {
      userInfo: {},
      addressList: [],
      choseAddress: false,
    }
  },
  onLoad (options) {
    if (options.chose) {
      this.choseAddress = true
    }
  },
  onShow () {
    this.userInfo = wx.getStorageSync('userInfo')
    this.getAddressList()
  },
  methods: {
    // 确认订单页选择地址时执行
    sendAddressToOrder (item) {
      if (this.choseAddress) {
        wx.setStorageSync('addressDetail', item)
        wx.navigateBack({
          delta: 1
        })
      }
    },
    // 获取收货地址列表
    getAddressList () {
      let data = {
        userId: this.userInfo.userId
      }
      axios.post("/users/addressList", data).then((responce) => {
        let res = responce.data
        if(res.status !== '0') {
          return
        }
        this.addressList = res.result.list
        this.addressList.forEach(item => {
          item.firstName = item.receiverName.substring(0,1)
        });
      })
    },
    toAddressCreate () {
      wx.navigateTo({
        url: '/pages/profile/profile-address-create/main'
      })
    },
    toAddressEdit (item) {
      wx.navigateTo({
        url: '/pages/profile/profile-address-create/main?addressId=' + item.addressId
      })
    }
  }
}
</script>

<style lang="less" scoped>
  @import 'profile-address';
</style>

<style lang="less">
  .right-col {
    padding-bottom: 20rpx;
    border-left: 2rpx solid #e3e3e3;
  }
  .row-class {
    padding: 20rpx 0 20rpx 0 !important;
  }
  .add-newAddress {
    margin: 40rpx 20rpx 0 20rpx;
    width: 710rpx !important;
    border-radius: 20rpx !important;
  }
</style>
