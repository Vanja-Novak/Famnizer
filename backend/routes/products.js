var express = require('express');
var router = express.Router();
var db = require('../db');
var Product = require('../model/Product');
var RecordExistsError = require('../errors/RecordExistsError');
var ObjectNotFoundError = require('../errors/ObjectNotFoundError');

router.get('/room/:room_id',function(req,res,next) {
    db.getProductsWithRoomId(req.params.room_id,function(err,rows, fields) {
        if (err) {
            next(new ObjectNotFoundError(500, "Продукты не найдены"));
        } else {
            res.send(rows);
        }
    });
});

router.put('/', function(req, res, next) {
    var user = req.currentUser;
    var product = new Product(req.body.product, user);
    db.addProduct(product, function(err, rows, fields) {
        if (err) {
            next(new ObjectNotFoundError(500, "Ошибка при создании продукта"));
        } else {
            res.send(rows);
        }
    });
});

module.exports = router;