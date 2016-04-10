var mysql      = require('mysql');
var connection = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'famnizer',
    connectionLimit: '20'
});

module.exports = connection;