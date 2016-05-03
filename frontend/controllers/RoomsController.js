"use strict";

angular.module('famnizer')
    .controller('RoomsController', [

        '$scope',
        '$state',
        '$http',

        function($scope, $state, $http) {

            $scope.rooms = [];

            var init = function() {
                $http({
                    method: 'GET',
                    url: 'rooms/'
                }).success(function (res) {
                    console.log(res.data.data);
                })
            }

            init();
        }

    ]);