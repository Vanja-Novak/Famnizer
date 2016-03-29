"use strict";

angular.module('famnizer')
    .controller('MainController', [

        '$scope',
        '$state',

        function($scope, $state) {

            $scope.params = angular.copy($state.params);

        }

    ]);