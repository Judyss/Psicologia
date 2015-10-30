'use strict';

/**
 * @ngdoc service
 * @name emiApp.InterceptorService
 * @description
 * # InterceptorService
 * Service in the emiApp.
 */
angular.module('emiApp')
  .service('InterceptorService', function (TokenService, $rootScope, $timeout) {
    var numberRequest =  0;
    return {
      'request': function(config) {
        //console.log('request', numberRequest++, config);
        if(TokenService.get()){
          config.headers.Authorization = TokenService.getTokenName() + ' ' + TokenService.get();
        }
        return config;
      },
      'response': function(config) {
        //console.log('response', numberRequest--, config);
        if(numberRequest == 0){
          $timeout(function(){
            $rootScope.first_request = false;
          }, 500);
        }
        return config;
      }
    }
  });
