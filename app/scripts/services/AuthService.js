'use strict';

/**
 * @ngdoc service
 * @name emiAppApp.AuthService
 * @description
 * # AuthService
 * Service in the emiAppApp.
 */
angular.module('psicologiaApp')
  .service('AuthService', function ($http, TokenService, $location, $route, $q, $API) {

    function login(email, password) {
      var defer = $q.defer();
      var data = {
        'email': email,
        'password': password
      };
      $API.authenticate.save(data).$promise.then(
        function(data){
          TokenService.set(data.token);
          defer.resolve(data);
        },
        function(err){
          defer.reject(err);
        }
      );
      return defer.promise;
    }

    function autoLogin() {
      var defer = $q.defer();
      $API.authenticate.get().$promise.then(
        function(data){
          defer.resolve(data);
        },
        function(err){
          defer.reject(err);
        }
      );
      return defer.promise;
    }

    function logout() {
      var defer = $q.defer();
      $API.logout.get().$promise.then(
        function(data){
          defer.resolve(data);
        },
        function(err){
          defer.reject(err);
        }
      );
      return defer.promise;
    }

    function isLogged() {
      return !!TokenService.get()
    }

    return {
      login: login,
      autoLogin: autoLogin,
      logout: logout,
      isLogged: isLogged
    }
  });
