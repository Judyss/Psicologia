'use strict';
/**
 * @ngdoc function
 * @name emiApp.controller:FormularioNuevoCtrl
 * @description
 * # FormularioNuevoCtrl
 * Controller of the emiApp
 */
Object.create(File.prototype);
angular.module('emiApp')
  .controller('FormularioNuevoCtrl', function ($scope, $ApiUrls, Restangular, $Toast, $routeParams, $location, JsonService, $q, RestFormService, $timeout) {
    if(!$scope.notRepeatRequests){
      $scope.notRepeatRequests = true;
      return;
    }
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
      $scope.QuestionsFiles = [];
      RestFormService.get($ApiUrls.Form, $routeParams.id)
        .then(function (data) {
          $scope.form = data;
          Restangular.all($ApiUrls.FormQuestion).get(data.id)
            .then(function (data) {
              for (var i = 0; i < data.length; i++) {
                data[i].image_url = data[i].image;
                data[i].image = '';
                data[i].values = JsonService.decode_unicode(data[i].values);
              }
              $scope.Questions = data;
              $scope.QuestionsFiles = angular.copy(data);
              $timeout(function(){
                $scope.enable_auto_updated_questions = true;
              });
            })
        }, function () {
          $location.url('/Formulario/nuevo')
        })
    } else {
      $scope.enable_auto_updated_questions = true;
      $scope.Questions = [];
      $scope.QuestionsFiles = [];
      $scope.form = Restangular.all($ApiUrls.Form);
      $scope.form.name = "";
      $scope.form.description = "";
      $scope.newQuestion();
    }
    $scope.saveForm = function (form) {
      var data = {
        name: form.name || '',
        description: form.description || '',
        theme: form.theme || '--',
        image: form.image || '',
        image_url: form.image_url || null
      };
      $scope.changesPending++;
      var response = form.id ? RestFormService.patch($ApiUrls.Form, data, form.id) : RestFormService.post($ApiUrls.Form, data);
      response.then(function (data) {
        $scope.form = data;
        $scope.changesPending--;

        var promisesSaveQuestions = [];
        for (var i = 0; i < $scope.Questions.length; i++) {
          promisesSaveQuestions.push(saveQuestion($scope.Questions[i]));
        }
        $q.all(promisesSaveQuestions).then(function(data){
          console.log('several save', data);
          $Toast.show('Se guardado sus cambios');
        })
      }, function () {
        $Toast.show('Ha ocurrido un error');
      });
    };
    $scope.changesPending = 0;
    $scope.changeImage = function(question, data){
      console.log(question,data);
      RestFormService.patch($ApiUrls.Question, data, question.id )
        .then(function(data){
          console.log(data);
        })
    };
    //Auto saving Form
    /*$scope.$watchCollection('QuestionsFiles', function (data1, data2) {
      console.log(data1);
      console.log(data2);
      var index = -1;
      for (var i = 0; i < data1.length && index === -1; i++) {
        console.log(i,data1[i], data2[i], angular.equals(data1[i], data2[i]));
        if(data2[i] && !angular.equals(data1[i], data2[i])){
          index = i;
        }
      }
      console.log(index);
      if(index == -1){
        return;
      }
      console.log(data1[index]);
      console.log($scope.Questions[index]);
      RestFormService.patch($ApiUrls.Question, {image:data1[index]}, $scope.Questions[index].id )
        .then(function(data){
          $scope.QuestionsFiles [index] = data;
        })
    });

    $scope.$watch('Questions', function (data1, data2) {
      //return;
      if (!$scope.enable_auto_updated_questions) {
        return;
      }
      var arrayIdChange = [],// list index position of de question array updated
        flagChange = false,
        i, j;
      // Search Question updated
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
      //save change question updated
      for (i = 0; i < arrayIdChange.length; i++) {
        //Search items for question updated
        var customQuestion = {};
        angular.forEach(data1[arrayIdChange[i]], function (value, key) {
          //console.log(data1[arrayIdChange[i]][key], data2[arrayIdChange[i]][key]);
          if(key === 'image') return;
          if (data2[arrayIdChange[i]] && data2[arrayIdChange[i]] && !angular.equals(data1[arrayIdChange[i]][key], data2[arrayIdChange[i]][key])) {
            customQuestion[key] = value;
          }
        });
        //save new question or update question
        if (data1[arrayIdChange[i]].id) {
          customQuestion.id = data1[arrayIdChange[i]].id;
          saveQuestion(customQuestion);
        } else {
          saveQuestion(data1[arrayIdChange[i]]);
        }
      }
    }, 3);*/

    function saveQuestion(Question) {
      var defer = $q.defer();
      if (!$scope.form.id) {
        return
      }
      $scope.changesPending++;
      // save new or question update
      Question.form = $scope.form.id;
      var response = Question.id ? RestFormService.patch($ApiUrls.Question, Question, Question.id) :
        RestFormService.post($ApiUrls.Question, Question);
      response.then(function (data) {
        $scope.changesPending--;
        for (var i = 0; i < $scope.Questions.length; i++) {
          if (angular.equals($scope.Questions[i], Question)) {
            $scope.Questions[i] = data;
          }
        }
        defer.resolve(data);
      },function(data){
        defer.resolve(data);
      });
      return defer.promise;
    }

    $scope.deleteQuestion = function(Question, index){
      Restangular.one($ApiUrls.Question, Question.id).remove()
        .then(function(data){
          $Toast.show('Pregunta Eliminada');
          $scope.Questions.splice(index,1);
        })
    };

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
