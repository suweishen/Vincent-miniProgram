<template>
  <div>
    <view class="top-image" v-if="topImage">
      <image class="image" :src="topImage" />
    </view>
    <view class="hot-search-wrapper">
      <view class="hot-search">{{categoryTitle}}</view>
      <van-row>
        <van-col span="8" class="txt-center" v-for="item in value" :key="item.index">
          <view class="badge">
            &nbsp;
          </view>
          <view class="img-class"><img class="image-class" :src='item.categoryImage' /></view>
          <view class="item-text">{{item.categoryText}}</view>
        </van-col>
      </van-row>
    </view>
  </div>
</template>

<script>
export default {
  props: {
    categoryTitle: String, //类型名
    value: Array,
    topImage: String, // 顶部图片
  },
}
</script>

<style lang="less">
@import '../asset/css/base';
  .top-image {
    width: 530rpx;
    height: 180rpx;
    .image {
      width: 100%;
      height: 100%;
    }
  }
  .hot-search-wrapper {
    .hot-search {
      margin-top: 20rpx;
      font-weight: 500;
    }
    .img-class {
      display: flex;
      justify-content: center;
      margin-left: 55rpx;
      height: 80rpx;
      width: 80rpx;
      .image-class {
        display: flex;
        justify-content: center;
        height: 100%;
        width: 100%;
      }
    }
  }
</style>