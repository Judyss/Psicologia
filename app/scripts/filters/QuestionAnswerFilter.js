'use strict';

/**
 * @ngdoc filter
 * @name emiApp.filter:QuestionAnswerFilter
 * @function
 * @description
 * # QuestionAnswerFilter
 * Filter in the emiApp.
 */
angular.module('emiApp')
  .filter('formQuestionNumber', function () {
    return function (numberInputs) {
      var virtualArray = [], i;
      numberInputs = Number(numberInputs);
      if(angular.isNumber(numberInputs)){
        for(i = 0 ; i < numberInputs; i++){
          virtualArray.push({id:(i+1)});
        }
      }else{
        virtualArray.push({id:1});
      }

      return virtualArray;
    };
  });
