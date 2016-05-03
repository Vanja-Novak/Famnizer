var app = angular.module('famnizer', ['ui.router', 'growl', 'ngCookies']);


app.config([

    '$httpProvider',
    '$animateProvider',
    '$compileProvider',

    function($httpProvider, $animateProvider, $compileProvider) {

        var requestInterceptor = function($q){
            return {
                'request': function (config) {
                    if(config.url.indexOf(".") === -1) {
                        config.url = 'http://127.0.0.1:4000/' + config.url;
                        // if(config.url.indexOf("login") === -1 ) {
                        //     config.headers['Authorization'] = 'Basic ' + DataStorageService.get(DataStorageService.configs.Authorization);
                        // }
                    }

                    return config || $q.when(config);
                }
            }
        };

        $httpProvider.interceptors.push(requestInterceptor);
    }
]);

app.run(function($rootScope, $state) {
    $rootScope.$state = $state;

    $rootScope.$on('$stateChangeSuccess', function(e, toState) {
        if (toState.data) {
            document.title = toState.data.title;
        }
        $rootScope.pageTitle = toState.data.title;
        $rootScope.pageName = toState.name;
    });

});