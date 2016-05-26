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
                                    room: $scope.room,
                                    product : $scope.product
                                };
                            }
                        }
                    });
                });
            },
            scope: {
                room: '=',
                product: '='
            }
        };
    })
    .controller('AssignUserPopupCtrl', function ($scope, params, $http, $growl, BroadcastService) {

        $scope.product = params.product;
        $scope.room = params.room;
        $scope.user = {};
        $scope.users = [];

        $scope.save = function() {

            if( ! document.querySelector('#assignUserForm').checkValidity()) {
                return;
            }

            $http({
                url: 'products/assignee',
                method: 'PUT',
                data: {
                    user: $scope.user,
                    product: $scope.product
                }
            }).success(function () {
                $growl.addMessage('Уcпех', 'Пользователь назначен', 'success');
                BroadcastService.action('PRODUCT_CREATED');
                $scope.$close();
            }).error(function(res) {
                $growl.addMessage('Ошибка', res.message, 'error');
            });
        }

        function getUsers() {
            $http({
                method: 'GET',
                url: 'rooms/users/' + $scope.room.id
            }).success(function(res) {
                $scope.users = res;
            });
        };
        function init() {
            getUsers();
        }

        init();
    });