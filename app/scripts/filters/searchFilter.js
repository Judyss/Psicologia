'use strict';

/**
 * @ngdoc filter
 * @name emiApp.filter:SearchFilter
 * @function
 * @description
 * # SearchFilter
 * Filter in the emiApp.
 */
angular.module('emiApp')
  .filter('SearchFilter', function () {
    return function (input, a,b) {
      var ObjectResult = {};
      var flagFinish = false;
      if(input){
        for(var i = 0; i<input.length && !flagFinish;i++){
          if(input[i][a]==b){
            ObjectResult = input[i];
            flagFinish = true;
          }
        }
      }
      return ObjectResult;
    };
  });
