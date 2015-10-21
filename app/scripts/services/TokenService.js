'use strict';

/**
 * @ngdoc service
 * @name emiAppApp.TokenService
 * @description
 * # TokenService
 * Service in the emiAppApp.
 */
angular.module('psicologiaApp')
  .service('TokenService', function ($cookies) {
    var Authorization = 'Authorization';
    return {
      set:function(token){$cookies.Authorization = token},
      get:function(){return $cookies.Authorization},
      update:function(token){$cookies.Authorization = token},
      delete:function(){$cookies.remove(Authorization)}
    };
  });
