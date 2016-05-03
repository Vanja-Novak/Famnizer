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

                if( !$scope.user.password || !$scope.user.passRepeat) {
                    $growl.addMessage('Attention!', 'Проверьте пароль', 'warning');
                    return;
                }

                if($scope.user.password !== $scope.user.passRepeat) {
                    $growl.addMessage('Attention!', 'Пароли не совпадают', 'warning');
                    return;
                }

               $http({
                    url: 'users/register',
                    method: 'PUT',
                    data: $scope.user
                }).success(function(res) {
                       $growl.addMessage('Success', res.message, 'success');
                   $state.go('login');
               })
                   .error(function (res) {
                       $growl.addMessage('Ошибка!', res.message, 'danger');
                   });
            };

            $scope.login = function() {
                $http({
                    url: 'users/login',
                    method: 'POST',
                    data: $scope.user
                }).success(function (responce, status) {
                    $growl.addMessage('Success', responce.message, 'success');
                    StorageService.set(StorageService.configs.Authorization, responce);
                    BroadcastService.action('USER_LOGINED');
                    $state.go('index');
                }).error(function (responce, status) {
                    console.log(status);
                    $growl.addMessage('Attention!', responce.message, 'error');
                });
            };
        }
    ]);