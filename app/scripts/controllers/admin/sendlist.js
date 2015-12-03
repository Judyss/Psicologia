'use strict';

/**
 * @ngdoc function
 * @name emiApp.controller:AdminSendlistCtrl
 * @description
 * # AdminSendlistCtrl
 * Controller of the emiApp
 */
angular.module('emiApp')
  .controller('AdminSendListCtrl', function ($scope, $rootScope, $timeout, $q, Restangular, $ApiUrls, $Toast) {

    $scope.exportAction = function (typ) {
      switch (typ) {
        case 'pdf':
          $scope.$broadcast('export-pdf', {});
          break;
        case 'excel':
          $scope.$broadcast('export-excel', {});
          break;
        case 'doc':
          $scope.$broadcast('export-doc', {});
          break;
        default:
          console.log('no event caught');
      }
    };
    $scope.list_people_answers = [];

    $scope.all_people = [];
    $scope.peoples = [];

    $scope.saved_list = [];

    $scope.querySearch = function (query) {
      var results = query ?
        $scope.all_people.filter(createFilterFor(query)) : [];

      var anotherResults = [];
      for(var  i = 0 ; i < results.length; i++){
        if(results[i].student != null){
          anotherResults.push(results[i]);
        }
      }
      results = anotherResults;
      return results;
    };

    function createFilterFor(query) {
      return function filterFn(contact) {
        console.log(query, contact);
        return (contact.info.full_name.toLowerCase().indexOf(query.toLowerCase()) != -1);
      };
    }
    $scope.print = function(){
      print();
    };

    $scope.saved_list = {};
    function loadContacts() {
      Restangular.all($ApiUrls.SendList).getList()
        .then(function (data) {
          //console.log(data);
          $scope.saved_list = data[0];
          var accounts = $scope.saved_list.list, i, j, peoples = [];
          Restangular.all($ApiUrls.AccountDetail).getList().then(function (data) {
            for (i = 0; i < data.length; i++) {
             // if(data[i].student != null){
                data[i].info.full_name = data[i].info.first_name + " " + data[i].info.last_name;
                for (j = 0; j < accounts.length; j++) {
                  if (data[i].id === accounts[j]) {
                    peoples.push(data[i]);
                  }
                }
              //}
            }
            var mapping = [], peoples2 = [];
            data.map(function (account, index) {
              account = Object.assign(account, {full_name: account.info.full_name});
              mapping.push(account);
            });
            peoples.map(function (account, index) {
              account = Object.assign(account, {full_name: account.info.full_name});
              peoples2.push(account);
            });
            $scope.all_people = mapping;
            //$scope.peoples = peoples2;
            $scope.list_people_answers = peoples2;
          });

        });
    }

    loadContacts();

    $scope.add_list = function (list) {
      console.log($scope.list_people_answers, list);
      for (var i = 0; i < list.length; i++) {
        var exist = true;
        for (var j = 0; j < $scope.list_people_answers.length; j++) {
          if ($scope.list_people_answers[j].id === list[i].id) {
            exist = false;
          }
        }
        if (exist) {
          $scope.list_people_answers.push(list[i]);
        }
      }
//      $scope.list_people_answers = $scope.list_people_answers.concat(list);
    };

    $scope.delete_list = function (index) {
      $scope.list_people_answers.splice(index, 1);
    };

    $scope.actualizar_lista = function () {
      var myFormData = new FormData(), i;

      for (i = 0; i < $scope.list_people_answers.length; i++) {
        myFormData.append("list", $scope.list_people_answers[i].id);
      }
      myFormData.append("year", 2015);
      myFormData.append("period", 1);
      Restangular.one($ApiUrls.SendList, $scope.saved_list.id)
        .withHttpConfig({transformRequest: angular.identity})
        .patch(myFormData, undefined, {'Content-Type': undefined})
        .then(function (data) {
          $Toast.show("Enviado exitosamente");
          console.log(data);
        }, function (data) {
          $Toast.show("Ha ocurrido un error al enviar");
        });
    }
  });
