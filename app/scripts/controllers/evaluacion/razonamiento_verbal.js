'use strict';
/**
 * @ngdoc function
 * @name psicologiaApp.controller:EvaluacionRazonamientoVerbalCtrl
 * @description
 * # EvaluacionRazonamientoVerbalCtrl
 * Controller of the psicologiaApp
 */
angular.module('psicologiaApp')
  .controller('EvaluacionRazonamientoVerbalCtrl', function ($scope, $rootScope, $http, $timeout, $interval, $mdDialog, $location, $API,base64) {

    $scope.segundos = 0;
    $scope.minutos = 0;

    $scope.data = {};

    $scope.startTime = function(){
      $scope.segundos = 59 ;
      $scope.minutos = 2;

      function loopTime(){
        var flag = true;
        if($scope.segundos - 1>=0){
          $scope.segundos--;
        }else{
          if($scope.minutos - 1 >=0){
            $scope.minutos --;
            $scope.segundos = 59;
          }else{
            flag = false;
            $scope.finishTest();
          }
        }
        if(flag){
          $timeout(function(){loopTime()},1000);
        }
      }
      loopTime();
    };

    $scope.finishTest = function(){
      var resp = new $API.razonamiento_verbal;
      console.log($scope.data);

      var data = [];

      for(var i =0 ;i <$rootScope.currentTest.length;i++ ){
        data.push($rootScope.currentTest.respuesta);
      }

      console.log(data);
      resp.id_users = $rootScope.currentUser.id;
      resp.respuestas = base64.encode(angular.toJson(data));
      resp.$save(function(data){
          console.log(data);
      });
    };

    $scope.openInstrucciones = function (ev) {
      $mdDialog.show({
        controller: 'RazonamientoVerbalModalCtrl',
        templateUrl: 'razonamientoVerbalModal.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true
      })
        .then(function (answer) {
          $scope.startTime();
        }, function () {
          $scope.startTime();
        });
    };
    $scope.openInstrucciones();


    $scope.pregunta_actual = 0;
    $scope.setPregunta = function (index) {
      if(index >= $rootScope.currentTest.length){
        index = 0;
      }
      if(index <0 ){
        index = $rootScope.currentTest.length - 1;
      }
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
