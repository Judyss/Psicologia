'use strict';

/**
 * @ngdoc service
 * @name emiAppApp.InterceptorService
 * @description
 * # InterceptorService
 * Service in the emiAppApp.
 */
angular.module('psicologiaApp')
  .service('InterceptorService', function (TokenService) {
    return {
      'request': function(config) {
        if(TokenService.get()){
          config.headers.Authorization = 'Bearer '+TokenService.get();
        }
        return config;
      }
    }
  });
