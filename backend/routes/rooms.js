var express = require('express');
var router = express.Router();
var db = require('../db');
var Room = require('../model/Room');
var RecordExistsError = require('../errors/RecordExistsError');
var ObjectNotFoundError = require('../errors/ObjectNotFoundError');

router.get('/', function(req,res,next) {
    var user = req.currentUser;
    db.getRooms(user.id,function (err, rows, fileds) {
        if (err) {
            next(new ObjectNotFoundError(500, "Комнаты не найдены"));
        } else {
            res.send(rows);
        }
    });
});

router.get('/:room_id', function (req,res,next) {
    db.getRoomById(req.params.room_id,function(err,rows, fields) {
        if (err) {
            next(new ObjectNotFoundError(500, "Комната не найдена"));
        } else {
            res.send(rows);
        }
    });
});

router.delete('/:room_id', function (req,res,next) {
    db.deleteRoomById(req.params.room_id,function(err,rows, fields) {
        if (err) {
            next(new ObjectNotFoundError(500, "Комната не найдена"));
        } else {
            res.send(rows);
        }
    });
});

router.put('/add', function(req,res,next) {
    var room = new Room(req.body.room.name);
    var user = req.currentUser;

    db.addRoom(room, user.id, function(err) {
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