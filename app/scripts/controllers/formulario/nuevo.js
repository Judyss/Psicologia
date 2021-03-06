'use strict';
/**
 * @ngdoc function
 * @name emiApp.controller:FormularioNuevoCtrl
 * @description
 * # FormularioNuevoCtrl
 * Controller of the emiApp
 */
angular.module('emiApp')
  .controller('FormularioNuevoCtrl', function ($scope, $rootScope, $ApiUrls, Restangular, $Toast, $routeParams, $location, JsonService, $q, RestFormService, $timeout, QuestionService, $mdDialog, FormService) {
    if (!$scope.notRepeatRequests) {
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

    $scope.currentFormId = $routeParams.id;
    if ($scope.currentFormId) {
      $scope.Questions = [];
      $scope.QuestionsFiles = [];
      $Toast.show("Espere un momento por favor. Cargando...");

      QuestionService.getDetail($scope.currentFormId)
        .then(function (data) {
          $scope.form = data[0];
          $scope.Questions = data[1];
          $scope.QuestionsFiles = angular.copy(data);
          $timeout(function () {
            $scope.enable_auto_updated_questions = false;
          });

          Restangular.all($ApiUrls.FormEnabled).get($scope.form.form_enabled)
            .then(function (data) {
              console.log(data);
              $scope.form_enabled = data;
              $Toast.show("Ahora puede editar");
            })
        }, function () {
          $location.url('/Formulario/nuevo');
          $Toast.show('No hemos podido encontrar el test');
        });
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
      $scope.changesPending++;
      FormService.save(form).then(function (data) {
        $scope.form = data;
        $scope.changesPending--;
        var promisesSaveQuestions = [];
        for (var i = 0; i < $scope.Questions.length; i++) {
          promisesSaveQuestions.push(saveQuestion($scope.Questions[i]));
        }
        $q.all(promisesSaveQuestions).then(function (data) {
          $Toast.show('Se guardado sus cambios');
        });

        Restangular.all($ApiUrls.FormEnabled).get(data.form_enabled)
          .then(function (data) {
            $scope.form_enabled = data;
          });
      }, function () {
        $Toast.show('Ha ocurrido un error');
      });
    };

    $scope.changesPending = 0;
    $scope.changeImage = function (question, data) {
      console.log(question, data);
      RestFormService.patch($ApiUrls.Question, data, question.id)
        .then(function (data) {
          console.log(data);
        })
    };

    function saveQuestion(Question) {
      var defer = $q.defer();
      if (!$scope.form.id) {
        return
      }
      $scope.changesPending++;
      QuestionService.save(Question, $scope.form.id).then(function (data) {
        $scope.changesPending--;
        for (var i = 0; i < $scope.Questions.length; i++) {
          if (angular.equals($scope.Questions[i], Question)) {
            $scope.Questions[i] = data;
          }
        }
        defer.resolve(data);
      }, function (data) {
        defer.resolve(data);
      });
      return defer.promise;
    }

    $scope.deleteQuestion = function (Question, index) {
      QuestionService.remove(Question.id)
        .then(function () {
          $Toast.show('Pregunta Eliminada');
          $scope.Questions.splice(index, 1);
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
    };

    $scope.publish = function (ev) {
      if (!$scope.currentFormId) {
        $Toast.show("Primero debe guardar el cuestionario");
        return;
      }
      $rootScope.tempFormId = $scope.currentFormId;
      $rootScope.tempFormEnabled = $scope.form_enabled;
      $mdDialog.show({
          controller: 'PublishModalController',
          templateUrl: 'views/modals/formulario/publish.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose: true
        })
        .then(function (data) {
          $scope.form_enabled = data;
          //$scope.$aply
          $Toast.show("Ha sido publicado con exito");
        }, function () {
          $scope.status = 'You cancelled the dialog.';
        });
    }
  })
  .controller('PublishModalController', function ($scope, $rootScope, $mdDialog, $timeout, $q, Restangular, $ApiUrls) {

    $scope.cancel = function () {
      $mdDialog.cancel();
    };
    $scope.answer = function (params_publish) {
      $mdDialog.hide(params_publish);
    };

    $scope.send_list = [];

    $scope.loadSend_list = function () {
      Restangular.all($ApiUrls.SendList).getList()
        .then(function (data) {
          $scope.send_list = data;
        })
    }();

    $scope.copy_sendList = function () {
      console.log($scope.send_list);
      console.log($scope.all_people);
      console.log($scope.params_publish.peoples);
      var list_received = $scope.send_list[0].list;
      var temp_list = [];
      for (var i = 0; i < $scope.all_people.length; i++) {
        for (var j = 0; j < list_received.length; j++) {
          if ($scope.all_people[i].id == list_received[j]) {
            temp_list.push($scope.all_people[i]);
          }
        }
      }
      $scope.params_publish.peoples = temp_list;
    };

    $scope.publish = function (params_publish) {
      var myFormData = new FormData(), i;
      myFormData.append("enabled", params_publish.enabled);
      myFormData.append("auth", params_publish.auth);
      myFormData.append("max_answer", params_publish.max_answer);
      for (i = 0; i < params_publish.peoples.length; i++) {
        myFormData.append("accounts", params_publish.peoples[i].id);
      }
      Restangular.one($ApiUrls.FormEnabled, $scope.form_enabled.id)
        .withHttpConfig({transformRequest: angular.identity})
        .patch(myFormData, undefined, {'Content-Type': undefined})
        .then(function (data) {
          $mdDialog.hide(data);
        }, function (data) {

        });
    };

    /*$scope.params_publish = {
      all: false,
      auth: true,
      max_answer: 1,
      url: location.origin + "/#/Formulario/view/" + $scope.currentFormId,
      peoples: []
    };*/
    $scope.params_publish = {};
    $scope.currentFormId = angular.copy($rootScope.tempFormId);
    $scope.form_enabled = angular.copy($rootScope.tempFormEnabled);
    $scope.params_publish = $scope.form_enabled;
    $scope.params_publish.url = location.origin + "/#/Formulario/view/" + $scope.currentFormId;
    console.log($scope.params_publish);


    $scope.all_people = [];
    $scope.filterSelected = true;
    $scope.querySearch = function (query) {
      var results = query ?
        $scope.all_people.filter(createFilterFor(query)) : [];
      return results;
    };

    function createFilterFor(query) {
      return function filterFn(contact) {
        return (contact.name.toLowerCase().indexOf(query.toLowerCase()) != -1);
      };
    }

    function loadContacts() {
      $scope.params_publish.peoples = [];
      var accounts = $scope.form_enabled.accounts, i, j, peoples = [];
      Restangular.all($ApiUrls.People).getList().then(function (data) {
        for (i = 0; i < data.length; i++) {
          data[i].full_name = data[i].first_name + " " + data[i].last_name;
          for (j = 0; j < accounts.length; j++) {
            if (data[i].id === accounts[j]) {
              peoples.push(data[i]);
            }
          }
        }
        var mapping = [], peoples2 = [];
        data.map(function (c, index) {
          mapping.push({name: c.full_name, image: c.image, id: c.id});
        });
        peoples.map(function (c, index) {
          peoples2.push({name: c.full_name, image: c.image, id: c.id});
        });
        $scope.all_people = mapping;
        $scope.params_publish.peoples = peoples2;
      });
    }

    loadContacts();
  });
