'use strict';
/**
 * @ngdoc function
 * @name psicologiaApp.controller:EvaluacionRazonamientoVerbalCtrl
 * @description
 * # EvaluacionRazonamientoVerbalCtrl
 * Controller of the psicologiaApp
 */
angular.module('psicologiaApp')
  .controller('EvaluacionRazonamientoVerbalCtrl', function ($scope, $rootScope, $http, $timeout, $interval, $mdDialog) {
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
    $scope.openInstrucciones = function (ev) {
      $mdDialog.show({
        controller: 'RazonamientoVerbalModalCtrl',
        templateUrl: 'razonamientoVerbalModal.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true
      })
        .then(function (answer) {
          $scope.status = 'You said the information was "' + answer + '".';
        }, function () {
          $scope.status = 'You cancelled the dialog.';
        });
    };
    $scope.openInstrucciones();
    $scope.pregunta_actual = 0;
    $scope.setPregunta = function (index) {
      $scope.pregunta_actual = index;
    };
  })
  .controller('RazonamientoVerbalModalCtrl', function ($scope, $mdDialog) {
    $scope.hide = function () {
      $mdDialog.hide();
    };
    $scope.cancel = function () {
      $mdDialog.cancel();
    };
    $scope.answer = function (answer) {
      $mdDialog.hide(answer);
    };
  });
