var User = require('../model/User');
var Room = require('../model/Room');
var Product = require('../model/Product');
var diff = require('deep-diff');
var RecordExistsError = require('../errors/RecordExistsError');

var connection = require('./connection');

function Storage() {

    var API = {};

    API.getProductsWithRoomId = function(roomId, callback) {
        roomId = +roomId;
        connection.query('SELECT * FROM Product WHERE room_fk = ' + roomId, callback);
    };

    API.addProduct = function(product, callback) {
        connection.query('INSERT INTO Product SET ?', product, callback);
    };

    API.deleteProductById = function(productId,callback) {
        connection.query('DELETE FROM Product WHERE id = ' + productId, callback);
    };
    
    API.getRooms = function(userId, callback) {
        connection.query('SELECT Room.id, Room.name FROM Room INNER JOIN Room_has_User ON Room.id = Room_has_User.room_fk WHERE Room_has_User.user_fk =' + userId, callback);
    };

    API.getRoomById = function(roomId, callback) {
        roomId = +roomId;
        connection.query('SELECT * FROM Room WHERE id = ' + roomId, callback);
    };

    API.addRoom = function(room, userId, callback) {
        connection.query('INSERT INTO room SET ?', {name: room.name}, function(err, result) {
            if (err) { throw err;
            }else {
                connection.query('INSERT INTO Room_has_User SET ?', {room_fk : result.insertId, user_fk : userId}, callback);
            }
        });
    };

    API.deleteRoomById = function(roomId,callback) {
        connection.query('DELETE FROM Room WHERE id = ' + roomId);
        connection.query('DELETE FROM Product WHERE room_fk = ' + roomId);
        connection.query('DELETE FROM Room_has_User WHERE room_fk = ' + roomId, callback);
    };

    API.updateRoom = function (room, callback) {
        connection.query('UPDATE Room SET name = ' + room.name + ' WHERE id = ' + room.id, callback);
    };

    API.getUsers = function(callback) {
        connection.query("select * from user", callback);
    };

    API.addUser = function(user, callback) {
        connection.query("insert into user (login, password) values ('" + [user.login, user.password].join("','") + "')", callback);
    };
    
    API.findUser = function(user, callback) {
        var cons = prepareConditions(user);
        connection.query("select * from user where " + cons, callback);
    };

    function prepareConditions(obj) {
        var res = [];
        for(prop in obj) {
            if(prop !== 'id')
                res.push(prop + " = \'" + obj[prop] + '\'');
        }

        return res.join(' and ');
    };

    API.findUserById = function(id, callback) {
        connection.query("select * from user where id = " + id, callback);
    };

    API.userByAuth = function(auth, callback) {
        connection.query("SELECT * FROM `User` WHERE login = '" + auth.name + "' and password = '" + auth.pass + "'",callback);
    }

    return API;
}

module.exports = new Storage();


