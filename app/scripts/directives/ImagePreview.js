'use strict';

/**
 * @ngdoc directive
 * @name emiApp.directive:imagePreview
 * @description
 * # imagePreview
 */
angular.module('emiApp')
  .directive('imagePreview', function () {
    return {
      restrict: 'A',
      scope:{
        imagePreview:'='
      },
      link: function (scope, elem) {
        var reader = new FileReader();
        reader.onload = function (e) {
          scope.imagePreview = e.target.result;
          scope.$apply();
        };

        elem.on('change', function() {
          reader.readAsDataURL(elem[0].files[0]);
        });
      }
    };
  });
