'use strict';

/**
 * @ngdoc directive
 * @name emiApp.directive:ExportTable
 * @description
 * # ExportTable
 */
angular.module('emiApp')
  .directive('exportTable', function () {
    return {
      link: function (scope, element, attrs) {
        scope.$on('export-pdf', function (e, d) {
          element.tableExport({type: 'pdf', escape: false});
        });
        scope.$on('export-excel', function (e, d) {
          element.tableExport({type: 'excel', escape: false});
        });
        scope.$on('export-doc', function (e, d) {
          element.tableExport({type: 'doc', escape: false});
        });
      }
    };
  });
