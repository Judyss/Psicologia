'use strict';

/**
 * @ngdoc directive
 * @name emiApp.directive:TypeAnswer
 * @description
 * # TypeAnswer
 */
angular.module('emiApp')
  .directive('typeAnswer', function ($compile) {
    return {
      restrict: 'A',
      require: '^ngModel',
      template: '<div></div>',
      scope: {
        ngModel: '=',
        question: '='
      },
      link: function postLink(scope, element) {
        scope.$watch('question.type_question', function () {
          refresh();
        });

        scope.fillArrayValues = function (numberInputs) {
          var virtualArray = [], i;
          numberInputs = Number(numberInputs);
          if (angular.isNumber(numberInputs)) {
            for (i = 0; i < numberInputs; i++) {
              virtualArray.push({id: (i + 1)});
            }
          } else {
            virtualArray.push({id: 1});
          }

          return virtualArray;
        };
        function refresh() {
          var tempValue = "2",
            templete_textShort = '<input placeholder="Ingrese aqui su respuesta" data-ng-model="question.answer" class="form-control">',
            templete_textLarge = '<textarea placeholder="Ingrese aqui su respuesta" rows="7" data-ng-model="question.answer" class="form-control"></textarea>',
            templete_multipleSelection = '' +
              '<md-list-item data-ng-repeat="value in question.values">' +
              '<md-checkbox ng-model="value.checked" class="md-primary"></md-checkbox>' +
              '<p>{{value.title}}</p>' +
              '</md-list-item>',
            templete_listSelect = '' +
              '<md-list-item data-ng-repeat="value in question.values">' +
              '<md-radio-group ng-model="question.answer">' +
              '<md-radio-button name="{{value.id}}" value="[{{value.id}}]" class="md-primary">' +
              '{{value.title}}' +
              '</md-radio-button>' +
              '</md-radio-group>' +
              '</md-list-item>',
            templete_multipleEntrance = '<span ng-init="question.answer = fillArrayValues(question.values_number)"></span>' +
              '<div data-ng-repeat="answer in question.answer">' +
              '<input ng-model="answer.answer" placeholder="Ingrese su respuesta {{$index + 1}} " class="form-control">' +
              '</div>',
            templete_date = '<input placeholder="Ingrese fecha DD/MM/YYYY" type="date" data-ng-model="question.answer" class="form-control">',
            templete_hours = '<input placeholder="Ingrese hora" type="time" data-ng-model="question.answer" class="form-control">',
            templete_number = '<input placeholder="Ingrese un numero" type="number" data-ng-model="question.answer" class="form-control">',

            question = scope.question,
            type_question = scope.question.type_question + "",
            template = "";

          switch (type_question) {
            case "1":
              template = templete_textShort;
              break;
            case "2":
              template = templete_textLarge;
              break;
            case "3":
              template = templete_multipleSelection;
              break;
            case "4":
              template = templete_listSelect;
              break;
            case "5":
              template = templete_multipleEntrance;
              break;
            case "6":
              template = templete_date;
              break;
            case "7":
              template = templete_hours;
              break;
            case "8":
              template = templete_number;
              break;
            case "9":
              template = "";
              break;
          }
          element.html(template);
          $compile(element.contents())(scope);
        }

        refresh();
      }
    };
  });
