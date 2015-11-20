'use strict';

/**
 * @ngdoc service
 * @name emiApp.FormService
 * @description
 * # FormService
 * Service in the emiApp.
 */
angular.module('emiApp')
  .service('FormService', function (Restangular, $ApiUrls, RestFormService, $location, $q, JsonService, FormEnabledService) {

    function save(form) {
      var defer = $q.defer(),
        isNew = !(form.id && true),
        data = {
          name: form && form.name || '',
          description: form && form.description || '',
          theme: form && form.theme || '--',
          time: form && form.time || 0,
          image: form && form.image || '',
          image_url: form && form.image_url || null,
          form_enabled: form && form.form_enabled || null
        };

      if (isNew) {
        FormEnabledService.save().then(function (dataEnabled) {
          data.form_enabled = dataEnabled.id;
          console.log('--------------');
          console.log(dataEnabled);
          RestFormService.post($ApiUrls.Form, data)
            .then(function (data) {
              defer.resolve(data);
            }, function () {
              defer.reject(data);
              FormEnabledService.remove(dataEnabled.id);
            });
        }, function (data) {
          defer.reject(data);
        });
      } else {
        RestFormService.patch($ApiUrls.Form, form, form.id)
          .then(function (data) {
            defer.resolve(data);
          }, function () {
            defer.reject(data);
          });
      }
      return defer.promise;
    }

    function remove(id) {
      var defer = $q.defer();
      if (id) {
        Restangular.one($ApiUrls.Form, id).remove()
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
