var express = require('express');
var router = express.Router();
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user');
// 连接数据库
mongoose.connect('mongodb://127.0.0.1:27017/dumall');

mongoose.connection.on("connected", function () {
  console.log("MongoDB connected success.")
});

mongoose.connection.on("error", function () {
  console.log("MongoDB connected fail.")
});

mongoose.connection.on("disconnected", function () {
  console.log("MongoDB connected disconnected.")
});

// 登录账号
router.post("/", function (req, res, next) {
  let userName = req.body.userName;
  let userPwd = req.body.userPwd;
  User.find({userName: userName,userPwd: userPwd},function (err, doc) {
    if(err) {
      res.json({
        status: '1',
        msg: err.message
      });
    }else {
      res.json({
        status: '0',
        msg: '',
        result: {
          count: doc.length,
          list: doc,
          token: 'check'
        }
      })
    }
  })
});

// 收货地址列表
router.post("/addressList", function(req, res ,next) {
  let userId = req.body.userId;
  User.find({userId: userId},function (err, doc) {
    if(err) {
      res.json({
        status: '1',
        msg: err.message
      });
    }else {
      res.json({
        status: '0',
        msg: '',
        result: {
          count: doc.length,
          list: doc[0].addressList,
        }
      })
      console.log(doc)
    }
  })
});

// 收货地址详情
router.post("/addressDetail", function (req, res, next) {
  let addressId = req.body.addressId;
  // student.find({'courses':{$elemMatch:{'classRoom':'1001','name':'复变函数'}}},{'courses':{$elemMatch:{'classRoom':'1001','name':'复变函数'}}})
  User.find({addressList:{$elemMatch:{'addressId': addressId}}},{addressList:{$elemMatch:{'addressId': addressId}}},function (err, doc) {
    if(err) {
      res.json({
        status: '1',
        msg: err.message
      });
    }else {
      res.json({
        status: '0',
        msg: '',
        result: {
          count: doc.length,
          list: doc
        }
      })
    }
  })
});

// 添加收货地址
router.post("/createAddress", function (req, res, next) {
  let userId = req.body.userId;
  let receiverName = req.body.receiverName;
  let receiverPhone = req.body.receiverPhone;
  let receiverProvince = req.body.receiverProvince;
  let receiverCity = req.body.receiverCity;
  let receiverDict = req.body.receiverDict;
  let receiverAddressDetail = req.body.receiverAddressDetail;
  User.update({
    userId: userId
  }, {
    '$push': {
      addressList: {
        receiverName: receiverName,
        receiverPhone: receiverPhone,
        receiverProvince: receiverProvince,
        receiverCity: receiverCity,
        receiverDict: receiverDict,
        receiverAddressDetail: receiverAddressDetail
      }
    }
  }, function(err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message
      });
    } else {
      res.json({
        status: '0',
        msg: '',
        result: {
          count: doc.length,
          list: doc
        }
      })
    }
  });
});

// 修改收货地址
router.post("/resetAddress", function (req, res, next) {
  let addressId = req.body.addressId
  let receiverName = req.body.receiverName;
  let receiverPhone = req.body.receiverPhone;
  let receiverProvince = req.body.receiverProvince;
  let receiverCity = req.body.receiverCity;
  let receiverDict = req.body.receiverDict;
  let receiverAddressDetail = req.body.receiverAddressDetail;
  User.update({userId: '1000000077', 'addressList.addressId': addressId},
    {$set:{
      "addressList.$.receiverName": receiverName ,
      "addressList.$.receiverPhone": receiverPhone ,
      "addressList.$.receiverProvince": receiverProvince ,
      "addressList.$.receiverCity": receiverCity ,
      "addressList.$.receiverDict": receiverDict ,
      "addressList.$.receiverAddressDetail": receiverAddressDetail ,
    }},function (err, doc) {
    if(err) {
      res.json({
        status: '1',
        msg: err.message
      });
    }else {
      res.json({
        status: '0',
        msg: '',
        result: {
          count: doc.length,
          list: doc
        }
      })
    }
  })
});

