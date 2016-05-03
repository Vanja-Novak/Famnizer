var express = require('express');
var router = express.Router();
var db = require('../db');
var User = require('../model/User');
var RecordExistsError = require('../errors/RecordExistsError');
var ObjectNotFoundError = require('../errors/ObjectNotFoundError');

router.get('/', function(req, res, next) {
    db.getUsers(function (err, rows, fields) {
        res.send(rows);
    });
});

router.post('/register', function(req, res, next) {
    var user  = new User(req.body);

    db.addUser(user, function (err) {

        if(err) {
            next(new RecordExistsError(500));
        } else {
            res.json({
                message: "регистрация успешна"
            });
        }
    });
});

router.post('/login', function(req, res, next) {

    var user  = new User(req.body);

    db.findUser(user, function(err, rows) {

        console.log(err);

        if(err || rows.length === 0) {
            next(new ObjectNotFoundError(500));
            return;
        }
        
        user = rows[0];
        var token = new Buffer(user.login + ':' + user.password).toString('base64');

        res.json(token);
    });

});

module.exports = router;