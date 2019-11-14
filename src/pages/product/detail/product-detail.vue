<template>
  <div>
    <swiper class="swiper" indicator-dots="true" autoplay="true" interval="5000" duration="1000">
      <block>
        <swiper-item>
          <image :src="goodsDetail.productImage" class="slide-image" mode="aspectFill"/>
        </swiper-item>
      </block>
    </swiper>
    <view class="page-middle">
      <view class="middle-1-container">
        <view class="goods-price">
          ￥{{goodsDetail.salePrice}}
          <van-tag custom-class="price-tag-left" round type="danger">火热促销</van-tag>
          <van-tag custom-class="price-tag-left" round type="danger">限量发售</van-tag>
        </view>
        <view class="goods-price-delete">价格￥530</view>
      </view>
      <view class="middle-2-container">
        <view>
          <view class="goods-title">{{goodsDetail.productName}}</view>
        </view>
        <view class="rate-container">
          <view class="rate-desc">好评指数</view>
          <view>
            <van-rate
              allow-half
              :value="value"
              icon="like"
              color="#f44"
              void-icon="like-o"
              void-color="#eee"
              bind:change="onChange"
            />
          </view>
        </view>
      </view>

      <van-cell-group custom-class="cell-group-class">
        <van-field disabled label="服务" icon="arrow" placeholder="购物无风险·7天无理由" @click="show = true"/>
        <van-field disabled label="选择" icon="arrow" :placeholder="choseGoodsTitle !== '' && choseGoodsNum !== '0' ? choseDetail  : '选择 套餐 数量'" @click="showChose = true"/>
        <van-field disabled label="参数" icon="arrow" placeholder="品牌 版本..." @click="showParameter = true"/>
      </van-cell-group>

      <view>
        <view class="comment-wrapper" @click="toCommentList">
          <view class="comment-left">
            <view class="left-title">评论区</view>
            <view class="left-desc">了解商品更真实的一面</view>
          </view>
          <view class="comment-right">
            <view class="right-title">共1600+条评论</view>
            <view class="right-icon"><van-icon name="arrow" /></view>
          </view>
        </view>
        <view class="comment-desc-wrapper" v-for="item in commentList" :key="item.index">
          <view class="comment-list-wrapper">
            <view class="list-left">
              <view class="avatar-container"><img class="avatar-img" :src="item.img" /></view>
              <view class="account-name">{{item.accountName}}</view>
            </view>
            <view class="list-right">{{item.date}}</view>
          </view>
          <view class="comment-desc">{{item.desc}}</view>
          <view class="comment-img-wrapper">
            <view class="comment-container-wrapper" v-for="(item, key) in commentImage" :key="item.key">
              <view class="img-container"><img class="comment-img" :src="item.img" /></view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 商品服务弹窗 -->
    <van-popup
      :show="show"
      position="bottom"
      custom-class="popup-class"
      overlay="false"
      @close="onClose"
    >
      <view class="popup-title">基础服务</view>
      <view class="order-risk">
        <van-icon color="#00bcd4" name="passed" />&nbsp;订单险
        <view class="order-risk-desc">保险公司全程担保赔付该商品每笔交易的售后</view>
      </view>
      <view class="return-goods">
        <van-icon color="#00bcd4" name="passed" />&nbsp;7天无理由
        <view class="return-goods-desc">满足7天无理由退换货申请的前提下，包邮商品需要买家承担退货邮费，非包邮商品需要买家承担发货和退货邮费</view>
      </view>
      <van-button custom-class="popup-btn" @click="popupBasicServer">完成</van-button>
    </van-popup>

    <!-- 商品参数弹窗 -->
    <van-popup
      :show="showParameter"
      position="bottom"
      custom-class="popup-class"
      overlay="false"
      @close="showParameter = false"
    >
      <view class="popup-title">商品参数</view>
      <view class="order-risk">
        <van-icon color="#00bcd4" name="passed" />&nbsp;商品名称
        <view class="order-risk-desc">{{goodsDetail.productName}}</view>
      </view>
      <view class="return-goods">
        <van-icon color="#00bcd4" name="passed" />&nbsp;质量保证
        <view class="return-goods-desc">店家承诺，商品皆为正品，拒绝以次充正的现象</view>
      </view>
      <van-button custom-class="popup-btn" @click="popupBasicServer">完成</van-button>
    </van-popup>

    <van-popup
      :show="showChose"
      position="bottom"
      custom-class="popup-class"
      overlay="false"
      @close="onClose"
    >
      <van-row>
        <van-col span="6">
          <view class="left-img-container">
            <img class="chose-image" :src='goodsDetail.productImage' />
          </view>
        </van-col>
        <van-col span="14">
          <view>
            <view class="goods-price">￥{{goodsDetail.salePrice}}</view>
            <view class="goods-desc-wrapper">
              <view class="goods-type">已选 {{categoryType}} {{goodsNum}}件</view>
              <view class="goods-stock" v-if="showStock">库存 {{goodsDetail.specs[key].stock}}</view>
            </view>
          </view>
        </van-col>
        <van-col span="4">
          <van-icon custom-class="cross-icon" name="cross" size="50rpx" @tap="showChose = false" />
        </van-col>
      </van-row>
      
      <view class="goods-category">
        <van-row>
          <van-col span="6" offset="1" v-for="item in goodsDetail.specs" :key="item.key">
            <van-button size="small" :type="categoryType === item.type ? 'danger' : 'default'" @tap="choseGoodsCategory(item)">{{item.type}}</van-button>
          </van-col>
        </van-row>
      </view>

      <!-- 弹出层 -->
      <van-row custom-class="stepper-container">
        <van-col span="16">
          <view class="goods-num">数量</view>
        </van-col>
        <van-col span="8">
          <van-stepper
            :value="goodsNum"
            custom-class="stepper-class"
            integer
            min="0"
            :max="goodsDetail.specs[key].stock"
            @change="qtyChange($event)"
          />
        </van-col>
      </van-row>
      <van-button custom-class="popup-btn" @click="popupShowChose()">完成</van-button>
    </van-popup>

    <view class="page-bottom">
      <van-goods-action class="goods-action-wrapper">
        <van-goods-action-icon
          icon="shop-o"
          text="店铺"
          bind:click="onClickIcon"
        />
        <van-goods-action-icon
          icon="cart-o"
          text="购物车"
          :info="shoppingCartListLength"
          @click="toShoppingCart"
        />
        <van-goods-action-button
          text="加入购物车"
          type="warning"
          @click="addCart"
          custom-class="btn-left"
        />
        <van-goods-action-button
          text="立即购买"
          @click="toBuy"
          custom-class="btn-right"
        />
      </van-goods-action>
    </view>
  </div>
