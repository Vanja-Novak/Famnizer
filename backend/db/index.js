var User = require('../model/User');
var Room = require('../model/Room');
var Product = require('../model/Product');
var diff = require('deep-diff');
var RecordExistsError = require('../errors/RecordExistsError');

var connection = require('./connection');

function Storage() {

    var API = {};

    API.getUsers = function(callback) {
        connection.connect();
        connection.query('select * from user', callback);
        connection.end();
    };

    API.addUser = function(user, callback) {
        connection.query("insert into user (login, password) values ('" + [user.login, user.password].join("','") + "')", callback);
    };
    
    API.findUser = function(user, callback) {
        var cons = prepareConditions(user);
        connection.query('select * from user where ' + cons, callback);
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
        connection.query("select * from user where id = " + id, callback);
    };

    return API;
}

module.exports = new Storage();


