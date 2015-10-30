'use strict';

/**
 * @ngdoc function
 * @name emiApp.controller:FormularioListCtrl
 * @description
 * # FormularioListCtrl
 * Controller of the emiApp
 */
angular.module('emiApp')
  .controller('FormularioListCtrl', function ($scope, $rootScope, $Toast, $http, $ApiUrls, Restangular) {

    Restangular.all($ApiUrls.Form).getList().then(function(data){
      $scope.form = data;
    });

    $scope.evaluaciones = [];
    $http.get("resources/evaluaciones.json")
      .success(function(data){
        $scope.evaluaciones = data;
      })
      .error(function(){});
    $scope.selectEvaluacion = function(evaluacion, index){
      $rootScope.currentTestSelected = evaluacion;
      $rootScope.currentTest = {};
      $rootScope.currentIndexTest = index;
      switch (index){
        case 0:
          $http.get('resources/razonamiento_verbal.json')
            .success(function (data) {
              $rootScope.currentTest = data;
              $location.url("evaluacion/test");
            }).error(function(){
              $Toast.show('Lo sentimos, aun no se habilito el test..');
            });
          break;
        case 1:
          $http.get('resources/razonamiento_numerico.json')
            .success(function (data) {
              $rootScope.currentTest = data;
              $location.url("evaluacion/test");
            }).error(function(){
              $Toast.show('Lo sentimos, aun no se habilito el test..');
            });
          break;
        case 2:
          $http.get('resources/razonamiento_abstracto.json')
            .success(function (data) {
              $rootScope.currentTest = data;
              $location.url("evaluacion/test");
            }).error(function(){
              $Toast.show('Lo sentimos, aun no se habilito el test..');
            });
          break;
        case 3:
          $http.get('resources/razonamiento_mecanico.json')
            .success(function (data) {
              $rootScope.currentTest = data;
              $location.url("evaluacion/test");
            }).error(function(){
              $Toast.show('Lo sentimos, aun no se habilito el test..');
            });
          break;
        case 4:
          $http.get('resources/relaciones_espaciales.json')
            .success(function (data) {
              $rootScope.currentTest = data;
              $location.url("evaluacion/test");
            }).error(function(){
              $Toast.show('Lo sentimos, aun no se habilito el test..');
            });
          break;
        case 5:
          $http.get('resources/ortografia.json')
            .success(function (data) {
              $rootScope.currentTest = data;
              $location.url("evaluacion/test");
            }).error(function(){
              $Toast.show('Lo sentimos, aun no se habilito el test..');
            });
          break;
      }
    }


  });
