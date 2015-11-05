'use strict';
/**
 * @ngdoc function
 * @name emiApp.controller:FormularioViewCtrl
 * @description
 * # FormularioViewCtrl
 * Controller of the emiApp
 */
angular.module('emiApp')
  .controller('FormularioViewCtrl', function ($scope, $rootScope, $http, $interval, $routeParams, Restangular, $ApiUrls, $mdDialog, $location, $timeout, RestFormService, JsonService, AnswerService, QuestionService) {

    //initial params
    $scope.form = {};
    $scope.seconds = 10;
    $scope.seconds_solved_test = 0;
    $scope.Questions = [];
    $scope.currentFormId = $routeParams.id;
    $scope.current_question = 0;
    var intervalTimeSolved;
    //get Form instance
    if ($scope.currentFormId) {
      QuestionService.getDetail($scope.currentFormId)
        .then(function(data){
          $scope.form = data[0];
          $scope.Questions = data[1];
          $scope.openInstructions();
          console.log(data);
        }, function(){
          $location.url('/Formulario/list');
          $Toast.show('No hemos podido encontrar el test');
        });
    } else {
      $location.url('/Formulario/list');
    }

    //time interval
    $scope.startTime = function () {
      var intervalTime = $interval(function () {
        $scope.seconds--;
        if ($scope.seconds <= 0) {
          $interval.cancel(intervalTime);
          $scope.finishTest();
        }
      }, 1000);

      intervalTimeSolved = $interval(function () {
        $scope.seconds_solved_test++;
      }, 1000);
    };

    $scope.finishTest = function () {
      $interval.cancel(intervalTimeSolved);
      AnswerService.add($scope.Questions, $scope.currentFormId, $scope.seconds_solved_test)
        .then(function (data) {
          console.log(data);
        });
    };

    $scope.openInstructions = function (ev) {
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

    //Pagination Questions
    $scope.setQuestion = function (index) {
      if (index >= $scope.Questions.length) {
        index = 0;
      }
      if (index < 0) {
        index = $scope.Questions.length - 1;
      }
      $scope.current_question = index;
    };

  }).controller('RazonamientoVerbalModalCtrl', function ($scope, $mdDialog) {
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
