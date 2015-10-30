'use strict';
/**
 * @ngdoc service
 * @name emiApp.FileUpload
 * @description
 * # FileUpload
 * Service in the emiApp.
 */
angular.module('emiApp')
  .service('FileUploadService', function ($http, $q) {
    var defer = $q.defer();
    function uploadFileToUrl(uploadUrl, file) {
      var fd = new FormData();
      fd.append('file', file);
      $http.post(uploadUrl, fd, {
        transformRequest: angular.identity,
        headers: {'Content-Type': undefined}
      })
        .success(function (data) {
          defer.resolve(data);
        })
        .error(function (data) {
          defer.reject(data);
        });
      return defer.promise;
    }

    return {
      uploadFile: uploadFileToUrl
    }
  });
