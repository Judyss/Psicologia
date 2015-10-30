'use strict';
/**
 * @ngdoc function
 * @name emiApp.controller:FormularioNuevoCtrl
 * @description
 * # FormularioNuevoCtrl
 * Controller of the emiApp
 */
angular.module('emiApp')
  .controller('FormularioNuevoCtrl', function ($scope, $ApiUrls, Restangular, $Toast, $routeParams, $location, JsonService) {

    var modelQuestion = {
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
    if ($routeParams.id) {
      $scope.Questions = [];
      Restangular.all($ApiUrls.Form).get($routeParams.id)
        .then(function (data) {
          $scope.form = data;
          Restangular.all($ApiUrls.FormQuestion).get(data.id)
            .then(function (data) {
              console.log(3232323);
              for(var i = 0;i < data.length;i++){
                data[i].values = JsonService.decode_unicode(data[i].values);
              }
              console.log(data);
              $scope.Questions = data;
            })
        }, function () {
          $location.url('/Formulario/nuevo')
        })
    } else {
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
            for(var i = 0; i < $scope.Questions.length ; i++){
              saveQuestion($scope.Questions[i]);
            }
          }, function (data) {
            $Toast.show('Ha ocurrido un error');
          })
      }
    };
    $scope.$watch('Questions', function (data1, data2) {
      var arrayIdChange = [],
        flagChange = false,
        i, j;
      for (i = 0; i < data1.length; i++) {
        flagChange = true;
        for (j = 0; j < data2.length; j++) {
          if (angular.equals(data1[i], data2[j])) {
            flagChange = false;
          }
        }
        if (flagChange) {
          arrayIdChange.push(i);
        }
      }
      for (i = 0; i < arrayIdChange.length; i++) {
        saveQuestion($scope.Questions[arrayIdChange[i]]);
      }
    }, true);

    function saveQuestion(Question) {
      if(!$scope.form.id){
        return
      }

      var myFormData = new FormData();
      angular.forEach(Question, function (value, key) {
        if(key == 'id') return;
        if(key == 'values'){
          value  = JsonService.encode_unicode(value);
        }
        myFormData.append(key, value);
      });
      myFormData.append('form', $scope.form.id);

      if(Question.id) {
        Restangular.one($ApiUrls.Question, Question.id)
          .withHttpConfig({transformRequest: angular.identity})
          .customPUT(myFormData, undefined, undefined, {'Content-Type': undefined})
          .then(function (data) {
          }, function (data) {
          });
      }else{
        Restangular.all($ApiUrls.Question)
          .withHttpConfig({transformRequest: angular.identity})
          .customPOST(myFormData, undefined, undefined, {'Content-Type': undefined})
          .then(function (data) {
            var flag = false;
            for(var i = 0;i< $scope.Questions.length && !flag; i++){
              if(angular.equals($scope.Questions[i], Question)){
                $scope.Questions[i] = data;
                flag = true;
              }
            }
            if(flag){
              console.log('eliminar');
                //Restangular.o
            }else{
              console.log('aumentar');
            }
          }, function (data) {
          });
      }
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
