'use strict';

/**
 * @ngdoc service
 * @name emiApp.FormEnabledService
 * @description
 * # FormEnabledService
 * Service in the emiApp.
 */
angular.module('emiApp')
  .service('FormEnabledService', function (Restangular, $ApiUrls, $q) {
    function FormEnabledModel(data) {
      this.enabled = data && data.enabled || false;
      this.accounts = data && data.accounts || [];
      this.max_answer = data && data.max_answer || 1;
      this.auth = data && data.max_answer || true;
    }

    function save(dataFormEnabled) {
      var defer = $q.defer();
      var response = dataFormEnabled && dataFormEnabled.id ? Restangular.one($ApiUrls.FormEnabled, dataFormEnabled.id).put(new FormEnabledModel(dataFormEnabled)) : Restangular.all($ApiUrls.FormEnabled).post(new FormEnabledModel());
      response
        .then(function (data) {
          defer.resolve(data);
        }, function (data) {
          defer.reject(data);
        });
      return defer.promise;
    }

    function remove(id) {
      var defer = $q.defer();
      if (id) {
        Restangular.one($ApiUrls.FormEnabled, id).remove()
          .then(function (data) {
            defer.resolve(data);
          }, function (data) {
            defer.reject(data);
          });
      } else {
        defer.reject();
      }
      return defer.promise;
    }

    return {
      save: save,
      remove: remove
    };
  });
