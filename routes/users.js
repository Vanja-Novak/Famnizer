var express = require('express');
var router = express.Router();
var db = require('../db/Storage');
var auth = require('../auth');
var winston = require('winston');
var storage = require('../db/storage');
var User = require('../model/User');

router.get('/', function(req, res, next) {
    res.send(db.getUsers());
});

router.post('/register', function(req, res, next) {
    var user  = new User(req.body);
    storage.addUser(user);
});

router.post('/login', function(req, res, next) {
    var user  = new User(req.body);
    user = storage.findUser(user, ['id']);
    console.log(user);

    res.send(user);
});

module.exports = router;