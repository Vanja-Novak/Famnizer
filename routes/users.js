var express = require('express');
var router = express.Router();
var db = require('../db/Storage');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send(db.getUsers());
});

module.exports = router;