"use strict";

angular.module('famnizer')
    .controller('RoomController', [

        '$scope',
        '$state',
        '$http',

        function($scope, $state, $http) {

            $scope.room = {};
            $scope.roomId = $state.params.roomId;
            $scope.products = [];

            var init = function() {
                // $http({
                //     method: 'GET',
                //     url: 'rooms/' + $scope.roomId
                // }).success(function (res) {
                //     $scope.room = res[0];
                // })

                $http({
                    method: 'GET',
                    url: 'products/room/' + $scope.roomId
                }).success(function (res) {
                    $scope.products = res;
                });
            }

            init();
        }

    ]);