// 添加订单评价
router.post("/orderComment", function (req, res, next) {
  let commentDesc = req.body.commentDesc
  User.update({userId: '1000000077', 'orderList.orderId': '10002'},
    {$set:{
      "orderList.$.comment": commentDesc,
    }},function (err, doc) {
    if(err) {
      res.json({
        status: '1',
        msg: err.message
      });
    }else {
      res.json({
        status: '0',
        msg: '',
        result: {
          count: doc.length,
          list: doc
        }
      })
    }
  })
});

// 添加购物订单
router.post("/createOrder", function (req, res, next) {
  let userId = req.body.userId;
  let orderId = '10001';
  let totalPrice = req.body.totalPrice;
  let comment = '';
  let addressList = req.body.addressList;
  let dtlList = req.body.dtlList;
  let createTime = req.body.createTime;
  User.update({
    userId: userId
  }, {
    '$push': {
      orderList: {
        userId: userId,
        orderId: orderId,
        totalPrice: totalPrice,
        addressList: addressList,
        dtlList: dtlList,
        comment: comment,
        createTime: createTime
      }
    }
  }, function(err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message
      });
    } else {
      res.json({
        status: '0',
        msg: '',
        result: {
          count: doc.length,
          list: doc
        }
      })
    }
  });
});

// 订单列表
router.post("/orderList", function(req, res ,next) {
  let userId = req.body.userId;
  User.find({userId: userId},function (err, doc) {
    if(err) {
      res.json({
        status: '1',
        msg: err.message
      });
    }else {
      res.json({
        status: '0',
        msg: '',
        result: {
          count: doc.length,
          list: doc[0].orderList,
        }
      })
      console.log(doc)
    }
  })
});

// 修改密码
router.post("/resetPwd", function (req, res, next) {
  let id = req.body.id
  let userPwd = req.body.userPwd
  User.find({_id: id},function (err, doc) {
    if(err) {
      res.json({
        status: '1',
        msg: err.message
      });
    }else {
      User.update({userPwd: userPwd},function (err, doc) {
        if(err) {
          res.json({
            status: '1',
            msg: err.message
          });
        }else {
          res.json({
            status: '0',
            msg: '',
            result: {
              count: doc.length,
              list: doc
            }
          })
        }
      })
    }
  })
});

// 修改购物车商品数量
router.post("/resetGoodsQty", function (req, res, next) {
  let userId = req.body.userId;
  let productId = req.body.productId;
  let productNum = req.body.productNum;
  User.update({userId: userId, 'cartList.productId': productId},
    {$set:{
      "cartList.$.productNum": productNum,
    }},function (err, doc) {
    if(err) {
      res.json({
        status: '1',
        msg: err.message
      });
    }else {
      res.json({
        status: '0',
        msg: '',
        result: {
          count: doc.length,
          list: doc
        }
      })
    }
  })
});

// 删除购物车中的商品
router.post("/deleteCartGoods", function (req, res, next) {
  let userId = req.body.userId;
  let productIds = req.body.productIds;
  for (var i = 0; i < productIds.length; i++) {
    User.update({userId: userId},
      {$pull:{
        "cartList": {productId: productIds[i]},
      }},function (err, doc) {
      if(err) {
        console.log('报错了')
      }else {
        console.log('success')
      }
    })
    res.json({
      status: '0',
      msg: '',
    })
  }
});

// 查询购物车列表
router.post("/getCartList", function(req, res ,next) {
  let userId = req.body.userId;
  User.find({userId: userId},function (err, doc) {
    if(err) {
      res.json({
        status: '1',
        msg: err.message
      });
    }else {
      res.json({
        status: '0',
        msg: '',
        result: {
          count: doc.length,
          list: doc[0].cartList,
        }
      })
    }
  })
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
