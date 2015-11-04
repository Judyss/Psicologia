'use strict';

/**
 * @ngdoc filter
 * @name emiApp.filter:TimeFilter
 * @function
 * @description
 * # TimeFilter
 * Filter in the emiApp.
 */
angular.module('emiApp')
  .filter('timeFormatting', function () {
    return function (input) {
      var timeFormatting = "00:00";
      var minutes = "";
      var seconds = "";
      if (angular.isNumber(input)) {
        minutes = "" + Math.round(input / 60);
        seconds = "" + Math.round(input % 60);
        timeFormatting = (minutes.length == 1 ? ("0" + minutes) : minutes) + ":" + (seconds.length == 1 ? ("0" + seconds) : seconds);
      }
      return timeFormatting;
    };
  });
