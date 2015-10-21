'use strict';

/**
 * @ngdoc function
 * @name psicologiaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the psicologiaApp
 */
angular.module('psicologiaApp')
  .controller('MainCtrl', function ($scope, $rootScope, $API, $Toast, AuthService,$location) {
    $scope.email = '';
    $scope.password = '';

    $scope.credentials = {
      email:'eyvind_coaquira@hotmail.com',
      password:'admin'
    };

    $scope.loginApp = function(crendenciales){
      console.log(crendenciales);
      AuthService.login(crendenciales.email,crendenciales.password)
        .then(function(data){
          console.log(data);
          $Toast.show("Bienvenido: "+ data.user.name);
          $rootScope.currentUser = data.user;
          $location.url("/evaluacion");
        },function(){
          $Toast.show("Usuario o contrasena invalidos");
        })
    };

    $scope.logout = function(){
      AuthService.logout();
      window.location.reload();
    };
  });