</template>

<script>
import qs from 'qs'
import axios from 'axios'
export default {
  name: 'product-detail',
  data () {
    return {
      goodsDetail: {},
      commentImage: [
        {
          img: '/static/images/1.jpg'
        },
        {
          img: '/static/images/2.jpg'
        },
        {
          img: '/static/images/pingheng.jpg'
        }
      ],
      commentList: [
        {
          accountName: 'vincent',
          img: '/static/images/user.png',
          date: '2019-08-24',
          desc: '昨天下的单，今天中午就到了，很给力呀。一直喜欢用vincent牌香水，整个人香喷喷的，感觉特别好,五行好评哦，继续努力吧'
        },
        {
          accountName: 'vincent',
          img: '/static/images/user.png',
          date: '2019-08-24',
          desc: '昨天下的单，今天中午就到了，很给力呀。一直喜欢用vincent牌香水，整个人香喷喷的，感觉特别好,五行好评哦，继续努力吧'
        }
      ],
      value: 4.5,
      show: false,
      showChose: false,
      categoryType: '',
      categoryTitle: '',
      goodsNum: '0',
      choseGoodsTitle: '',
      choseGoodsNum: '0',
      choseDetail: '',
      productId: '',
      token: '',
      key: 0,
      showStock: false,
      choseGoodsDeatil: [],
      showParameter: false, // 参数弹窗
      userInfo: {},
      shoppingCartListLength: 0,
    }
  },
  onLoad (options) {
    if (options) {
      this.productId = options.productId
    }
  },
  onShow () {
    this.userInfo = wx.getStorageSync('userInfo')
    this.token = wx.getStorageSync('token')
    this.getGoodsDetail(this.productId)
    this.getShoppingCartList()
    this.choseGoodsDeatil = []
    this.choseGoodsNum = '0'
    this.categoryType = ''
    this.goodsNum = '0'
  },
  methods: {
    // 前往购物车列表
    toShoppingCart () {
      wx.redirectTo({
        url: '/pages/shopping-cart/list/main'
      })
    },
    // 购物车列表
    getShoppingCartList () {
      let data = {
        userId: this.userInfo.userId
      }
      axios.post("/users/getCartList", data).then((responce) => {
        let res = responce.data
        if(res.status !== '0') {
          return
        }
        this.shoppingCartListLength = res.result.list.length
      })
    },
    onClose () {
      this.show = false
    },
    popupBasicServer () {
      this.show = false
      this.showParameter = false
    },
    // 获取商品列表
    getGoodsDetail (productId) {
      let data = {
        productId: productId
      }
      axios.post("/goods/detail",data).then((response) => {
          let res = response.data;
          if(res.status !== '0') {
            return
          }
          this.goodsDetail = res.result.list[0]
          console.log(this.goodsDetail)
        })
    },
    // 加入购物车
    addCart () {
      if (this.choseGoodsNum === '0' && this.categoryType === '') {
        this.showChose = true
        wx.showToast({
          title: '您还未选择商品',
          icon: 'none'
        })
        return 
      }
      if (this.token === '') {
        wx.showToast({
          title: '您还未登录哦~',
          icon: 'none',
          duration: 2000
        })
        setTimeout( function () {
          wx.reLaunch({
          url: '/pages/login/log/main'
          })
        },2000)
        return
      }
      let data = {
        productId: this.productId
      }
      axios.post("/goods/addCart",data).then((response) => {
        let res = response.data;
        if (res.status !== '0') {
          return
        }
        if (res.result.count !== 0) {
          wx.showToast({
            title: '加入购物车成功',
            icon: 'none'
          })
          this.getShoppingCartList()
        } else {
          wx.showToast({
            title: '该商品已在购物车中',
            icon: 'none'
          })
        }
      })
    },
    // 选择商品套餐
    choseGoodsCategory (item) {
      this.categoryType = item.type
      this.key = item.key
      this.showStock = true
    },
    // 改变选购商品的数量
    qtyChange (event) {
      this.goodsNum = event.mp.detail
    },
    //
    popupShowChose () {
      this.choseGoodsTitle = this.categoryType
      this.choseGoodsNum = this.goodsNum
      if (this.choseGoodsNum === '0') {
        wx.showToast({
          title: '您还未选择数量',
          icon: 'none'
        })
        return 
      }
      this.showChose = false
      this.choseDetail = '已选 ' + this.choseGoodsTitle + ' ' + this.choseGoodsNum + '件'
    },
    // 前往订单列表
    toCommentList () {
      wx.navigateTo({
        url: '/pages/product/commentList/main'
      })
    },
    // 前往确认订单页面
    toBuy () {
      if (this.choseGoodsNum === '0' && this.categoryType === '') {
        this.showChose = true
        wx.showToast({
          title: '您还未选择商品',
          icon: 'none'
        })
        return 
      }
      this.choseGoodsDeatil.push(this.goodsDetail)
      this.choseGoodsDeatil.forEach(item => {
        item.productType = this.choseGoodsTitle
        item.productNum = this.choseGoodsNum
      });
      var data = JSON.stringify(this.choseGoodsDeatil);
      wx.navigateTo({
        url: '/pages/product/confirm/main?data=' + data
      })
    }
  }
}
</script>

<style lang="less" scoped>
  @import 'product-detail';
</style>

<style lang="less">
  .btn-left {
    border-top-left-radius: 50rpx !important;
    border-bottom-left-radius: 50rpx !important;
  }
  .btn-right {
    border-top-right-radius: 50rpx !important;
    border-bottom-right-radius: 50rpx !important;
  }
  .price-tag-left {
    margin-left: 20rpx !important;
  }
  .cell-group-class {
    border-top: 10rpx solid #f5f5f5 !important;
    border-bottom: 20rpx solid #f5f5f5 !important;
  }
  .popup-btn {
    width: 750rpx !important;
    background: linear-gradient(to left, #00bcd4 0%, #03c1df 25%, #0392a5 100%) !important;
    color: #fff !important;
  }
  .popup-class {
    border-top-left-radius: 10rpx !important;
    border-top-right-radius: 10rpx !important;
    overflow: visible !important;
  }
  .cross-icon {
    position: absolute !important;
    right: 20rpx;
    color: #666 !important;
    margin-top: 10rpx !important;
  }
  .stepper-class {
    position: absolute !important;
    right: 20rpx;
  }
  .stepper-container {
    padding-bottom: 80rpx !important;
  }
</style>

