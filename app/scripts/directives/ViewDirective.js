'use strict';

/**
 * @ngdoc directive
 * @name emiApp.directive:ViewDirective
 * @description
 * # ViewDirective
 */
angular.module('emiApp')
  .directive('viewDirective', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the ViewDirective directive');
      }
    };
  });
