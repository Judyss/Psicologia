'use strict';

/**
 * @ngdoc function
 * @name emiApp.controller:FormularioAnswerCtrl
 * @description
 * # FormularioAnswerCtrl
 * Controller of the emiApp
 */
angular.module('emiApp')
  .controller('FormularioAnswerCtrl', function ($scope, $rootScope, Restangular, $ApiUrls, $routeParams, $location, RestFormService) {
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
  });
