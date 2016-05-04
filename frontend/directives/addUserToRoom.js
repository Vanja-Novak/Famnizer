'use strict';

angular.module('famnizer')
    .directive('addUserToRoom', function($uibModal) {
        return {
            restrict: 'A',
            link: function($scope, $elem, $attrs) {
                $elem.on('click', function () {

                    $uibModal.open({
                        templateUrl: '/views/popups/addUserToRoomPopup.html',
                        controller: 'AddUserToRoomPopupCtrl',
                        backdrop: 'static',
                        resolve: {
                            params: function () {
                                return {
                                    room: $scope.room
                                };
                            }
                        }
                    });
                });
            },
            scope: {
                room: '='
            }
        };
    })
    .controller('AddUserToRoomPopupCtrl', function ($scope, params, $http, $growl) {

        $scope.room = params.room;
        $scope.user = {};
        $scope.users = [];

        $scope.save = function() {

            if( ! document.querySelector('#addUserToRoomForm').checkValidity()) {
                return;
            }

            $http({
                url: 'rooms/users',
                method: 'PUT',
                data: {
                    product: $scope.product
                }
            }).success(function () {
                $growl.addMessage('Success', 'Пользователь добавлен', 'success');
                $scope.$close();
            }).error(function(res) {
                $growl.addMessage('Attention!', res.message, 'error');
            });
        }

        function getUsers() {
            $http({
                method: 'GET',
                url: 'users'
            }).success(function(res) {
                $scope.users = res;
            });
        };
        function init() {
            getUsers();
        }

        init();
    });