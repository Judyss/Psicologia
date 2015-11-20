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

    function save(Question, formId) {
      var defer = $q.defer();
      if (!formId) {
        return;
      }
      // save new or question update
      Question.form = formId;
      var response = Question.id ? RestFormService.patch($ApiUrls.Question, Question, Question.id) : RestFormService.post($ApiUrls.Question, Question);
      response.then(function (data) {
        defer.resolve(data);
      }, function (data) {
        defer.resolve(data);
      });
      return defer.promise;
    }
    function getDetail(formId) {
      var defer = $q.defer();
      RestFormService.get($ApiUrls.Form, formId)
        .then(function (dataForm) {
          RestFormService.get($ApiUrls.FormQuestion, dataForm.id)
            .then(function (data) {
              for (var i = 0; i < data.length; i++) {
                data[i].image_url = data[i].image;
                data[i].image = '';
                data[i].values = JsonService.decode_unicode(data[i].values);
              }
              defer.resolve([dataForm, data]);
            }, function (data) {
              defer.reject(data);
            });
        }, function (data) {
          defer.reject(data);
        });
      return defer.promise;
    }

    function remove(id) {
      var defer = $q.defer();
      if (id) {
        Restangular.one($ApiUrls.Question, id).remove()
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
      getDetail: getDetail,
      save: save,
      remove: remove
    };
  });
