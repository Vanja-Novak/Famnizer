var basicAuth = require('basic-auth');
var storage = require('../db');

function Authorizer() {

    var API = {};

    API.auth = function (req, res, next) {
        
        function unauthorized(res) {
            res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
            return res.send(401);
        }
        
        var user = basicAuth(req);

        if (!user || !user.name || !user.pass) {
            return unauthorized(res);
        }

        if (user.name === 'foo' && user.pass === 'bar') {
            return next();
        } else {
            return unauthorized(res);
        }
    };

    return API;
}


module.exports = new Authorizer();