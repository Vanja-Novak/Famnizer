var User = require('../model/User');
var Room = require('../model/Room');
var Product = require('../model/Product');


function Storage() {

    var userStorage = [];
    var roomStorage = [];
    var productStorage = [];
    var i;

    var API = {};

    API.getUsers = function() {
        return userStorage;
    };
    API.getRooms = function() {
        return userStorage;
    };
    API.getProducts = function() {
        return userStorage;
    };

    API.addUser = function(user) {
        user.id = userStorage[userStorage.length - 1].id + 1;
        userStorage.push(user);
        console.log(userStorage);
    };

    function init() {
        createUsers();
        createProducts();
        createRooms();
    }
    init();


    function createUsers() {
        for(i = 1; i<6; i++) {
            userStorage.push(new User(i, 'user_' + i, 'user' + i));
        }
    }
    function createProducts() {
        for(i = 1; i<6; i++) {
            productStorage.push(new Product(i, 'product_' + i));
        }
    }
    function createRooms() {
        for(i = 1; i<6; i++) {
            roomStorage.push(new Room(i, 'room_' + i));
        }
    }

    return API;
}

module.exports = new Storage();


