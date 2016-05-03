 var basicAuth = require('basic-auth');
 var storage = require('../db');

 module.exports = function (req, res, next) {

     if(req.method === 'OPTIONS' || req.url.indexOf("register") !== -1) {
         return next();
     }

     function unauthorized(res) {
                res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
                return res.status(401).send();
            }

            var user = basicAuth(req);
            if (!user || !user.name || !user.pass) {
                return unauthorized(res);
            }

            storage.findUserByAuth(user, function (err, rows, fileds) {
                if (!err && rows) {
                    req.currentUser = rows;
                    return next();
                } else {
                    return unauthorized(res);
                }
            });
        };