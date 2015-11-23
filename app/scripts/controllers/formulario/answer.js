'use strict';

/**
 * @ngdoc function
 * @name emiApp.controller:FormularioAnswerCtrl
 * @description
 * # FormularioAnswerCtrl
 * Controller of the emiApp
 */
angular.module('emiApp')
  .controller('FormularioAnswerCtrl', function ($scope, $rootScope, Restangular, $ApiUrls, $routeParams, $location, RestFormService, $mdDialog) {
    $scope.form_id = $routeParams.id;
    if ($routeParams.id) {
      $scope.list_answer = [];
      //$scope.form
      RestFormService.get($ApiUrls.Form, $routeParams.id)
        .then(function (data) {
          $scope.form = data;
        });
      RestFormService.get($ApiUrls.AnswerDetail)
        .then(function (data) {
          console.log(data);
          $scope.list_answer = data;
        })
    } else {
      $location.url('/Formulario/list');
    }

    $scope.show_answers = function (idAccount, formId) {
      $rootScope.idAccount = idAccount;
      $rootScope.formId = formId;
      $mdDialog.show({
          controller: 'FormularioAnswerModalCtrl',
          templateUrl: 'views/modals/formulario/answer.html',
          parent: angular.element(document.body),
          //targetEvent: ,
          clickOutsideToClose: true
        })
        .then(function (data) {
          //$location.url("/Formulario/list");
        }, function () {
          //  $location.url("/Formulario/list");
        });
    }
  });
angular.module('emiApp')
  .controller('FormularioAnswerModalCtrl', function ($scope, $rootScope, Restangular, $ApiUrls, $routeParams, $location, RestFormService, $mdDialog, JsonService) {
    $scope.form = {};
    $scope.idAccountStudent = $rootScope.idAccount;
    function normalizeResponse(data) {
      data.image_url = data.image;
      data.image = '';
      if (data.values) {
        data.values = JsonService.decode_unicode(data.values);
      }
      return data;
    }

    RestFormService.get($ApiUrls.FormQuestion, $rootScope.formId)
      .then(function (data) {
        for (var i = 0; i < data.length; i++) {
          data[i] = normalizeResponse(data[i]);
        }
        $scope.form = data;
        RestFormService.get($ApiUrls.Answer)
          .then(function (data2) {
            console.log($scope.idAccountStudent, data2);
            for (var i = 0; i < data2.length; i++) {
              if ($scope.idAccountStudent == data2[i].owner) {
                console.log(data2[i].owner);
                $scope.answeres = data2[i];
                $scope.answeres = normalizeResponse(data2[i]);
                break;
              }
            }
            $scope.result_form($scope.form, $scope.answeres);
          });
      });
    $scope.result_form = function (form, answersData) {
      var good = 0;
      var err = 0;
      var answers = answersData.values;
      console.log(answers);
      for (var i = 0; (i < form.length) && (i < answers.length); i++) {
        if (answers[i].answer_array[0] == form[i].is_answer + 1) {
          good++;
        } else {
          err++;
        }
      }
      $scope.good = good;
      $scope.err = err;

    }
  });
