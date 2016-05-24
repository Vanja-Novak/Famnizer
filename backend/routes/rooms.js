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
            next(new ObjectNotFoundError(500, "Категории не найдены"));
        } else {
            res.send(rows);
        }
    });
});

router.get('/:room_id', function (req,res,next) {
    db.getRoomById(req.params.room_id,function(err,rows, fields) {
        if (err) {
            next(new ObjectNotFoundError(500, "Категория не найдена"));
        } else {
            res.send(rows);
        }
    });
});

router.delete('/:room_id', function (req,res,next) {
    var user = req.currentUser;
    db.deleteRoomById(req.params.room_id, user.id,function(err,rows, fields) {
        if (err) {
            next(new ObjectNotFoundError(500, "Категория не найдена"));
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
                message: "Категория создана"
            });
        }
    });
});

router.put('/users', function (req, res, next) {
    var roomId = req.body.room.id;
    var userId = req.body.user.id;

    db.addUserToRoom(roomId, userId, function(err) {
        if(err) {
            next(new Error(500));
        } else {
            res.json({
                message: "Пользователь оповещен"
            });
        }
    });
});

router.put('/:room_id/users', function (req, res, next) {
    var roomId = +req.params.room_id;

    db.getUsersByRoomId(roomId,function(err,rows, fields) {
        if (err) {
            next(new ObjectNotFoundError(500, "Категория не найдена"));
        } else {
            res.send(rows);
        }
    });
});

module.exports = router;