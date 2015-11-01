'use strict';
/**
 * @ngdoc service
 * @name emiApp.RestFormService
 * @description
 * # RestFormService
 * Service in the emiApp.
 */
angular.module('emiApp')
  .service('RestFormService', function (Restangular, $q, JsonService) {
    //box-shadow: 0 0 0 12406px rgba(0,0,0,0.4);
    function normalizeRequest(data) {
      var myFormData = new FormData();
      angular.forEach(data, function (value, key) {
        if (key === 'image_url' || key === '$$hashKey') {
          return;
        }
        if (key === 'values' && typeof (value) === 'object') {
          value = JsonService.encode_unicode(value);
        }
        myFormData.append(key, value);
      });
      return myFormData;
    }
    function normalizeResponse(data){
      data.image_url = data.image;
      data.image = '';
      if(data.values){
        data.values = JsonService.decode_unicode(data.values);
      }
      return data;
    }

    function get(url, id) {
      var defer = $q.defer();
      var response = id ? Restangular.all(url).get(id) : Restangular.all(url).getList();
      response
        .then(function (data) {
          data = normalizeResponse(data);
          defer.resolve(data);
        }, function (data) {
          defer.reject(data);
        });
      return defer.promise;
    }

    function post(url, data) {
      var defer = $q.defer();
      var myFormData = normalizeRequest(data);
      Restangular.all(url)
        .withHttpConfig({transformRequest: angular.identity})
        .customPOST(myFormData, undefined, undefined, {'Content-Type': undefined})
        .then(function (data) {
          data = normalizeResponse(data);
          defer.resolve(data);
        }, function (data) {
          defer.reject(data);
        });
      return defer.promise;
    }

    function put(url, data, id) {
      var defer = $q.defer();
      var myFormData = normalizeRequest(data);
      Restangular.one(url, id)
        .withHttpConfig({transformRequest: angular.identity})
        .customPUT(myFormData, undefined, undefined, {'Content-Type': undefined})
        .then(function (data) {
          data = normalizeResponse(data);
          defer.resolve(data);
        }, function (data) {
          defer.reject(data);
        });
      return defer.promise;
    }

    function patch(url, data, id) {
      var defer = $q.defer();
      var myFormData = normalizeRequest(data);
      Restangular.one(url, id)
        .withHttpConfig({transformRequest: angular.identity})
        .patch(myFormData, undefined, {'Content-Type': undefined})
        .then(function (data) {
          data = normalizeResponse(data);
          defer.resolve(data);
        }, function (data) {
          defer.reject(data);
        });
      return defer.promise;
    }

    return {
      get:get,
      post: post,
      put: put,
      patch: patch
    };
  });
