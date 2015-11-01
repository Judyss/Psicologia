'use strict';
/**
 * @ngdoc service
 * @name emiApp.AuthService
 * @description
 * # AuthService
 * Service in the emiApp.
 */
angular.module('emiApp')
  .service('AuthService', function (Restangular, $ApiUrls, TokenService, $q) {
    function login(credentials) {
      var data = {
        username: credentials ? credentials.username : '',
        password: credentials ? credentials.password : ''
      };
      var defer = $q.defer();
      Restangular.all($ApiUrls.Login).post(data)
        .then(function (data) {
          TokenService.set(data.token);
          var user = data.user;
          var totalPromises = 0;
          if (data.user.info){totalPromises++;}
          if (data.user.student){totalPromises++;}
          if (!totalPromises){finishPromises(user);}
          if (data.user.info) {
            Restangular.one($ApiUrls.People, data.user.info).get().then(function (data) {
              user.People = data;
              finishPromises(user);
            });
          }
          if (data.user.student) {
            Restangular.one($ApiUrls.Student, data.user.student).get().then(function (data) {
              user.Student = data;
              finishPromises(user)
            });
          }
          function finishPromises(data) {
            totalPromises--;
            if (totalPromises <= 0) {
              defer.resolve(data);
            }
          }
        },
        function (data) {
          defer.reject(data);
        });
      return defer.promise;
    }

    function logout() {
      var defer = $q.defer();
      TokenService.remove();
      defer.resolve();
      /*Restangular.all($ApiUrls.Logout).post()
        .then(function (data) {
          TokenService.remove();
          defer.resolve();
        }, function (data) {
          //console.log(data);
          defer.reject();
        });*/
      return defer.promise;
    }

    function isLogged(){
      return TokenService.get()?true:false;
    }

    return {
      login: login,
      logout: logout,
      autoLogin: login,
      isLogged: isLogged
    }
  })
  .service('StudentService', function (Restangular, $ApiUrls, $q) {
    function register(accountInfo) {
      var defer = $q.defer();
      accountInfo.country = "Bolivia";
      accountInfo.username = accountInfo.email.split('@')[0];
      var account = angular.copy(accountInfo);
      account.image = "";
      account.date_of_birth = account.date_of_birth.getFullYear() + '-' + (account.date_of_birth.getMonth() + 1) + '-' + account.date_of_birth.getDate();
      Restangular.all($ApiUrls.People).post(account).then(function (data1) {
        Restangular.all($ApiUrls.Student).post(account).then(function (data2) {
          accountInfo.info = data1.id;
          accountInfo.student = data2.id;
          var myFormData = new FormData();
          angular.forEach(accountInfo, function (value, key) {
            myFormData.append(key, value);
          });
          Restangular.all($ApiUrls.Account)
            .withHttpConfig({transformRequest: angular.identity})
            .customPOST(myFormData, undefined, undefined, {'Content-Type': undefined})
            .then(function (data3) {
              defer.resolve(data3);
            }, function (data) {
              data1.remove();
              data2.remove();
              defer.reject(data);
            });
        }, function (data) {
          data1.remove();
          defer.reject(data);
        });
      }, function (data) {
        defer.reject(data);
      });
      return defer.promise;
    }

    return {
      register: register
    }
  });
