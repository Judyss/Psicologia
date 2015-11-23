'use strict';

/**
 * @ngdoc directive
 * @name emiApp.directive:TypeQuestion
 * @description
 * # TypeQuestion
 */
angular.module('emiApp')
  .directive('typeQuestion', function ($compile) {
    return {
      restrict: 'A',
      require: '^ngModel',
      template: '<div></div>',
      scope: {
        ngModel: '=',
        question: '=',
        questionValues: '='
      },
      link: function postLink(scope, element) {
        scope.$watch('question.type_question', function () {
          refresh();
        });

        scope.fillArrayValue=function(numberInputs){
          var virtualArray = [], i;
          if (angular.isNumber(numberInputs)) {
            for (i = 0; i < numberInputs; i++) {
              virtualArray.push({id: (i + 1), title: "a"+i});
            }
          } else {
            virtualArray.push({id: 1, title: "Uni"});
          }
          return virtualArray;
        };


        function refresh() {

          var template = '',
            maxOptions = 10,
            template_number = '' +
              '<md-input-container>' +
              '<label>Numero de entradas</label>' +
              '<md-select data-ng-model="question.values_number">' +
              '<md-option value="1">1</md-option>' +
              '<md-option value="2">2</md-option>' +
              '<md-option value="3">3</md-option>' +
              '<md-option value="4">4</md-option>' +
              '<md-option value="5">5</md-option>' +
              '<md-option value="6">6</md-option>' +
              '<md-option value="7">7</md-option>' +
              '<md-option value="8">8</md-option>' +
              '<md-option value="9">9</md-option>' +
              '<md-option value="10">10</md-option>' +
              '</md-select>' +
              '</md-input-container>',
            baseTemplateUnique = '<md-checkbox md-no-ink data-ng-model="question.other" class="inline-block">Añadir otros</md-checkbox>',
            baseTemplate = '' +
              '<div ng-repeat="item in questionValues">' +
              '<figure class="input-option btn-block">' +
                //'<span class="number">{{$index + 1}}</span>' +
              '<span class="number">- </span>' +
              '<input class="buttons" placeholder="Opcion {{$index + 1}}" ng-model="item.title">' +
              '<figure class="badge-is-answer" data-ng-click="question.is_answer = $index">' +
              '<i class="glyphicon" data-ng-class="(question.is_answer == $index) ?' + "'glyphicon-ok':" + "'glyphicon-minus'" + '"></i>' +
              '<md-tooltip  md-direction="top">Es respuesta correcta</md-tooltip>' +
              '</figure>' +
              '<span class="glyphicon glyphicon-remove" data-ng-show="questionValues.length>1" data-ng-click="questionValues.splice($index,1)"> </span>  ' +
              '</figure>' +
              '</div>' +
              '<md-checkbox md-no-ink data-ng-model="question.other" class="inline-block">Añadir otros</md-checkbox>' +
              '<md-button class="md-fab md-mini md-primary pull-right" aria-label="Nueva Pregunta" ' +
              'data-ng-disabled="questionValues.length >= ' + maxOptions + '" ' +
              'data-ng-click="questionValues.length <' + maxOptions + '?questionValues.push({id: (questionValues.length+1),title:\'\'}):\'\'">' +
              '<md-icon md-svg-src="images/icons/ic_add_24px.svg"></md-icon>' +
              '</md-button>' +
              '';
          switch (scope.question.type_question) {
            case "1":
              scope.questionValues = [{id: 1, title: ""}];
              template = baseTemplateUnique;
              break;
            case "2":
              scope.questionValues = [{id: 1, title: ""}];
              template = baseTemplateUnique;
              break;
            case "3":
              template = baseTemplate;
              break;
            case "4":
              template = baseTemplate;
              break;
            case "5":
              scope.questionValues = [{id: 1, title: ""}];
              template = template_number;
              break;
            case "6":
              scope.questionValues = [{id: 1, title: ""}];
              template = baseTemplateUnique;
              break;
            case "7":
              scope.questionValues = [{id: 1, title: ""}];
              template = baseTemplateUnique;
              break;
            case "8":
              scope.questionValues = [{id: 1, title: ""}];
              template = baseTemplateUnique;
              break;
          }
          element.html(template);
          $compile(element.contents())(scope);
        }

        //refresh();
      }
    };
  });
