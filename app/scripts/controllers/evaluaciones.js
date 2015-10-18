'use strict';

/**
 * @ngdoc function
 * @name psicologiaApp.controller:EvaluacionesCtrl
 * @description
 * # EvaluacionesCtrl
 * Controller of the psicologiaApp
 */
angular.module('psicologiaApp')
  .controller('EvaluacionesCtrl', function ($scope, $rootScope,$timeout, $http, $location) {
    $scope.evaluaciones = [];
        $http.get("resources/evaluaciones.json")
            .success(function(data){
                $scope.evaluaciones = data;
            })
            .error(function(){});
        $scope.selectEvaluacion = function(tipo){
            switch (tipo){
                case 1:
                    $location.url("evaluacion/razonamiento-verbal");
                    break;
                case 2:
                    $location.url("evaluacion/razonamiento-numerico");
                    break;
                case 3:break;
                case 4:break;
                case 5:break;
            }
        }
  });
