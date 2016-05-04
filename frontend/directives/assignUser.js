'use strict';

angular.module('famnizer')
    .directive('assignUser', function($uibModal) {
        return {
            restrict: 'A',
            link: function($scope, $elem, $attrs) {
                $elem.on('click', function () {

                    $uibModal.open({
                        templateUrl: '/views/popups/assignUserPopup.html',
                        controller: 'AssignUserPopupCtrl',
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
    .controller('AssignUserPopupCtrl', function ($scope, params, $http, $growl) {

        $scope.room = params.room;
        $scope.user = {};
        $scope.users = [];

        $scope.save = function() {

            if( ! document.querySelector('#addUserToRoomForm').checkValidity()) {
                return;
            }

            $http({
                url: 'rooms/' + roomId + '/users',
                method: 'PUT',
                data: {
                    user: $scope.user,
                    room: $scope.room
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
                url: 'rooms/' + $scope.room.id + '/users'
            }).success(function(res) {
                $scope.users = res;
            });
        };
        function init() {
            getUsers();
        }

        init();
    });