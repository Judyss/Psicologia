'use strict';

/**
 * @ngdoc function
 * @name psicologiaApp.controller:EvaluacionRazonamientoNumericoCtrl
 * @description
 * # EvaluacionRazonamientoNumericoCtrl
 * Controller of the psicologiaApp
 */
angular.module('psicologiaApp')
  .controller('EvaluacionRazonamientoNumericoCtrl',function ($scope, $rootScope, $http, $timeout, $interval, $uibModal, $log) {
      $scope.preguntas = [];
      $scope.tiempo = 20 * 60 * 1000;
      $scope.tiempo_restante = 200;
      $interval(function () {
        $scope.tiempo_restante -= 1;
      }, 1000);
      $scope.getPreguntas = function () {
        $http.get('resources/razonamiento_numerico.json')
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
          templateUrl: 'razonamientoNumericoModal.html',
          controller: 'RazonamientoNumericoModalCtrl',
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

      $scope.open();

      $scope.pregunta_actual = 0;
      $scope.setPregunta = function(index){
        $scope.pregunta_actual  = index;
      };

    })
    .controller('RazonamientoNumericoModalCtrl', function ($scope, $modalInstance, items) {
      $scope.items = items;
      $scope.selected = {
        item: $scope.items[0]
      };

      $scope.ok = function () {
        $modalInstance.close($scope.selected.item);
      };

      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };
    });