<template>
  <div>
    <van-cell-group class="group-class">
      <van-field
        clearable
        label="姓名"
        :value="addressDetail.receiverName"
        placeholder="收货人姓名"
        size="large"
        @change="receiverNameChange"
      />

      <van-field
        label="电话"
        :value="addressDetail.receiverPhone"
        placeholder="收货人电话"
        size="large"
        @change="receiverPhoneChange"
      />
      <van-field
        @click="showArea = true"
        label="地区"
        placeholder="选择收货地区"
        size="large"
        :value="addressForm.address"
        disabled
      />
      <van-field
        label="详细地址"
        placeholder="街道门派、楼层房间号等信息"
        size="large"
        :value="addressDetail.receiverAddressDetail"
        @change="receiverAddressDetailChange"
      />
      <van-cell :border="borderfalse" title="设为默认地址" size="large">
        <van-switch @click="changChecked" v-model="checked" />
      </van-cell>
    </van-cell-group>
    <van-button custom-class="add-newAddress" :loading="showLoading" size="large" type="info" @tap="createAddress">保存</van-button>
    <van-button v-if="addressId" custom-class="add-newAddress" size="large" type="danger" @tap="resetAddress">删除</van-button>

    <van-popup
      :show="showArea"
      position="bottom"
      safe-area-inset-top="false"
      safe-area-inset-bottom="true"
    >
      <van-area :area-list="areaList"
        title="地区选择"
        @cancel="closeArea"
        @confirm="selectArea"/>

    </van-popup>

  </div>
</template>

<script>
import axios from 'axios'
import areaList from '@/utils/area'
export default {
  name: 'profile-address-create',
  data () {
    return {
      checked: false,
      borderfalse: false,
      areaList: {},
      showArea: false,
      addressForm: {},
      receiverName: '',
      receiverPhone: '',
      receiverAddressDetail: '',
      userInfo: {},
      addressId: '',
      addressDetail: {},
      isEdit: false,
      showLoading: false,
    }
  },
  onLoad (options) {
    this.addressId = ''
    if(options.addressId) {
      this.isEdit = true
      this.addressId = options.addressId
      console.log(this.addressId)
      wx.setNavigationBarTitle({
        title: '编辑收货地址' 
      })
      this.getAddressDetail()
    }
    this.areaList = areaList
  },
  onShow () {
    this.userInfo = wx.getStorageSync('userInfo')
    this.isEdit = false
    this.addressForm = {}
    this.addressDetail = {}
    this.showLoading = false
  },
  methods: {
    changChecked () {
      this.checked = !this.checked
    },
    selectArea (e) {
      let value = e.mp.detail.values
      this.addressForm.addressArr = value
      this.addressForm.address = value[0].name + '/ ' + value[1].name + '/ ' + value[2].name
      this.addressForm.province = value[0].name
      this.addressForm.city = value[1].name
      this.addressForm.district = value[2].name
      this.showArea = false
    },
    // 收货人改变
    receiverNameChange (e) {
      this.addressDetail.receiverName = e.mp.detail
    },
    // 收货人号码改变
    receiverPhoneChange (e) {
      this.addressDetail.receiverPhone = e.mp.detail
    },
    // 收货人详细地址改变
    receiverAddressDetailChange (e) {
      this.addressDetail.receiverAddressDetail = e.mp.detail 
    },
    // 获取地址详情
    getAddressDetail () {
      let data = {
        addressId: this.addressId
      }
      axios.post("/users/addressDetail", data).then((responce) => {
        let res = responce.data
        if (res.status !== '0') {
          return
        }
        this.addressDetail = res.result.list[0].addressList[0]
        this.addressForm.address = this.addressDetail.receiverProvince + '/ ' + this.addressDetail.receiverCity + '/ ' + this.addressDetail.receiverDict
        this.addressForm.province = this.addressDetail.receiverProvince
        this.addressForm.city = this.addressDetail.receiverCity
        this.addressForm.district = this.addressDetail.receiverDict
        console.log(this.addressDetail)
      })
    },
    // 编辑收货地址
    resetAddress () {
      this.showLoading = true
      let data = {
        id: '5d1878583e6e714cb833575a',
        addressId: this.addressId,
        receiverName: this.addressDetail.receiverName,
        receiverPhone: this.addressDetail.receiverPhone,
        receiverProvince: this.addressForm.province,
        receiverCity: this.addressForm.city,
        receiverDict: this.addressForm.district,
        receiverAddressDetail: this.addressDetail.receiverAddressDetail
      }
      axios.post("/users/resetAddress", data).then((responce) => {
        let res = responce.data
        if (res.status !=='0') {
          return
        }
        this.showLoading = false
        wx.showToast({
          title: '修改成功',
          icon: 'none',
          duration: 2000
        })
        setTimeout(function () {
          wx.redirectTo({
            url: '/pages/profile/profile-address/main'
          })
        },1500)
      })
    },
    // 创建收货地址
    createAddress () {
      if (this.addressId) {
        this.resetAddress()
      } else {
        let data = {
          userId : this.userInfo.userId,
          receiverName : this.receiverName,
          receiverPhone : this.receiverPhone,
          receiverProvince : this.addressForm.province,
          receiverCity : this.addressForm.city,
          receiverDict : this.addressForm.district,
          receiverAddressDetail : this.receiverAddressDetail,
        }
        axios.post("/users/createAddress", data).then((responce) => {
          let res = responce.data
          if(res.status !== '0') {
            wx.showToast({
              title: '创建失败',
              icon: 'none',
              duration: 2000
            })
            return
          }
          wx.showToast({
            title: '创建成功',
            icon: 'none',
            duration: 2000
          })
          wx.navigateBack({
            delta: 1
          })
        })
      }
    },
  }
}
</script>

<style lang="less" scoped>
  @import 'profile-address-create';
</style>

<style lang="less">
  .add-newAddress {
    margin: 40rpx 20rpx 0 20rpx;
    width: 710rpx !important;
    border-radius: 20rpx !important;
  }
</style>