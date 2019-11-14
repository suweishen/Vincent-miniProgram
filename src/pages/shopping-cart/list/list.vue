<template>
  <div>
    <view class="page-header" v-if="shoppingCartList.length > 0">
      <view class="editGoods" @click="editGoods">{{editDesc}}</view>
    </view>
    <view class="page-middle">
      <view class="card" v-for="(item, index) in shoppingCartList" :key="item.index">
        <view class="card-title">
          <van-row>
            <van-col span="2">
              <van-checkbox class="checkbox-title" v-model="item.chose" @change="changeCheckBox(item)"></van-checkbox>
            </van-col>
            <van-col span="22">
              <view class="store-name-container">
                  <view><van-icon size="40rpx" name="shop"/></view>
                  <view class="store-name">vincent专卖店</view>
              </view>
            </van-col>
          </van-row>
        </view>
        <view class="card-wrapper">
          <van-row>
            <van-col span="2">
              <van-checkbox class="checkbox" v-model="item.chose" @change="changeCheckBox(item)"></van-checkbox>
            </van-col>
            <van-col span="22">
              <van-card
                thumb-class="card-image-class"
                title-class="card-title-class"
                price-class="card-price-class"
                custom-class="card-class"
                :price="item.salePrice"
                desc="描述信息"  
                :title="item.productName"
                :thumb="item.productImage"
              >
                <div slot="footer">
                  <van-stepper
                    :value="item.productNum"
                    integer
                    min="1"
                    input-width="40px"
                    button-size="32px"
                    @change="qtyChange($event, item)"
                  />
                </div>
              </van-card>
            </van-col>
          </van-row>
        </view>
      </view>
    </view>
    <van-submit-bar
      v-if="shoppingCartList.length > 0"
      :price="countPrice"
      :button-text="buttonText"
      custom-class="submit-bar"
      @submit="onSubmit"
    >
      <van-checkbox custom-class="checkbox-class" v-model="checked" @change="changeAllCheckBox">全选</van-checkbox>
    </van-submit-bar>
    <view class="abnor__box" v-if="shoppingCartList.length <= 0">
      <image class="abnor__image" src='https://s10.mogucdn.com/p2/161213/upload_1h082815bh50k99dajicd53ll1dhl_514x260.png' mode="widthFix"></image>
      <view class="abnor__text title-dark-color">购物车还是空的哦~</view>
    </view>
    <van-tabbar
      :active="active"
      active-color="#00bcd4"
      inactive-color="#000"
      @change="onChange"
      custom-class="tabbar-class"
    >
      <van-tabbar-item icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item icon="apps-o">分类</van-tabbar-item>
      <van-tabbar-item icon="shopping-cart-o">购物车</van-tabbar-item>
      <van-tabbar-item icon="manager-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'list',
  data () {
    return {
      active: 2,
      checked: false, // 全选按钮框
      cards: [
        {
          storename: 'vincent专卖店',
        }
      ],
      shoppingCartList: [],
      userInfo: {},
      isEdit: false,
      editDesc: '编辑商品',
      buttonText: '提交订单',
      totalPrice: 0,
    }
  },
  computed: {
    countPrice: function () {
      let count = 0
      this.shoppingCartList.forEach( item => {
        if (item.chose === true) {
          count += (item.productNum * item.salePrice)
        }
      })
      return count * 100
    }
  },
  onShow () {
    this.initPage()
  },
  methods: {
    initPage () {
      this.shoppingCartList = []
      this.editDesc = '编辑商品'
      this.buttonText = '提交订单'
      this.active = 2
      this.checked = true
      this.userInfo = wx.getStorageSync('userInfo')
      this.getShoppingCartList()
    },
    // 编辑商品时触发
    editGoods () {
      this.isEdit = !this.isEdit
      if (this.isEdit) {
        this.editDesc = '完成'
        this.buttonText = '删除'
      } else {
        this.editDesc = '编辑商品'
        this.buttonText = '提交订单'
      }
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
        this.shoppingCartList = res.result.list
        this.shoppingCartList.forEach( item => {
          item.chose = true
        })
        this.totalPrice *= 100
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
      if(this.active === 0 ) {
        wx.redirectTo({
          url: '/pages/index/main'
        })
      }
    },
    // 改变商品数量（调用接口改变数据库中的数量）
    qtyChange(event, item) {
      item.productNum = event.mp.detail
      let data = {
        userId: this.userInfo.userId,
        productId: item.productId,
        productNum: item.productNum
      }
      axios.post("/users/resetGoodsQty", data).then((responce) =>{
        let res = responce.data
        if(res.status !== '0') {
          return
        }
        console.log('修改成功')
      })
    },
    // 单选按钮改变
    changeCheckBox (item) {
      this.shoppingCartList.forEach( (product, index) => {
        if (product.productId === item.productId) {
          product.chose = !product.chose
          this.$set(this.shoppingCartList, index , product)
        }
      })
      let isInitFalse = this.shoppingCartList.find( item => {
        return item.chose === false
      })
      if (isInitFalse) {
        this.checked = false
      } else {
        this.checked = true
      }
    },
    // 点击全选按钮
    changeAllCheckBox () {
      this.checked = !this.checked
      if (this.checked) {
        this.shoppingCartList.forEach( (item, index) => {
          item.chose = true
          this.$set(this.shoppingCartList, index, item)
        })
      } else {
        this.shoppingCartList.forEach( (item, index) => {
          item.chose = false
          this.$set(this.shoppingCartList, index, item)
        })
      }
    },
    // 点击提交订单/删除按钮
    onSubmit () {
      if (this.shoppingCartList.length <= 0 ) {
        wx.showToast({
          title: '购物车中还没有商品哦~',
          icon: 'none'
        })
        return
      }
      if (this.buttonText === '删除') {
        let productIds = []
        this.shoppingCartList.forEach( item => {
          if (item.chose === true) {
            productIds.push(item.productId)
          }
        })
        let data = {
          userId: this.userInfo.userId,
          productIds: productIds
        }
        axios.post("/users/deleteCartGoods", data).then((responce) =>{
          let res = responce.data
          if(res.status !== '0') {
            return
          }
          wx.showToast({
            title: '更新购物车成功',
            icon: 'none'
          })
        })
        this.initPage()
        return
      }
      let shoppingCartList = this.shoppingCartList.filter( item => item.chose === true)
      console.log('shoppingCartList', shoppingCartList)
      let cartList = JSON.stringify(shoppingCartList);
      wx.navigateTo({
        url: '/pages/product/confirm/main?data=' + cartList + '&isCart=' + 'isCart'
      })
    },
  }
}
</script>

<style lang="less" scoped>
  @import 'list';
</style>

<style lang="less">
  .card-image-class {
    margin-top: 20rpx;
  }
  .card-title-class {
    margin-top: 20rpx;
    font-size: 30rpx;
  }
  .card-price-class {
    margin-top: 20rpx;
  }
  .card-class {
    background-color: #fff !important;
  }
  .submit-bar {
    bottom: 90rpx !important;
  }
  .checkbox-class {
    margin-left: 20rpx !important;
    font-size: 30rpx !important;
  }
  .tabbar-class {
    z-index: 99 !important;
  }
</style>