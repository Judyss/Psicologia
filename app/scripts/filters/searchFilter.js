'use strict';
/**
 * @ngdoc filter
 * @name emiApp.filter:SearchFilter
 * @function
 * @description
 * # SearchFilter
 * Filter in the emiApp.
 */
angular.module('emiApp')
  .filter('SearchFilter', function () {
    return function (input, a, b) {
      var ObjectResult = {};
      var flagFinish = false;
      console.log(input,a,b );
      if (input) {
        for (var i = 0; i < input.length && !flagFinish; i++) {
          if (input[i][a] + "" === b + "") {
            ObjectResult = input[i];
            flagFinish = true;
          }
        }
      }
      return ObjectResult;
    };
  })
  .filter('SpecialtyFilter', function (Restangular, $ApiUrls, SpecialtyService, $q) {
//var Specialty = SpecialtyService.Specialty;

    var defer = $q.defer();
    Restangular.all($ApiUrls.Specialty).getList().then(function (data) {
      defer.resolve(data);
    });
    return function (id) {
      return SpecialtyService.get().then(function (Specialty) {
        console.log(Specialty, id);
        var result = "";
        if (id) {
          for (var i = 0; i < Specialty.length; i++) {
            if (id === Specialty[i].id) {
              result = Specialty[i].name;
            }
          }
        }
        return result;
      });
    };
    /*function (id) {
      Specialty = data;
      console.log(Specialty, id);
      var result = "";
      if (id) {
        for (var i = 0; i < Specialty.length; i++) {
          if (id === Specialty[i].id) {
            result = Specialty[i].name;
          }
        }
      }
    };*/
  });
