var User = require('../model/User');
var Room = require('../model/Room');
var Product = require('../model/Product');
var diff = require('deep-diff');

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
    
    API.findUser = function(user, exclusions) {
        if( ! exclusions) {
            return find(userStorage, user);
        } else {
            return findExcludeFields(userStorage, user, exclusions);
        }
    };
    
    /**
     * 
     * @param arr - storage to search
     * @param obj - object to search
     * @returns object from storage, or undefined 
     */
    function find(arr, obj) {
        return arr.filter(function (el) {
            return diff(obj, el) === undefined;
        });
    }

    /**
     * 
     * @param arr
     * @param obj
     * @param exclusions - array of fields (as string) that should be ignored
     * @returns object from storage, or undefined
     */
    function findExcludeFields(arr, obj, exclusions) {
        obj = arr.filter(function (el) {
            var diffs = diff(obj, el);
            diffs = diffs.filter(function(diff) {
               return exclusions.indexOf(diff.path[0]) === -1;
            });
            return diffs.length === 0;
        });

        return obj[0];
    }

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


