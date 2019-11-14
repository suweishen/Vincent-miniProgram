<template>
  <div>
    <TagGroup
      :value="commentList"
      @onTagClick="onClickCategory"
    />
    <view class="comment-list-wrapper page-wrapper">
      <view class="comment-container">
        <view class="container-left">
          <image class="user-img" mode="aspectFill" src="/static/images/user.png"></image>
        </view>
        <view class="container-right">
          <view class="avatar-desc-class">su.Vincent</view>
          <view class="desc-class">2019-09-26 颜色分类:黑色</view>
          <view class="comment-desc">物流很给给力啊，哈哈哈，下班直接就是哈哈哈哈，嘻嘻嘻哈哈哈哈哈我哈哈哈哈</view>
          <view class="comment-image-wrapper">
            <view class="image-container">
              <image class="comment-img" mode="aspectFill" src="/static/images/15.jpg"></image>
            </view>
            <view class="image-container">
              <image class="comment-img" mode="aspectFill" src="/static/images/15.jpg"></image>
            </view>
            <view class="image-container">
              <image class="comment-img" mode="aspectFill" src="/static/images/15.jpg"></image>
            </view>
            <view class="image-container">
              <image class="comment-img" mode="aspectFill" src="/static/images/15.jpg"></image>
            </view>
          </view>
          <view style="display: flex;">
            <view class="desc-class">浏览 382次</view>
            <view class="desc-class thumps"><van-icon name="thumb-circle-o" size="34rpx" />3</view>
          </view>
        </view>
      </view>

      <view class="comment-container">
        <view class="container-left">
          <image class="user-img" mode="aspectFill" src="/static/images/user.png"></image>
        </view>
        <view class="container-right">
          <view class="avatar-desc-class">su.Vincent</view>
          <view class="desc-class">2019-09-26 颜色分类:黑色</view>
          <view class="comment-desc">物流很给给力啊，哈哈哈，下班直接就是哈哈哈哈，嘻嘻嘻哈哈哈哈哈我哈哈哈哈</view>
          <view class="comment-image-wrapper">
            <view :class="image.length > 1 && image.length < 3 ? 'image-container-less3' : 'image-container'" v-for="item in image" :key="item.index">
              <image class="comment-img" mode="aspectFill" :src="item.src"></image>
            </view>
          </view>
          <view style="display: flex;">
            <view class="desc-class">浏览 382次</view>
            <view class="desc-class thumps"><van-icon name="thumb-circle-o" size="34rpx" />3</view>
          </view>
        </view>
      </view>
    </view>
  </div>
</template>

<script>
import TagGroup from '@/components/TagGroup'
export default {
  name: 'product-commentList',
  components: {
    TagGroup
  },
  data () {
    return {
      commentList: [
        '全部',
        '最新',
        '好评(110)',
        '中评(10)',
        '差评(0)'
      ],
      image: [
        {
          src: "/static/images/15.jpg",
        },
        {
          src: "/static/images/15.jpg",
        }
      ]
    }
  },
  methods: {
    onClickCategory(item) {
      console.log(item)
    },
  }
}
</script>

<style lang="less" scoped>
  @import 'product-commentList';
</style>