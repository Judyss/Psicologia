'use strict';
/**
 * @ngdoc function
 * @name emiApp.controller:FormularioViewCtrl
 * @description
 * # FormularioViewCtrl
 * Controller of the emiApp
 */
angular.module('emiApp')
  .controller('FormularioViewCtrl', function ($scope, $rootScope, $http, $interval, $routeParams, Restangular, $ApiUrls, $mdDialog, $location, $timeout, RestFormService, JsonService, AnswerService, QuestionService, $Toast, AuthService) {
    //initial params
    $scope.form = {};
    $scope.seconds = 120;
    $scope.seconds_solved_test = 0;
    $scope.Questions = [];
    $scope.currentFormId = $routeParams.id;
    $scope.current_question = 0;

    $scope.statusForm = 0;//cargando
    $scope.autorized = false;
    var intervalTimeSolved;
    //get Form instance
    if ($scope.currentFormId) {
      AuthService.login().then(function (dataa) {
        //console.log("data ligga", dataa);
        Restangular.all($ApiUrls.Answer).getList()
          .then(function (data) {
            var exist = false;
            console.log("-->", $scope.currentFormId, data);
            for(var i = 0; i < data.length;i++){
              if (dataa.id == data[i].owner && $scope.currentFormId == data[i].form) {
                exist = true;
              }
            }
            console.log("exist: " + exist);
            if(!exist){
              loadForm();
            }else{
              $scope.statusForm = 3;
            }
          }, function (data) {

          });
      });
    } else {
      $location.url('/Formulario/list');
    }
    function loadForm(){
      QuestionService.getDetail($scope.currentFormId)
        .then(function (data) {
          Restangular.all($ApiUrls.FormEnabled).get(data[0].form_enabled)
            .then(function (dataEnabled) {
              function accountEnabledForm(list, id) {
                var flag = false;
                for (var i = 0; i < list.length && !flag; i++) {
                  if (list[i] == id) {
                    flag = true;
                  }
                }
                return flag;
              }

              if (dataEnabled.enabled || accountEnabledForm(dataEnabled.accounts, $rootScope.currentUser.id)) {
                $scope.form = data[0];
                $scope.Questions = data[1];
                $scope.openInstructions();
                $scope.seconds = $scope.form.time;

                $scope.statusForm = 2;//cargado y llenar
              } else {
                $scope.statusForm = 3;//inhabilitado
                $Toast.show("El cuestionario no esta disponible");
              }
            });
        }, function () {
          $location.url('/Formulario/list');
          $Toast.show('No hemos podido encontrar el test');
        });
    }

    $scope.timerSendAutomatic = null;
    //time interval
    $scope.startTime = function () {
      $scope.timerSendAutomatic = $interval(function () {
        $scope.seconds--;
        if ($scope.seconds <= 0) {
          $interval.cancel($scope.timerSendAutomatic);
          $scope.finishTest();
        }
      }, 1000);

      intervalTimeSolved = $interval(function () {
        $scope.seconds_solved_test++;
      }, 1000);
    };

    $scope.$watch('Questions',function(aa,bb){
      console.log("--------------------======------");
      console.log(aa,bb);
      $scope.setQuestion($scope.current_question + 1);
    }, true);
    $scope.finishTest = function () {
      $interval.cancel(intervalTimeSolved);
      if($scope.timerSendAutomatic != null){
        $interval.cancel($scope.timerSendAutomatic);
      }
      $rootScope.finishFormMessage();
      AnswerService.add($scope.Questions, $scope.currentFormId, $scope.seconds_solved_test)
        .then(function (data) {
          //console.log(data);
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



    $rootScope.finishFormMessage = function(){
      $mdDialog.show({
          controller: 'FinishFormModalController',
          templateUrl: 'views/modals/formulario/finish_form.html',
          parent: angular.element(document.body),
          //targetEvent: ,
          clickOutsideToClose: true
        })
        .then(function (data) {
          $location.url("/Formulario/list");
        }, function () {
          $location.url("/Formulario/list");
        });
    }

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
  })
  .controller('FinishFormModalController', function ($scope, $rootScope, $mdDialog) {
    $scope.cancel = function () {
      $mdDialog.cancel();
    };
    $scope.answer = function (data) {
      $mdDialog.hide(data);
    };
  });

