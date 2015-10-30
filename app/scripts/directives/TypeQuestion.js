'use strict';

/**
 * @ngdoc directive
 * @name emiApp.directive:TypeQuestion
 * @description
 * # TypeQuestion
 */
angular.module('emiApp')
  .directive('typeQuestion', function ($compile, $templateCache) {

    return {
      //restrict: 'E',
      require:'^ngModel',
      template: '<div></div>',
      scope: {
        ngModel: '=',
        question: '=',
        questionValues:'='
      },
      link: function postLink(scope, element, attrs) {
        console.log(scope, scope.question);
        scope.$watch('question.type_question', function(oldValue, newValue){
          refresh();
        });
        refresh();
        function refresh(){
          var template = '',
            maxOptions = 10,
            baseTemplateUnique='<md-checkbox md-no-ink data-ng-model="question.other" class="inline-block">Añadir otros</md-checkbox>',
            baseTemplate = '' +
              '<div ng-repeat="item in questionValues">' +
              '<figure class="input-option btn-block">' +
              //'<span class="number">{{$index + 1}}</span>' +
              '<span class="number">- </span>' +
              '<input class="buttons" placeholder="Opcion {{$index + 1}}" data-ng-model="item.title">' +
              '<span class="glyphicon glyphicon-remove"' +
              'data-ng-show="questionValues.length>1"' +
              'data-ng-click="questionValues.splice($index,1)"></span>' +
              '</figure>' +
              '</div>'+
              '<md-checkbox md-no-ink data-ng-model="question.other" class="inline-block">Añadir otros</md-checkbox>'+
              '<md-button class="md-fab md-mini md-primary pull-right" aria-label="Nueva Pregunta"' +
              'data-ng-disabled="questionValues.length>='+maxOptions+'"'+
              'data-ng-click="questionValues.length<'+maxOptions+'?questionValues.push({id: (questionValues.length+1),title:\'\'}):\'\'">' +
              '<md-icon md-svg-src="images/icons/ic_add_24px.svg"></md-icon>' +
              '</md-button>'+

              '';
          switch (scope.question.type_question){
            case "1":
              scope.questionValues=[{id:1, title:""}];
              template = baseTemplateUnique;
              break;
            case "2":
              scope.questionValues=[{id:1, title:""}];
              template = baseTemplateUnique;
              break;
            case "3":
              template = baseTemplate;
              break;
            case "4":
              template = baseTemplate;
              break;
            case "5":
              template = baseTemplate;
              break;
            case "6":
              scope.questionValues=[{id:1, title:""}];
              template = baseTemplateUnique;
              break;
            case "7":
              scope.questionValues=[{id:1, title:""}];
              template = baseTemplateUnique;
              break;
            case "8":
              scope.questionValues=[{id:1, title:""}];
              template = baseTemplateUnique;
              break;
          }
          element.html(template);
          $compile(element.contents())(scope);
        }
      }
    };
  });
