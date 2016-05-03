var express = require('express');
var router = express.Router();
var db = require('../db');
var Room = require('../model/Room');
var RecordExistsError = require('../errors/RecordExistsError');
var ObjectNotFoundError = require('../errors/ObjectNotFoundError');
var auth  = require('basic-auth');

router.get('/', function(req,res,err) {
    var user = auth(req);
    db.getRooms(1,function (err, rows, fileds) {
        if (err) {
            next(new ObjectNotFoundError(500, "Комнаты не найдены"));
        } else {
            res.send(rows);
        }
    });
});

router.get('/:room_id', function (req,res,err) {
    db.getRoomById(req.params.room_id,function(err,rows, fields) {
        if (err) {
            next(new ObjectNotFoundError(500, "Комната не найдена"));
        } else {
            res.send(rows);
        }
    });
});

router.put('/add', function(req,res,err) {
    var room = new Room(req.body.room);
    var userId = req.body.userId;

    db.addRoom(room, userId, function(err) {
        if(err) {
            next(new RecordExistsError(500));
        } else {
            res.json({
                message: "комната создана"
            });
        }
    });
});

module.exports = router;