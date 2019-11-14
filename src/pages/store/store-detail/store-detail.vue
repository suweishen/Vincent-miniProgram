<template>
  <div>
    <view class="page-top">
      <view>
        <view class="background-img-wrapper">
          <image src="/static/images/store.jpeg" class="background-image" mode="aspectFill"/>
          <view class="linear-wrapper"></view>
        </view>
      </view>
      <van-row custom-class="row-class">
        <van-col span="6" class="txt-center">
          <view style="height: 120rpx;width: 120rpx;margin-left: 20rpx;border-radius: 20rpx;">
            <image src="/static/images/camp.png" class="store-image" mode="aspectFill"/>
          </view>
        </van-col>
        <van-col span="12" class="txt-left">
          <view class="store-name">VINCENT官方旗舰店</view>
          <view class="store-desc">店铺星级</view>
        </van-col>
        <van-col span="6" class="txt-center">
          <view>
            <view>
              <van-button icon="star-o" round size="small" type="danger">收藏</van-button>
            </view>
            <view class="store-desc">711人收藏</view>
          </view>
        </van-col>
      </van-row>
    </view>
    <view class="page-middle">
      <view>
      <van-tabs :tab-class="isArriveTop? 'isArriveTop': 'noneArrive'">
        <van-tab title="精选">
          内容 1
          <van-row custom-class="row-class">
        <van-col span="6" class="txt-center">
          <view style="height: 120rpx;width: 120rpx;margin-left: 20rpx;border-radius: 20rpx;">
            <image src="/static/images/store.jpeg" class="store-image" mode="aspectFill"/>
          </view>
        </van-col>
        <van-col span="12" class="txt-left">
          <view class="store-name">VINCENT官方旗舰店</view>
          <view class="store-desc">店铺星级</view>
        </van-col>
        <van-col span="6" class="txt-center">
          <view>
            <view>
              <van-button icon="star-o" round size="small" type="danger">收藏</van-button>
            </view>
            <view class="store-desc">711人收藏</view>
          </view>
        </van-col>
      </van-row>
      <van-row custom-class="row-class">
        <van-col span="6" class="txt-center">
          <view style="height: 120rpx;width: 120rpx;margin-left: 20rpx;border-radius: 20rpx;">
            <image src="/static/images/store.jpeg" class="store-image" mode="aspectFill"/>
          </view>
        </van-col>
        <van-col span="12" class="txt-left">
          <view class="store-name">VINCENT官方旗舰店</view>
          <view class="store-desc">店铺星级</view>
        </van-col>
        <van-col span="6" class="txt-center">
          <view>
            <view>
              <van-button icon="star-o" round size="small" type="danger">收藏</van-button>
            </view>
            <view class="store-desc">711人收藏</view>
          </view>
        </van-col>
      </van-row>
      <van-row custom-class="row-class">
        <van-col span="6" class="txt-center">
          <view style="height: 120rpx;width: 120rpx;margin-left: 20rpx;border-radius: 20rpx;">
            <image src="/static/images/store.jpeg" class="store-image" mode="aspectFill"/>
          </view>
        </van-col>
        <van-col span="12" class="txt-left">
          <view class="store-name">VINCENT官方旗舰店</view>
          <view class="store-desc">店铺星级</view>
        </van-col>
        <van-col span="6" class="txt-center">
          <view>
            <view>
              <van-button icon="star-o" round size="small" type="danger">收藏</van-button>
            </view>
            <view class="store-desc">711人收藏</view>
          </view>
        </van-col>
      </van-row>
      <van-row custom-class="row-class">
        <van-col span="6" class="txt-center">
          <view style="height: 120rpx;width: 120rpx;margin-left: 20rpx;border-radius: 20rpx;">
            <image src="/static/images/store.jpeg" class="store-image" mode="aspectFill"/>
          </view>
        </van-col>
        <van-col span="12" class="txt-left">
          <view class="store-name">VINCENT官方旗舰店</view>
          <view class="store-desc">店铺星级</view>
        </van-col>
        <van-col span="6" class="txt-center">
          <view>
            <view>
              <van-button icon="star-o" round size="small" type="danger">收藏</van-button>
            </view>
            <view class="store-desc">711人收藏</view>
          </view>
        </van-col>
      </van-row>
      <van-row custom-class="row-class">
        <van-col span="6" class="txt-center">
          <view style="height: 120rpx;width: 120rpx;margin-left: 20rpx;border-radius: 20rpx;">
            <image src="/static/images/store.jpeg" class="store-image" mode="aspectFill"/>
          </view>
        </van-col>
        <van-col span="12" class="txt-left">
          <view class="store-name">VINCENT官方旗舰店</view>
          <view class="store-desc">店铺星级</view>
        </van-col>
        <van-col span="6" class="txt-center">
          <view>
            <view>
              <van-button icon="star-o" round size="small" type="danger">收藏</van-button>
            </view>
            <view class="store-desc">711人收藏</view>
          </view>
        </van-col>
      </van-row>
      <van-row custom-class="row-class">
        <van-col span="6" class="txt-center">
          <view style="height: 120rpx;width: 120rpx;margin-left: 20rpx;border-radius: 20rpx;">
            <image src="/static/images/store.jpeg" class="store-image" mode="aspectFill"/>
          </view>
        </van-col>
        <van-col span="12" class="txt-left">
          <view class="store-name">VINCENT官方旗舰店</view>
          <view class="store-desc">店铺星级</view>
        </van-col>
        <van-col span="6" class="txt-center">
          <view>
            <view>
              <van-button icon="star-o" round size="small" type="danger">收藏</van-button>
            </view>
            <view class="store-desc">711人收藏</view>
          </view>
        </van-col>
      </van-row>
      <van-row custom-class="row-class">
        <van-col span="6" class="txt-center">
          <view style="height: 120rpx;width: 120rpx;margin-left: 20rpx;border-radius: 20rpx;">
            <image src="/static/images/store.jpeg" class="store-image" mode="aspectFill"/>
          </view>
        </van-col>
        <van-col span="12" class="txt-left">
          <view class="store-name">VINCENT官方旗舰店</view>
          <view class="store-desc">店铺星级</view>
        </van-col>
        <van-col span="6" class="txt-center">
          <view>
            <view>
              <van-button icon="star-o" round size="small" type="danger">收藏</van-button>
            </view>
            <view class="store-desc">711人收藏</view>
          </view>
        </van-col>
      </van-row>
        </van-tab>
        <van-tab title="商品">内容 2</van-tab>
      </van-tabs>
      </view>
    </view>
  </div>
</template>

<script>
  export default {
    name: 'store-detail',
    data () {
      return {
        isArriveTop: false,
      }
    },
    // 监听页面滚动离顶部的距离
    onPageScroll: function (e) {
      if (e.scrollTop > 100) {
        this.isArriveTop = true
      }
      console.log(e.scrollTop)
    },
    methods: {

    }
  }
</script>

<style lang="less" scoped>
  @import '../../../asset/css/base';
  @import 'store-detail';
</style>
<style lang="less">
  .row-class {
    height: 150rpx;
    margin-top: 20rpx;
  }
  .isArriveTop {
    position: fixed;
    top: 0;
    z-index: 99;
  }
</style>