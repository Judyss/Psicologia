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
    //var Authorization = 'Authorization';
    var Authorization = 'Bearer';
    return {
      set:function(token){$cookies.put(Authorization,token);},
      get:function(){return $cookies.get(Authorization)},
      update:function(token){$cookies.put(Authorization,token);},
      delete:function(){$cookies.put(Authorization,'');}
    };
  });
