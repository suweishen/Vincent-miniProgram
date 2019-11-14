<template>
  <div class="search-bar">
    <div class="search-bar-wrapper">
      <van-icon class="search" size="32rpx" color="#858c96" name="search" />
      <input class="search-bar-input" />
      <van-icon class="clear" size="32rpx" color="#858c96" name="clear" />
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
  .search-bar {
    margin-top: 150rpx;
    padding: 20rpx 20rpx;
    .search-bar-wrapper {
      display: flex;
      align-items: center; //垂直居中
      background: #f5f7f9;
      border-radius: 40rpx;
      height: 80rpx;
      box-sizing: border-box;
      padding: 20rpx 30rpx;
      .search-bar-input {
        flex: 1;
        margin: 0 20rpx;
      }
      .search, .clear {
        display: flex;
        align-items: center;
        height: 100%;
      }
    }
  }
</style>
