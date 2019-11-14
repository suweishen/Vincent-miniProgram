var express = require('express')
var router = express.Router();
var mongoose = require('mongoose');
var Goods = require('../models/goods');
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
// 商品列表
router.get("/", function (req, res, next) {
  Goods.find({},function (err, doc) {
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
// 商品详情
router.post("/detail", function (req, res, next) {
  let productId = req.body.productId;
  Goods.find({productId: productId},function (err, doc) {
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
// 加入购物车
router.post("/addCart", function (req, res, next){
  var userId = '1000000077',productId = req.body.productId;
  let productNum = req.body.productNum;
  var User = require('../models/user');

  User.find({
    userId:userId
  },function (err, userDoc) {
    if(err) {
      res.json({
        status: '1',
        msg:err.message
      })
    } else {
      if(userDoc) {
        let isInit = userDoc[0].cartList.find( item => {
          return item.productId === productId
        })
        if (isInit) {
          res.json({
            status: '1',
            msg: '',
            result: {
              count: 0,
              list: []
            }
          })
        } else {
          Goods.find({productId:productId}, function(err, doc) {
            if(doc) {
              doc[0].productNum = 1;
              doc[0].checked = 1;
              User.update({
                userId:userId
              }, {
                '$push': {
                  cartList: {
                    productId: doc[0].productId,
                    productName :doc[0].productName,
                    salePrice: doc[0].salePrice,
                    productImage: doc[0].productImage,
                    checked: doc[0].checked,
                    productNum: doc[0].productNum
                  }
                }
              }, function(err, data) {
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
            } else {
              res.json({
                status: '1',
                msg: '',
                result: {
                  count: doc.length,
                  list: doc
                }
              })
              return 
            }
          })
        }
        // });
      }
    }
  } )
});

module.exports = router;