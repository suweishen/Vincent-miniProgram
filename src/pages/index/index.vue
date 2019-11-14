<template>
  <div>
    <view class="page-top"> 
      <view class="icon-container">
        <view class="icon-detail" @tap="toCategory">
          <van-icon name="apps-o" size="50rpx" custom-class="custom-class-appsicon"/>
          <view class="icon-desc">分类</view>
        </view>
        <view class="search-container" @tap="toSearch">
          <van-cell :border="cellBorder" custom-class="custom-class-cell">
            <view class="search-desc">
              <van-icon custom-class="custom-class-searchicon" name="search" size="40rpx"/>
              请输入书本名称/出版社
            </view>
          </van-cell>
        </view>
      </view>
    </view>

    <view class="page-middle">
      <view class="hotSearch-background">
        <van-row class="hotSearch-container">
          <van-col span="3" class="txt-center" @click="jump" custom-class="custom-class-col1">
            <view class="item-text">热搜</view>
          </van-col>
          <van-col span="6" class="txt-center" custom-class="custom-class-col">
            <view class="item-text">高等数学</view>
          </van-col>
          <van-col span="6" class="txt-center" custom-class="custom-class-col">
            <view class="item-text">闲置网球拍</view>
          </van-col>
          <van-col span="6" class="txt-center" custom-class="custom-class-col">
            <view class="item-text">乒乓球拍</view>
          </van-col>
        </van-row>
      </view>
      
      <swiper class="swiper" indicator-dots="true" autoplay="true" interval="5000" duration="1000">
        <block v-for="(item, index) in images" :index="index" :key="index">
            <swiper-item>
                <image :src="item.url" class="slide-image" mode="aspectFill"/>
            </swiper-item>
        </block>
      </swiper>

      <view>
        <van-row>
          <van-col span="6" class="txt-center">
            <view class="badge">
              &nbsp;
            </view>
            <view class="img-class"><img class="image-class" src='/static/images/camp.png' /></view>
            <view class="item-text">电子设备</view>
          </van-col>
          <van-col span="6" class="txt-center">
            <view class="badge">
              &nbsp;
            </view>
            <view class="img-class"><img src='/static/images/Trello.png' /></view>
            <view class="item-text">文具</view>
          </van-col>
          <van-col span="6" class="txt-center">
            <view class="badge">
              &nbsp;
            </view>
            <view class="img-class"><img src='/static/images/yhood.png' /></view>
            <view class="item-text">化妆品</view>
          </van-col>
          <van-col span="6" class="txt-center">
            <view class="badge">
              &nbsp;
            </view>
            <view class="img-class"><img src='/static/images/Dribbble.svg' /></view>
            <view class="item-text">交换栏目</view>
          </van-col>
          <van-col span="6" class="txt-center">
            <view class="badge">
              &nbsp;
            </view>
            <view class="img-class"><img src='/static/images/android.png' /></view>
            <view class="item-text">背包</view>
          </van-col>
          <van-col span="6" class="txt-center">
            <view class="badge">
              &nbsp;
            </view>
            <view class="img-class"><img src='/static/images/wifi.png' /></view>
            <view class="item-text" >消息渠道</view>
          </van-col>
          <van-col span="6" class="txt-center">
            <view class="badge">
              &nbsp;
            </view>
            <view class="img-class"><img src="/static/images/blog.png" /></view>
            <view class="item-text" >书籍</view>
          </van-col>
          <van-col span="6" class="txt-center">
            <view class="badge">
              &nbsp;
            </view>
            <view class="img-class"><img src='/static/images/g.png' /></view>
            <view class="item-text" >多功能用品</view>
          </van-col>
        </van-row>
      </view>
      <view class="detail-container">
        <view class="container-desc">猜你喜欢</view>
      </view>
      <view class="recommend">
        <scroll-view scroll-x="true" style="width: 100%"> 
          <view v-for="(item, key) in recommend" :key="item.index" class="recommend_item"> 
            <view class="title"> 
              {{item.title}} 
            </view> 
            <view class="storeNum"> 
              {{item.storeNum}}家商户 
            </view> 
            <image class="bg" :src="item.bg"/> 
          </view> 
        </scroll-view> 
      </view>
      <view class="help-select-contet">
        <view class="help-select-card" v-for="item in goodsList"  :key="item.productId" @tap="toDetail(item)">
          <view class="box">
            <view class="img-box">
              <image mode="" class="help-select-iamge" :src="item.productImage" ></image>
            </view>
            <view class="help-goods-title">{{item.productName}}</view>
            <view class="help-goods-price">
              <view>￥{{item.salePrice}}</view>
              <view class="goods-tag">卷</view>
            </view>
            <view class="comment">共{{item.comment}}条评论</view>
          </view>
        </view>
      </view>

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
  import qs from 'qs'
  import axios from 'axios'
  export default {
    name: 'index',
    data () {
      return {
        goodsList: [],
        images: [
          {
            url: 'http://img1.qunarzz.com/piao/fusion/1801/1a/94428c6dea109402.jpg_640x200_2cf590d8.jpg'
          },
          {
            url: 'http://img1.qunarzz.com/piao/fusion/1802/42/7c92b9a381e46402.jpg_640x200_1cdce2a4.jpg'
          }
        ],
        active: 0,
        recommend: [ 
          { 
          title: "运动户外", 
          storeNum: 112, 
          bg: "https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1564303676&di=fda7a4fb98ce3c636ef1f0dcbf822ae8&src=http://img010.hc360.cn/hb/MTQ1OTg4NTE1MzA0OC0xOTExNDI3NjQx.jpg" 
          }, 
          { 
          title: "珠宝饰品", 
          storeNum: 55, 
          bg: "https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1564303676&di=fda7a4fb98ce3c636ef1f0dcbf822ae8&src=http://img010.hc360.cn/hb/MTQ1OTg4NTE1MzA0OC0xOTExNDI3NjQx.jpg" 
          }, 
          { 
          title: "闲置书籍", 
          storeNum: 231, 
          bg: "https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1564303676&di=fda7a4fb98ce3c636ef1f0dcbf822ae8&src=http://img010.hc360.cn/hb/MTQ1OTg4NTE1MzA0OC0xOTExNDI3NjQx.jpg" 
          }, 
          { 
          title: "家庭聚餐", 
          storeNum: 230, 
          bg: "https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1564303676&di=fda7a4fb98ce3c636ef1f0dcbf822ae8&src=http://img010.hc360.cn/hb/MTQ1OTg4NTE1MzA0OC0xOTExNDI3NjQx.jpg" 
          }, 
          { 
          title: "促销新品", 
          storeNum: 22, 
          bg: "https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1564303676&di=fda7a4fb98ce3c636ef1f0dcbf822ae8&src=http://img010.hc360.cn/hb/MTQ1OTg4NTE1MzA0OC0xOTExNDI3NjQx.jpg" 
          }, 
        ],
        cellBorder: false,
        productId: '201910003',
      }
    },
    onShow () {
      this.active = 0
      this.getGoodsList()
    },
    methods: {
      // 获取商品列表
      getGoodsList () {
        axios.get("/goods").then((response) => {
          let res = response.data;
          if(res.status !== '0') {
            return
          }
          this.goodsList = res.result.list
        })
      },
      onChange (event) {
        this.active = event.mp.detail
        if(this.active === 3 ) {
          wx.redirectTo({
            url: '/pages/profile/profile-detail/main'
          })
        }
        if(this.active === 1 ) {
          wx.redirectTo({
            url: '/pages/category/main'
          })
        }
        if(this.active === 2 ) {
          wx.redirectTo({
            url: '/pages/shopping-cart/list/main'
          })
        }
      },
      // 前往商品详情页面
      toDetail (item) {
        wx.navigateTo({
          url: '/pages/product/detail/main?productId=' + item.productId,
        })
      },
      // 前往分类页面
      toCategory () {
        wx.redirectTo({
          url: '/pages/category/main'
        })
      },
      // 前往搜索页面
      toSearch () {
        wx.navigateTo({
          url: '/pages/search/main'
        })
      },
      // 前往确认订单页面(阻止冒泡)
      toBuy () {
        wx.navigateTo({
          url: '/pages/product/confirm/main'
        })
      },
    }
  }
</script>

<style lang="less" scoped>
  @import 'index';
</style>

<style lang="less">
  .custom-class-cell {
    border-radius: 50rpx !important;
    width: 600rpx !important;
    height: 70rpx !important;
  }
  .custom-class-searchicon {
    margin-top: 10rpx !important;
  }
  .custom-class-appsicon {
    color: #fff !important;
  }
  .custom-class-col {
    border-radius: 20rpx !important;
    background: #F7F7F9 !important;
    margin-left: 20rpx !important;
    color: black;
  }
  .custom-class-col1 {
    margin-left: 10rpx !important;
  }
  .switch {
    height: 300rpx !important;
    margin-top: 300rpx !important;
    background-color: #999 !important;
  }
  .cartIcon {
    margin-right: 15rpx !important;
  }
  .col-class {
    margin-left: 20rpx !important;
    border-radius: 10rpx !important;
    background: #fff !important;
    padding: 5rpx !important;
    border: 2rpx solid #f1f1f1 !important;
    margin-top: 20rpx;
  }
  .col-class:last-child {
    padding-bottom: 150rpx !important;
  }
</style>