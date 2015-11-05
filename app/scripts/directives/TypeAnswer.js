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
          var template_textShort = '<input placeholder="Ingrese aqui su respuesta" data-ng-model="question.answer"  data-ng-class="form-control">',
            template_textLarge = '<textarea placeholder="Ingrese aqui su respuesta" rows="7" data-ng-model="question.answer"  class="form-control"></textarea>',
            template_multipleSelection = '' +
              '<md-list-item data-ng-repeat="value in question.values">' +
              '<md-checkbox ng-model="value.checked" class="md-primary" ></md-checkbox>' +
              '<p>{{value.title}}</p>' +
              '</md-list-item>',
            template_listSelect = '' +
              '<md-list-item data-ng-repeat="value in question.values">' +
              '<md-radio-group ng-model="question.answer"  >' +
              '<md-radio-button name="{{value.id}}" value="{{value.id}}" class="md-primary">' +
              '{{value.title}}' +
              '</md-radio-button>' +
              '</md-radio-group>' +
              '</md-list-item>',
            template_multipleEntrance = '<span ng-init="question.answer = fillArrayValues(question.values_number)"></span>' +
              '<div data-ng-repeat="answer in question.answer">' +
              '<input ng-model="answer.answer" placeholder="Ingrese su respuesta {{$index + 1}} " class="form-control">' +
              '</div>',
            template_date = '<input placeholder="Ingrese fecha DD/MM/YYYY" type="date" data-ng-model="question.answer" class="form-control" >',
            template_hours = '<input placeholder="Ingrese hora" type="time" data-ng-model="question.answer" class="form-control" >',
            template_number = '<input placeholder="Ingrese un numero" type="number" data-ng-model="question.answer" class="form-control" >',

            type_question = scope.question.type_question + "",
            template = "";

          switch (type_question) {
            case "1":
              template = template_textShort;
              break;
            case "2":
              template = template_textLarge;
              break;
            case "3":
              template = template_multipleSelection;
              break;
            case "4":
              template = template_listSelect;
              break;
            case "5":
              template = template_multipleEntrance;
              break;
            case "6":
              template = template_date;
              break;
            case "7":
              template = template_hours;
              break;
            case "8":
              template = template_number;
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
  })
  .directive('answerArray', function () {
    return {
      restrict: 'A',
      scope: {
        ngModel: '=',
        answerArray: '=',
        answerValues:'='
      },
      link: function postLink() {
        //disabled,for deficent funcionality

        /*scope.$watch('answerValues', function (newValue) {
          var resultArray = [];
          if(angular.isArray(newValue)){
            for(var i = 0; i < newValue.length;i++){
              if(newValue[i].checked){
                resultArray.push(newValue[i]);
              }
            }
          }
          scope.answerArray = resultArray;
        });
        if(!scope.answerValues){
          scope.$watch('ngModel', function (newValue) {
            if(!angular.isArray(newValue)){
              //if(angular.isString(newValue)){
                scope.answerArray = [newValue];
              //}
            }else{
              scope.answerArray = newValue;
            }
          });
        }*/
      }
    };
  });
