'use strict';

angular.module('famnizer')
    .directive('createNewRoom', function($uibModal) {
        return {
            restrict: 'A',
            link: function($scope, $elem, $attrs) {
                $elem.on('click', function () {

                    $uibModal.open({
                        templateUrl: '/views/popups/createNewRoomPopup.html',
                        controller: 'CreateNewRoomPopupCtrl',
                        backdrop: 'static',
                        resolve: {
                            params: function () {
                                return {
                                    createMethod: $scope.createMethod
                                };
                            }
                        }
                    });
                });
            },
            scope: {
                createMethod: '&'
            }
        };
    })
    .controller('CreateNewRoomPopupCtrl', function ($q, $scope, params, $http, StorageService) {


        var currentUserId = StorageService.get(StorageService.configs.CurrentUserId);
        $scope.createMethod = params.createMethod;
        $scope.room = {};

        $scope.save = function() {
            $http({
                url: 'rooms/add',
                method: 'PUT',
                data: {
                    room: $scope.room,
                    userId: +currentUserId
                }
            });
        }
    });