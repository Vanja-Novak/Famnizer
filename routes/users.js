var express = require('express');
var router = express.Router();
var db = require('../db');
var User = require('../model/User');

router.get('/', function(req, res, next) {
    res.send(db.getUsers());
});

router.post('/register', function(req, res, next) {
    var user  = new User(req.body);
    db.addUser(user);
});

router.post('/login', function(req, res, next) {
    var user  = new User(req.body);
    user = db.findUser(user, ['id']);
    console.log(user);

    res.send(user);
});

module.exports = router;