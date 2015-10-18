'use strict';

/**
 * @ngdoc function
 * @name psicologiaApp.controller:EvaluacionRazonamientoVerbalCtrl
 * @description
 * # EvaluacionRazonamientoVerbalCtrl
 * Controller of the psicologiaApp
 */
angular.module('psicologiaApp')
    .controller('EvaluacionRazonamientoVerbalCtrl', function ($scope, $rootScope, $http, $timeout, $interval) {
        $scope.preguntas = [];
        $scope.tiempo = 20 * 60 * 1000;
        $scope.tiempo_restante = 200;
        $interval(function () {
            $scope.tiempo_restante -= 1;
        }, 1000);
        $scope.getPreguntas = function () {
            $http.get('resources/razonamiento_verbal.json')
                .success(function (data) {
                    $scope.preguntas = data;
                })
                .error(function () {

                })
        };

        $scope.getPreguntas();

        $scope.open = function (size) {

            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'razonamientoVerbalModal.html',
                controller: 'RazonamientoVerbalModalCtrl',
                size: "lg",
                resolve: {
                    items: function () {
                        return {};
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        //$scope.open();

        $scope.pregunta_actual = 0;
        $scope.setPregunta = function(index){
            $scope.pregunta_actual  = index;
        };

    })
    .controller('RazonamientoVerbalModalCtrl', function ($scope) {

    });
