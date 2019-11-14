var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  "userId":String,
  "userName":String,
  "accountName":String,
  "userPhone":String,
  "userPwd":String,
  "orderList": [
    {
      "orderId":String,
      "totalPrice":Number,
      "addressList":Array,
      "dtlList":Array,
      "comment":String,
      "createTime":String
    }
  ],
  "cartList": [
    {
      "productId":String,
      "productName":String,
      "salePrice":Number,
      "productImage":String,
      "checked":String,
      "productNum":Number
    }
  ],
  "addressList": [
    {
      "addressId": String,
      "receiverName":String,
      "receiverPhone":String,
      "receiverProvince":String,
      "receiverCity":String,
      "receiverDict":String,
      "receiverAddressDetail":String
    }
  ]
});

module.exports = mongoose.model("User",userSchema);