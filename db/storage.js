var User = require('../model/User');
var Room = require('../model/Room');
var Product = require('../model/Product');


function Storage() {
    var UserStorage = [];
    var RoomStorage = [];
    var ProductStorage = [];
    var i;

    var API = {};

    API.getUsers = function() {
        return UserStorage;
    };
    API.getRooms = function() {
        return UserStorage;
    };
    API.getProducts = function() {
        return UserStorage;
    };

    function init() {
        createUsers();
        createProducts();
        createRooms();
    }
    init();


    function createUsers() {
        for(i = 1; i<6; i++) {
            UserStorage.push(new User(i, 'user_' + i));
        }
    }
    function createProducts() {
        for(i = 1; i<6; i++) {
            ProductStorage.push(new Product(i, 'product_' + i));
        }
    }
    function createRooms() {
        for(i = 1; i<6; i++) {
            RoomStorage.push(new Room(i, 'room_' + i));
        }
    }

    return API;
}

module.exports = new Storage();


