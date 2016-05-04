"use strict";

angular.module('famnizer')
    .controller('RoomsListController', [

        '$scope',
        '$state',
        '$http',
        'BroadcastService',
        '$growl',

        function($scope, $state, $http, BroadcastService, $growl) {

            $scope.rooms = [];

            $scope.delete = function(id) {
                $http({
                    method: 'DELETE',
                    url: 'rooms/' + id
                }).success(function () {
                    $growl.addMessage('Success', 'Удаление комнаты прошло успешно', 'success');
                    getRooms();
                })
            };

            $scope.openRoom = function (id) {
                $state.go('roomDetail', {roomId: id});
            };

            var getRooms = function () {
                $http({
                    method: 'GET',
                    url: 'rooms/'
                }).success(function (res) {
                    $scope.rooms = res;
                })
            }

            var init = function() {
                getRooms();
            }

            BroadcastService.onAction('ROOM_CREATED', $scope, function() {
               getRooms();
            });

            init();
        }

    ]);