<template>
  <div>
    <view class="page-top">
      <view class="avatar-container">
        <view class="avatar-wrapper">
          <img class="img" src="/static/images/user.png" @tap="toProfileManage"/>
        </view>
        <template v-if="userInfo.accountName">
          <view class="user-desc">
            <view>{{userInfo.accountName}}</view>
            <view>2019.07.28</view>
          </view>
        </template>
        <template v-else>
          <view class="loginRemind">
            <view>您还未登录，请先登录</view>
          </view>
        </template>
      </view>
      <view class="profile"  @tap="toProfileManage">
        <view class="profile-icon-container">
          <van-icon name="setting-o" size="40rpx" />
        </view>
        <view>账号管理</view>
      </view>
    </view>
    <view class="swiper-container">
      <view class="swiper-left">
        <view class="left-member">会员中心</view>
        <view class="left-num">活力值 661</view>
      </view>
      <view class="swiper-right">
        <swiper class="swiper" vertical="true" autoplay="true" interval="5000" duration="1000">
          <block v-for="(item, index) in swiperContent" :index="index" :key="index">
            <swiper-item>
              <view>
                <view>{{item.title}}</view>
                <view class="swiper-desc">{{item.desc}}</view>
              </view>
              <image :src="item.url" class="slide-image" mode="aspectFill"/>
            </swiper-item>
          </block>
        </swiper>
      </view>
    </view>

    <view class="function-container">
      <view class="order" @click="toOrderList">
        <view class="my-order">我的订单</view>
        <view class="all-order">查看全部订单<van-icon name="arrow"/></view>
      </view>
      <van-row>
        <van-col :custom-class="tapIcon === 'shoppingcar' ? 'colClass' : ''" span="6" class="txt-center"  @tap="toShoppingCar">
          <view class="badge">
            &nbsp;
          </view>
          <view><van-icon name="shopping-cart-o" size="60rpx" /></view>
          <view class="item-text">购物车</view>
        </van-col>
        <van-col span="6" class="txt-center">
          <view class="badge">
            &nbsp;
          </view>
          <view><van-icon name="logistics" size="60rpx" /></view>
          <view class="item-text">物流信息</view>
        </van-col>
        <van-col :custom-class="tapIcon === 'profileAddress' ? 'colClass' : ''" span="6" class="txt-center" @tap="toProfileAddress">
          <view class="badge">
            &nbsp;
          </view>
          <view><van-icon name="location-o" size="60rpx" /></view>
          <view class="item-text">收货地址</view>
        </van-col>
        <van-col span="6" :custom-class="tapIcon === 'orderList' ? 'colClass' : ''" class="txt-center" @tap="toOrderDetail">
          <view class="badge">
            &nbsp;
          </view>
          <view><van-icon name="notes-o" size="60rpx" /></view>
          <view class="item-text">订单信息</view>
        </van-col>
      </van-row>
    </view>

    <van-tabbar
      :active="active"
      active-color="#00bcd4"
      inactive-color="#000"
      @change="onChange"
    >
      <van-tabbar-item icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item icon="apps-o">分类</van-tabbar-item>
      <van-tabbar-item icon="shopping-cart-o">购物车</van-tabbar-item>
      <van-tabbar-item icon="manager-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'profile-detail',
  data () {
    return {
      active: 3,
      swiperContent: [
        {
          url: 'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1564303676&di=fda7a4fb98ce3c636ef1f0dcbf822ae8&src=http://img010.hc360.cn/hb/MTQ1OTg4NTE1MzA0OC0xOTExNDI3NjQx.jpg',
          title: '专享会员优惠大礼包',
          desc: '更多优惠尽在此处'
        },
        {
          url: 'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1564303676&di=fda7a4fb98ce3c636ef1f0dcbf822ae8&src=http://img010.hc360.cn/hb/MTQ1OTg4NTE1MzA0OC0xOTExNDI3NjQx.jpg',
          title: 'Ayo在你头上暴扣',
          desc: '硬核之王'
        }
      ],
      tapIcon: '',
      userInfo: {},
    }
  },
  onShow () {
    this.tapIcon = ''
    this.userInfo = wx.getStorageSync('userInfo')
  },
  methods: {
    onChange (event) {
      if(event.mp.detail === 0) {
        wx.redirectTo({
          url: '/pages/index/main'
        })
      }
      if(event.mp.detail === 1) {
        wx.redirectTo({
          url: '/pages/category/main'
        })
      }
    },
    // 前往订单列表 
    toOrderList () {
      wx.navigateTo({
        url: '/pages/order/list/main'
      })
    },
    // 前往账号管理页面
    toProfileManage () {
      wx.navigateTo({
        url: '/pages/profile/profile-manage/main'
      })
    },
    // 前往地址管理页面
    toProfileAddress () {
      this.tapIcon = 'profileAddress'
      wx.navigateTo({
        url: '/pages/profile/profile-address/main'
      })
    },
    // 前往订单列表
    toOrderDetail () {
      this.tapIcon = 'orderList'
      wx.navigateTo({
        url: '/pages/order/list/main'
      })
    },
    // 前往购物车页面
    toShoppingCar () {
      this.tapIcon = 'shoppingcar'
      wx.navigateTo({
        url: '/pages/shopping-cart/list/main'
      })
    },
  }
}
</script>

<style lang="less" scoped>
  @import 'profile-detail';
</style>

<style lang="less">
  .colClass {
    background: #f5f5f5 !important;
    padding-bottom: 20rpx !important;
    // margin-top: 10rpx !important;
  }
</style>
