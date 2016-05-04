"use strict";

angular.module('famnizer')
    .controller('RoomController', [

        '$scope',
        '$state',
        '$http',
        'BroadcastService',

        function($scope, $state, $http, BroadcastService) {

            $scope.room = {};
            $scope.roomId = $state.params.roomId;
            $scope.products = [];


            function getRoomInfo() {
                $http({
                    method: 'GET',
                    url: 'rooms/' + $scope.roomId
                }).success(function (res) {
                    $scope.room = res[0];
                });
            }

            function getRoomProducts() {
                $http({
                    method: 'GET',
                    url: 'products/room/' + $scope.roomId
                }).success(function (res) {
                    $scope.products = res;
                });
            }

            var init = function() {
                getRoomInfo();
                getRoomProducts();
            }

            BroadcastService.onAction('PRODUCT_CREATED', $scope, function() {
                getRoomProducts();
            });

            init();
        }

    ]);