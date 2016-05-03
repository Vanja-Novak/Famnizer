var express = require('express');
var router = express.Router();
var db = require('../db');
var Room = require('../model/Product');
var RecordExistsError = require('../errors/RecordExistsError');
var ObjectNotFoundError = require('../errors/ObjectNotFoundError');

router.get('/:room_id',function(req,resp,err) {
    db.getProductsWithRoomId(req.params.room_id,function(err,rows, fields) {
        if (err) {
            next(new ObjectNotFoundError(500, "Продукты не найдены"));
        } else {
            res.send(rows);
        }
    });
});

module.exports = router;