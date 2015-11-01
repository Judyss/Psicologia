'use strict';

/**
 * @ngdoc service
 * @name emiApp.Toast
 * @description
 * # Toast
 * Service in the emiApp.
 */
angular.module('emiApp')
  .service('$Toast', function ($mdToast, $q) {
    var toastPosition = {
      bottom: true,
      left: true
    };
    var getToastPosition = function () {
      return Object.keys(toastPosition)
        .filter(function (pos) {
          return toastPosition[pos];
        })
        .join(' ');
    };
    var showActionToast = function (text, action, autoHide) {
      var defer = $q.defer();
      var toast = $mdToast.simple()
        .content(text || 'Espere un momento por favor..')
        .position(getToastPosition());
      if (action) {
        toast.action(action);
      }
      if(autoHide || action){
        toast.hideDelay(null)
          .highlightAction(false);
      }
      $mdToast.show(toast).then(function () {
        defer.resolve();
      }, function () {
        if(autoHide){
          defer.resolve();
        }else{
          defer.reject();
        }
      });
      return defer.promise;
    };

    return {
      show: showActionToast
    };
  });
