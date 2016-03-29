"use strict";

angular.module('famnizer')
    .controller('UserController', [

        '$scope',
        '$http',

        function($scope, $http) {

            $scope.user = {};

            $scope.save = function() {

                if( !$scope.user.password || !$scope.user.passRepeat) {
                    alert('Проверьте пароль');
                    return;
                }

                if($scope.user.password !== $scope.user.passRepeat) {
                    alert('Пароли не совпадают');
                    return;
                }

               $http({
                    url: 'users/register',
                    method: 'POST',
                    data: $scope.user
                });
            };
        }
    ]);