'use strict';

/**
 * @ngdoc service
 * @name emiApp.SpecialtyService
 * @description
 * # SpecialtyService
 * Service in the emiApp.
 */
angular.module('emiApp')
  .service('SpecialtyService', function (Restangular, $ApiUrls, $q) {
    var Specialty = [];

    function get() {
      var defer = $q.defer();
      Restangular.all($ApiUrls.Specialty).getList().then(function (data) {
        Specialty = data;
        defer.resolve(data);
      }, function (data) {
        defer.reject(data);
      });
      return defer.promise;
    }

    return {
      get: get
    };
  });
