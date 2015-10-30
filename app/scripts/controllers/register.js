'use strict';
/**
 * @ngdoc function
 * @name emiApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the emiApp
 */
angular.module('emiApp')
  .controller('RegisterCtrl', function ($scope, Restangular, $ApiUrls, $Toast, StudentService, $location) {
    Restangular.all($ApiUrls.City).getList().then(function (data) {
      $scope.City = data;
    });
    Restangular.all($ApiUrls.AcademicUnit).getList().then(function (data) {
      $scope.AcademicUnit = data;
    });
    Restangular.all($ApiUrls.Specialty).getList().then(function (data) {
      $scope.Specialty = data;
    });
    Restangular.all($ApiUrls.Semester).getList().then(function (data) {
      $scope.Semester = data;
    });
    $scope.image = ""; // for preview image
    $scope.account = {
      date_of_birth: new Date("1990-01-01"),
      gender: 'M',
      city: 1,
      academicUnit: 1,
      specialty: 1,
      semester: 1,
      email: "@gmail.com",
      is_active: true
//      first_name: "emilio",
//      last_name: "coaquira",
//      phone_number: 73001767,
//      ci: "998176754",
//      email: "emilio@gmail.com",
//      password: "emilio"//,
    };
    $scope.registerStudent = function (accountInfo) {
      $Toast.show('Registrando...');
      console.log(accountInfo);
      StudentService.register(accountInfo)
        .then(function (data) {
          $Toast.show('Registrado');
          $location.url('/Login');
          //console.log(data);
        }, function (data) {
          //console.log(data);
        });
    };
  });
