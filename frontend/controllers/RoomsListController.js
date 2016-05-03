"use strict";

angular.module('famnizer')
    .controller('RoomsListController', [

        '$scope',
        '$state',
        '$http',

        function($scope, $state, $http) {

            $scope.rooms = [];

            $scope.delete = function(id) {
                $http({
                    method: 'DELETE',
                    url: 'rooms/' + id
                });
            };

            $scope.openRoom = function (id) {
                $state.go('roomDetail', {roomId: id});
            };

            var init = function() {
                $http({
                    method: 'GET',
                    url: 'rooms/'
                }).success(function (res) {
                    $scope.rooms = res;
                })
            }

            init();
        }

    ]);