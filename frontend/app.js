var app = angular.module('famnizer', ['ui.router']);

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