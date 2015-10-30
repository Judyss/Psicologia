'use strict';
/**
 * @ngdoc service
 * @name emiApp.TokenService
 * @description
 * # TokenService
 * Service in the emiAppApp.
 */
angular.module('emiApp')
  .service('TokenService', function ($cookies) {
    //name saved token
    var TokenName = 'Token';
    return {
      set: function (token) {
        $cookies.put(TokenName, token);
      },
      get: function () {
        return $cookies.get(TokenName);
      },
      update: function (token) {
        $cookies.put(TokenName, token);
      },
      remove: function () {
        $cookies.remove(TokenName);
      },
      getTokenName: function () {
        return TokenName;
      }
    };
  });
