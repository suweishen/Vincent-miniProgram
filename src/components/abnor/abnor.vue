<template>
  <div>
    <view class="abnor">
      <view class="abnor__box">
        <image class="abnor__image" v-if="image" :src="image" mode="widthFix"></image>
        <view class="abnor__text title-dark-color" v-if="title">{{title}}</view>
        <view class="abnor__tip tips-color" v-if="tip">{{tip}}</view>
        <view class="abnor__btn button-red" v-if="button" @click="emitAbnorTap">{{button}}</view>
        <view class="abnor__btn button-red" v-if="bottomBtn" @click="emitbottomBtn">{{bottomBtn}}</view>
      </view>
    </view>
  </div>
</template>

<script>
  import Types from './config'
  export default {
    name: 'card',
    props: {
      type: {
        type: String,
        value: ''
      },
      image: {
        type: String,
        value: ''
      },
      title: {
        type: String,
        value: ''
      },
      tip: {
        type: String,
        value: ''
      },
      button: {
        type: String,
        value: ''
      },
      bottomBtn: {
        type: String,
        value: ''
      }
    },
    data () {
      return {}
    },
    created () {
      this.getData()
    },
    onShow () {
      this.getData()
    },
    methods: {
      emitAbnorTap () {
        this.$emit('abnortap')
      },
      emitbottomBtn () {
        this.$emit('emitbottomBtn')
      },
      getData () {
        let type = this.type
        if (type && Types[type]) {
          this.image = this.image || Types[type].image
          this.title = this.title || Types[type].title
          this.button = this.button || Types[type].button
          this.tip = this.tip || Types[type].tip
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "abnor";
</style>
