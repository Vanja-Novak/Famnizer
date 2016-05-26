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

            $scope.download = function(id) {
                $http({
                    method: 'GET',
                    url: 'products/download/' + id
                }).success(function (res) {
                    var blob = new Blob([ res ], { type : "octet/stream" });
                    var url = (window.URL || window.webkitURL).createObjectURL( blob );
                    var a = document.createElement("a");
                    document.body.appendChild(a);
                    a.style = "display: none";
                    a.href = url;
                    a.download = id + '.txt';
                    a.click();
                    window.URL.revokeObjectURL(url);
                    $growl.addMessage('Успех', 'Загрузка началась', 'success');
                }).error(function (responce, status) {
                    $growl.addMessage('Ошибка', responce.message, 'error');
                });
            };

            $scope.delete = function(id) {
                $http({
                    method: 'DELETE',
                    url: 'products/' + id
                }).success(function () {
                    $growl.addMessage('Успех', 'Материал был удален', 'success');
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