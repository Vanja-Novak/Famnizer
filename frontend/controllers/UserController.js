"use strict";

angular.module('famnizer')
    .controller('UserController', [

        '$scope',
        '$http',
        '$state',
        '$growl',
        'StorageService',

        function($scope, $http, $state, $growl, StorageService) {

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
                    method: 'POST',
                    data: $scope.user
                }).success(function() {

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
                    $state.go('index');
                }).error(function (responce, status) {
                    console.log(status);
                    $growl.addMessage('Attention!', responce.message, 'error');
                });
            };
        }
    ]);