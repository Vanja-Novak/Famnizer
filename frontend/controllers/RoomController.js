"use strict";

angular.module('famnizer')
    .controller('RoomController', [

        '$scope',
        '$state',
        '$http',
        '$growl',
        'BroadcastService',

        function($scope, $state, $http, $growl, BroadcastService) {

            $scope.room = {};
            $scope.roomId = $state.params.roomId;
            $scope.products = [];

            $scope.delete = function(id) {
                $http({
                    method: 'DELETE',
                    url: 'products/' + id
                }).success(function () {
                    $growl.addMessage('Success', 'Удаление продукта прошло успешно', 'success');
                    getRoomProducts();
                });
            };

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