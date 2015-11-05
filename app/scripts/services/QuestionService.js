'use strict';

/**
 * @ngdoc service
 * @name emiApp.QuestionService
 * @description
 * # QuestionService
 * Service in the emiApp.
 */
angular.module('emiApp')
  .service('QuestionService', function (Restangular, $ApiUrls, RestFormService, $location, $q, JsonService) {
    function getDetail(formId) {
      var defer = $q.defer();
      Restangular.all($ApiUrls.Form).get(formId)
        .then(function (dataForm) {
          RestFormService.get($ApiUrls.FormQuestion, dataForm.id)
            .then(function (data) {
              for (var i = 0; i < data.length; i++) {
                data[i].image_url = data[i].image;
                data[i].image = '';
                data[i].values = JsonService.decode_unicode(data[i].values);
              }
              defer.resolve([dataForm, data]);
            }, function(data){
              defer.reject(data);
            });
        }, function (data) {
          defer.reject(data);
        });
      return defer.promise;
    }

    return {
      getDetail: getDetail
    };
  });
