'use strict';

angular.module('famnizer')
    .directive('createNewProduct', function($uibModal) {
        return {
            restrict: 'A',
            link: function($scope, $elem, $attrs) {
                $elem.on('click', function () {

                    $uibModal.open({
                        templateUrl: '/views/popups/createNewProductPopup.html',
                        controller: 'CreateNewProductPopupCtrl',
                        backdrop: 'static',
                        resolve: {
                            params: function () {
                                return {
                                    createMethod: $scope.createMethod,
                                    room: $scope.room
                                };
                            }
                        }
                    });
                });
            },
            scope: {
                createMethod: '&',
                room: '='
            }
        };
    })
    .controller('CreateNewProductPopupCtrl', function ($q, $scope, params, $http, StorageService, $growl, BroadcastService) {


        var currentUserId = StorageService.get(StorageService.configs.CurrentUserId);
        $scope.createMethod = params.createMethod;
        $scope.room = params.room;
        $scope.product = {};

        $scope.save = function() {

            if( ! document.querySelector('#createNewProductForm').checkValidity()) {
                return;
            }

            $scope.product.isClosed = false;
            $scope.product.room = $scope.room;

            $http({
                url: 'products',
                method: 'PUT',
                data: {
                    product: $scope.product
                }
            }).success(function () {
                $growl.addMessage('Успех', 'Материал создан', 'success');
                BroadcastService.action('PRODUCT_CREATED');
                $scope.$close();
            }).error(function(res) {
                $growl.addMessage('Ошибка', res.message, 'error');
            });
        }
    });