var User = require('../model/User');
var Room = require('../model/Room');
var Product = require('../model/Product');
var diff = require('deep-diff');
var RecordExistsError = require('../errors/RecordExistsError');

var connection = require('./connection');

function Storage() {

    var API = {};

    API.getRooms = function(userId, callback) {
        connection.connect();
        connection.query('SELECT Room.id, Room.name FROM Room INNER JOIN Room_has_User ON Room.id = Room_has_User.room_fk WHERE Room_has_User.user_fk =' + userId, callback);
        connection.end();
    };

    API.getRoomById = function(roomId, callback) {
        connection.connect();
        connection.query('SELECT * FROM Room WHERE id = ' + roomId, callback);
        connection.end();
    };

    API.addRoom = function(room, userId, callback) {
        connection.connect();
        connection.query('INSERT INTO room SET ?', {name: room.name}, function(err, result) {
            if (err) { throw err;
            }else {
                connection.query('INSERT INTO Room_has_User SET ?', {room_fk : result.insertId, user_fk : userId}, callback);
            }
        });
        connection.end();
    };

    API.deleteRoomById = function(roomId,callback) {
        connection.connect();
        connection.query('DELETE FRROM User_has_Room WHERE room_fk = ' + roomId);
        connection.query('DELETE FROM Room WHERE id = ' + roomId, callback);
        connection.end();
    };

    API.updateRoom = function (room, callback) {
        connection.connect();
        connection.query('UPDATE Room SET name = ' + room.name + ' WHERE id = ' + room.id, callback);
        connection.end();
    };

    API.getUsers = function(callback) {
        connection.connect();
        connection.query("select * from user", callback);
        connection.end();
    };

    API.addUser = function(user, callback) {
        connection.connect();
        connection.query("insert into user (login, password) values ('" + [user.login, user.password].join("','") + "')", callback);
        connection.end();
    };
    
    API.findUser = function(user, callback) {
        var cons = prepareConditions(user);
        connection.connect();
        connection.query("select * from user where " + cons, callback);
        connection.end();
    };

    function prepareConditions(obj) {
        var res = [];
        for(prop in obj) {
            if(prop !== 'id')
                res.push(prop + " = \'" + obj[prop] + '\'');
        }

        return res.join(' and ');
    };

    API.findUserById = function(id) {
        connection.connect();
        connection.query("select * from user where id = " + id, callback);
        connection.end();
    };

    return API;
}

module.exports = new Storage();


