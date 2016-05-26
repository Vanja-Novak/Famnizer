'use strict';

app.config([

    '$urlRouterProvider',
    '$stateProvider',
    '$locationProvider',

    function($urlRouterProvider, $stateProvider, $locationProvider) {

        $urlRouterProvider.otherwise('/');
        if(navigator.appVersion.indexOf("MSIE 8.") === -1 && navigator.appVersion.indexOf("MSIE 9.") === -1){
            $locationProvider.html5Mode(true);
        }

        $stateProvider.state('base', {

                templateUrl: 'views/templates/main.html',
                controller: 'MainController',
                controllerAs: 'ctrl'
            })
            .state('index', {
                parent: 'base',
                url: '/',
                templateUrl: 'views/pages/index.html',
                data: {
                    title: 'Learning'
                }
            })
            .state('register', {
                parent: 'base',
                url: '/register',
                templateUrl: 'views/pages/user/register.html',
                controller: 'UserController',
                data: {
                    title: 'Registration'
                }
            })
            .state('login', {
                parent: 'base',
                url: '/login',
                templateUrl: 'views/pages/user/login.html',
                controller: 'UserController',
                data: {
                    title: 'Login'
                }
            })
            .state('roomDetail', {
                parent: 'base',
                url: 'room/:roomId',
                templateUrl: 'views/pages/roomDetail.html',
                controller: 'RoomController',
                data: {
                    title: 'Category'
                }
            })
    }]
);