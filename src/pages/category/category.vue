<template>
  <div>
    <view class="page-top">
      <van-search
        placeholder="请输入搜索关键词"
        shape="round"
        disabled
        @tap="toSearch"
      />
    </view>

    <view class="page-middle">
      <view class="middle-left">
        <scroll-view scroll-y style="height: 750rpx; width: 180rpx;">
          <view class="left-title-container" v-for="(item, index) in list" :key="index" :class="[item.key === key ? 'active' : '']" @tap="categoryTitle(item)">
            <view class="left-item">{{item.title}}</view>
          </view>
        </scroll-view> 
      </view>

      <view>
        <scroll-view scroll-y style="height: 750rpx; width: 180rpx;">
        </scroll-view> 
      </view>

      <view class="middle-right">
        <view class="top-image">
          <image class="image" src="/static/images/seven.jpg" />
        </view>
        <view class="hot-search-wrapper">
          <view class="hot-search">热门搜索</view>
          <van-row>
            <van-col span="8" class="txt-center" v-for="item in categoryList" :key="item.index">
              <view class="badge">
                &nbsp;
              </view>
              <view class="img-class"><img class="image-class" :src='item.categoryImage' /></view>
              <view class="item-text">{{item.categoryText}}</view>
            </van-col>
          </van-row>
        </view>
        <categoryProduct
        categoryTitle="电子设备"
        :value="categoryList"
      />
      </view>
      <!-- <categoryProduct
        categoryTitle="电子设备"
        :value="categoryList"
        topImage="/static/images/seven.jpg"
      /> -->
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
import categoryProduct from '@/components/categoryProduct'
export default {
  name: 'category',
  components: {
    categoryProduct,
  },
  data () {
    return {
      active: 1,
      categoryList: [
        {
          categoryImage: '/static/images/camp.png',
          categoryText: '电子设备'
        },
        {
          categoryImage: '/static/images/Trello.png',
          categoryText: '文具'
        },
        {
          categoryImage: '/static/images/yhood.png',
          categoryText: '化妆品'
        },
        {
          categoryImage: '/static/images/Dribbble.svg',
          categoryText: '交换栏目'
        },
        {
          categoryImage: '/static/images/android.png',
          categoryText: '背包'
        },
        {
          categoryImage: '/static/images/wifi.png',
          categoryText: '消息渠道'
        },
        {
          categoryImage: '/static/images/blog.png',
          categoryText: '书籍'
        },
        {
          categoryImage: '/static/images/g.png',
          categoryText: '多功能用品'
        },
      ],
      list: [
        {
          key: 0,
          title: '热搜推荐'
        },
        {
          key: 1,
          title: '运动户外'
        },
        {
          key: 2,
          title: '珠宝饰品'
        },
        {
          key: 3,
          title: '闲置书籍'
        }
      ],
      key: 0,
    }
  },
  onShow () {
    this.active = 1
    this.key = 0
  },
  methods: {
    onChange (event) {
      this.active = event.mp.detail
      if(this.active === 0 ) {
        wx.redirectTo({
          url: '/pages/index/main'
        })
      }
      if(this.active === 3 ) {
        wx.redirectTo({
          url: '/pages/profile/profile-detail/main'
        })
      }
    },
    categoryTitle (item) {
      console.log(item)
      this.key = item.key
    },
    // 前往搜索页面
    toSearch () {
      wx.navigateTo({
        url: '/pages/search/main'
      })
    },
  }
}
</script>

<style lang="less" scoped>
  @import 'category';
</style>
