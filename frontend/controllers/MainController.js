"use strict";

angular.module('famnizer')
    .controller('MainController', [

        '$scope',
        '$state',
        'StorageService',
        'BroadcastService',

        function($scope, $state, StorageService, BroadcastService) {

            $scope.params = angular.copy($state.params);

            $scope.isLogined = !!StorageService.get(StorageService.configs.Authorization);

            BroadcastService.onAction('USER_LOGINED', $scope, function(data){
                $scope.isLogined = !!StorageService.get(StorageService.configs.Authorization);
            });
        }

    ]);