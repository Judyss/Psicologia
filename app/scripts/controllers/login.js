'use strict';
/**
 * @ngdoc function
 * @name emiApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the emiApp
 */
angular.module('emiApp')
  .controller('LoginCtrl', function ($scope, $rootScope, $Toast ,AuthService, $location) {
    $scope.credentials = {
      username: '@gmail.com',
      password: ''
    };

    $scope.login = function (credentials) {
      $Toast.show('Ingresando...');
      AuthService.login(credentials)
        .then(function(data){
          console.log(data);
          $rootScope.currentUser = data;
          $Toast.show('Bienvenido '+ data.username);
          $location.url('/');
        },function(data){
          switch (data.status) {
            case 401:
              $Toast.show('Usuario o contraseña invalidos');
              break;
          }
        });
    };
  });
