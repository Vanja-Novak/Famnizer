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
    .controller('CreateNewProductPopupCtrl', function ($q, $scope, params, $http, StorageService, $growl, BroadcastService) {


        var currentUserId = StorageService.get(StorageService.configs.CurrentUserId);
        $scope.createMethod = params.createMethod;
        $scope.product = {};

        $scope.save = function() {

            $scope.product.isClosed = false;

            $http({
                url: 'product',
                method: 'PUT',
                data: {
                    product: $scope.product
                }
            }).success(function () {
                $growl.addMessage('Success', 'Продукт создан', 'success');
                BroadcastService.action('PRODUCT_CREATED');
                $scope.$close();
            });
        }
    });