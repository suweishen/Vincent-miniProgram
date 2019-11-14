<template>
  <div>
    <view class="order-status-wrapper">
      <van-rol span="6">
        <van-icon class="order-status-icon" size="45rpx" name="warning-o" />
      </van-rol>
      <van-rol span="16">
        <view class="order-status-icon">
          <view>
          <view class="order-status">已取消</view>
          <view class="order-status-desc">取消原因：超时未支付</view>
          </view>
        </view>
      </van-rol>
    </view>
    <view class="order-address-wrapper">
      <van-rol span="6">
        <van-icon class="order-address-icon" size="45rpx" name="location" />
      </van-rol>
      <van-rol span="16">
        <view class="order-address-icon">
          <view>
          <view class="order-address-name">{{addressInfo.receiverName}}&nbsp;{{addressInfo.receiverPhone}}</view>
          <view class="order-address-desc">{{addressInfo.receiverProvince}}{{addressInfo.receiverCity}}{{addressInfo.receiverDict}}{{addressInfo.receiverAddressDetail}}</view>
          </view>
        </view>
      </van-rol>
    </view>

    <view class="page-middle">
      <view v-for="item in productList" :key="item.index">
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
                <view class="goods-remark">{{item.specs[0].type || '标准版'}}</view>
                <view class="price-num-container">
                  <view class="goods-price">{{item.salePrice}}</view>
                  <view class="stepper">x{{item.productNum}}</view>
                </view>
                <view class="tips-container"><van-icon class="warning-icon" size="38rpx" color="#00bcd4" name="warning-o"/>&nbsp;购买后请仔细检查(质量问题可退货)</view>
              </view>
            </view>
          </view>

          <view class="remark">
            <van-cell-group>
              <van-field
                label="店铺备注"
                type="textarea"
                placeholder="选填，给商家留言"
                :value="remark"
              />
            </van-cell-group>
          </view>
        </view>
      </view>

      <view class="order-desc-wrapper">
        <view class="order-desc-crumb">
          <view class="crumb-title">订单编号：</view>
          <view>104081104462</view>
        </view>
        <view class="order-desc-crumb">
          <view class="crumb-title">下单时间：</view>
          <view>{{orderDetail.createTime}}</view>
        </view>
        <view class="order-desc-crumb">
          <view class="crumb-title">支付方式：</view>
          <view>在线支付</view>
        </view>
        <view class="order-desc-crumb border-bottom-solid">
          <view class="crumb-title">配送方式：</view>
          <view>普通快递</view>
        </view>
        <view class="order-desc-crumb border-bottom-solid">
          <view class="crumb-title">纸质发票：</view>
          <view>将由商家开具纸质发票</view>
        </view>
        <view class="pay-wrapper">
          <view class="pay-container">
            <view class="pay-left">商品金额</view>
            <view class="pay-right">￥{{totalPrice}}</view>
          </view>
          <view class="pay-container1">
            <view class="pay-left">运费</view>
            <view class="pay-right">+￥0.00</view>
          </view>
          <view class="pay-amount">
            <view>实付金额:&nbsp;</view>
            <view class="totle-price">￥{{totalPrice}}</view>
          </view>
        </view>
      </view>
    </view>

    <view class="page-bottom">
      <view class="create-btn">
        <van-goods-action>
          <van-goods-action-button custom-class="btn-custom-class-2" type="default" :size="small" text="删除订单"></van-goods-action-button>
          <van-goods-action-button custom-class="btn-custom-class-2" type="default" size="small" text="分享赚积分"></van-goods-action-button>
          <van-goods-action-button custom-class="btn-custom-class-2" type="info" size="small" text="再次购买"></van-goods-action-button>
        </van-goods-action>
      </view>
    </view>
  </div>
</template>

<script>
export default {
  name: 'detail',
  data () {
    return {
      orderDetail: {},
      addressInfo: {},
      productList: [],
      totalPrice: 0,
      remark: '暂无备注信息', // 若无备注则提示则显示
    }
  },
  onLoad (options) {
    if (options.data) {
      this.orderDetail = JSON.parse(options.data)
      console.log('this.orderDetail', this.orderDetail)
    }
  },
  onShow () {
    this.totalPrice = 0 // 每次页面加载都重置
    this.init()
  },
  methods: {
    init () {
      this.addressInfo = this.orderDetail.addressList[0]
      this.productList = this.orderDetail.dtlList
      this.productList.forEach( item => {
        this.totalPrice += (item.salePrice * item.productNum)
      })
    },
  }
}
</script>

<style lang="less" scoped>
  @import 'detail';
</style>

<style lang="less">
  .btn-custom-class-2 {
    margin: 20rpx !important;
    border-radius: 20rpx !important;
    width: 150rpx !important;
    font-size: 26rpx !important;
    height: 60rpx !important;
    line-height: 60rpx !important;
  }
</style>