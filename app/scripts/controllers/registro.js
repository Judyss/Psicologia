'use strict';

/**
 * @ngdoc function
 * @name psicologiaApp.controller:RegistroCtrl
 * @description
 * # RegistroCtrl
 * Controller of the psicologiaApp
 */
angular.module('psicologiaApp')
  .controller('RegistroCtrl', function ($scope, $rootScope, $API,$Toast,$location,ScrollService) {
    $scope.account = new $API.usuarios;
//    $scope.account.nombre = "Judy";
//    $scope.account.ap_paterno="Judy";
//    $scope.account.ap_materno="Geronimo";
//    $scope.account.carnet="9981765";
//    $scope.account.semestre="1er Semestre";
//    $scope.account.id_especialidad="9";
//    $scope.account.name="Judya";
//    $scope.account.email="judy@judy.com";
//    $scope.account.password="judy";
//    $scope.account.repeat_password="judy";
    $scope.account.celular="";
    $scope.account.tipo_usuario=2;
    $scope.account.activo=true;
    $scope.account.eliminado=1;
    $scope.registrar = function(cuenta){
      console.log("registrar", cuenta);
      var backup = angular.copy($scope.account);
      $scope.account.$save(function(data){
        if(!data.success){
          $scope.account = backup;
          $Toast.show('Verfique sus datos ingresados');
          return;
        }
        ScrollService.toSection("#service");
        $Toast.show('Gracias por registrarse :D !!, Ahora puede iniciar sesion ');
      },function(data){
        $Toast.show('Lo sentimos!, Ya existe usuario condatos identicos');
      });
    };



    $scope.Carreras = [
      {id:1,name:"Ingenieria Comercial"},
      {id:2,name:"Ingenieria Industrial"},
      {id:3,name:"Ingenieria en Sistemas Electronicos"},
      {id:4,name:"Ingenieria Geografica"},
      {id:5,name:"Ingenieria Civil"},
      {id:6,name:"Ingenieria Petrolera"},
      {id:7,name:"Ingenieria Mecatronica"},
      {id:8,name:"Ingenieria de Alimentos"},
      {id:9,name:"Ingenieria de Sistemas"}
    ];

    $scope.semestres = [
      {id:1,name:"1er Semestre"},
      {id:2,name:"2do Semestre"},
      {id:3,name:"3er Semestre"},
      {id:4,name:"4to Semestre"},
      {id:5,name:"5to Semestre"},
      {id:6,name:"6to Semestre"},
      {id:7,name:"7mo Semestre"},
      {id:8,name:"9vo Semestre"},
      {id:9,name:"9no Semestre"},
      {id:10,name:"10mo Semestre"}
    ]
  });
