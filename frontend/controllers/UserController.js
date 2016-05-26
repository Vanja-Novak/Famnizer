"use strict";

angular.module('famnizer')
    .controller('UserController', [

        '$scope',
        '$http',
        '$state',
        '$growl',
        'StorageService',
        'BroadcastService',

        function($scope, $http, $state, $growl, StorageService, BroadcastService) {

            $scope.user = {};

            $scope.save = function() {

                if( !$scope.user.password || !$scope.user.passRepeat || !$scope.user.login) {
                    $growl.addMessage('Внимание', 'Необходимо заполнить все поля', 'warning');
                    return;
                }

                if($scope.user.password !== $scope.user.passRepeat) {
                    $growl.addMessage('Внимание', 'Пароли не совпадают', 'warning');
                    return;
                }

               $http({
                    url: 'users/register',
                    method: 'PUT',
                    data: $scope.user
                }).success(function(res) {
                       $growl.addMessage('Успех', res.message, 'success');
                   $state.go('login');
               })
                   .error(function (res) {
                       $growl.addMessage('Ошибка', res.message, 'danger');
                   });
            };

            $scope.login = function() {

                if( !$scope.user.password || !$scope.user.login) {
                    $growl.addMessage('Внимание', 'Необходимо заполнить все поля', 'warning');
                    return;
                }

                $http({
                    url: 'users/login',
                    method: 'POST',
                    data: $scope.user
                }).success(function (responce, status) {
                    $growl.addMessage('Успех', 'Вы зашли под пользователем ' + $scope.user.login , 'success');
                    StorageService.set(StorageService.configs.Authorization, responce);
                    BroadcastService.action('USER_LOGINED');
                    $state.go('index');
                }).error(function (responce, status) {
                    $growl.addMessage('Ошибка', responce.message, 'error');
                });
            };
        }
    ]);