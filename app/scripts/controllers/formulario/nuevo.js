'use strict';
/**
 * @ngdoc function
 * @name emiApp.controller:FormularioNuevoCtrl
 * @description
 * # FormularioNuevoCtrl
 * Controller of the emiApp
 */
angular.module('emiApp')
  .controller('FormularioNuevoCtrl', function ($scope, $ApiUrls, Restangular, $Toast, $routeParams, $location) {
    console.log($routeParams);
    var modelQuestion = {
      id: 1,
      question: "",
      type_question: 1,
      show_text_help: false,
      text_help: "",
      values: [{id: 1, title: ""}],
      show_image: false,
      image: "",
      required: false,
      time_question: 0,
      more_options: false,
      other: false
    };
    $scope.newQuestion = function () {
      $scope.Questions.push(angular.copy(modelQuestion));
    };

    if($routeParams.id){
      $scope.Questions = [];
      Restangular.all($ApiUrls.Form).get($routeParams.id)
        .then(function(data){
          $scope.form = data;
          Restangular.all($ApiUrls.FormQuestion).get(data.id)
            .then(function(data){
              console.log(3232323);
              $scope.Questions = data;
            })
        },function(){
          $location.url('/Formulario/nuevo')
        })
    }else{
      $scope.Questions = [];
      $scope.form = Restangular.all($ApiUrls.Form);
      $scope.form.name = "";
      $scope.form.description = "";
      $scope.newQuestion();
    }


    $scope.saveForm = function (form) {
      var data = {
        id: form.id || '',
        name: form.name || '',
        description: form.description || '',
        theme: form.theme || '--'
      };
      if (form.id) {
        Restangular.all($ApiUrls.Form).doPUT(data, form.id)
          .then(function (data) {
            $scope.form = data;
            $Toast.show('Se guardado sus cambios');
          }, function (data) {
            $Toast.show('Ha ocurrido un error');
          })
      } else {
        $scope.form.post(data)
          .then(function (data) {
            $scope.form = data;
            $Toast.show('Se guardado sus cambios');
          }, function (data) {
            $Toast.show('Ha ocurrido un error');
          })
      }
    };
    function save(Question) {
      var myFormData = new FormData();
      angular.forEach(Question, function (value, key) {
        myFormData.append(key, value);
      });
      Restangular.all($ApiUrls.Question)
        .withHttpConfig({transformRequest: angular.identity})
        .customPOST(myFormData, undefined, undefined, {'Content-Type': undefined})
        .then(function (data) {
        }, function (data) {
        });
    }

    $scope.type_questions = [
      {id: 1, name: "Texto corto"},
      {id: 2, name: "Texto largo"},
      {id: 3, name: "Seleccion multiple"},
      {id: 4, name: "Elegir de una lista"},
      {id: 5, name: "Multiples entradas"},
      {id: 6, name: "Fecha"},
      {id: 7, name: "Hora"},
      {id: 8, name: "Numero"}
    ];
    //menu Options
    $scope.print = function () {
      print();
    }
  });
