'use strict';

/**
 * @ngdoc service
 * @name emiApp.AnswerService
 * @description
 * # AnswerService
 * Service in the emiApp.
 */
angular.module('emiApp')
  .service('AnswerService', function ($rootScope, RestFormService, $q, $ApiUrls) {
    function add(questions, formId, time) {
      var defer = $q.defer();
      var Questions = angular.copy(questions),
        Answers = [], i, j, g, tempArray;
      for (i = 0; i < Questions.length; i++) {
        switch (Questions[i].type_question) {
          case 1:
            Answers.push(
              {
                question_id: Questions[i].id,
                answer_array: Questions[i].answer ? [Questions[i].answer] : []
              }
            );
            break;
          case 2:
            Answers.push(
              {
                question_id: Questions[i].id,
                answer_array: Questions[i].answer ? [Questions[i].answer] : []
              }
            );
            break;
          case 3:
            tempArray = [];
            for (j = 0; j < Questions[i].values.length; j++) {
              if (Questions[i].values[j].checked) {
                tempArray.push(Questions[i].values[j].id);
              }
            }
            Answers.push(
              {
                question_id: Questions[i].id,
                answer_array: tempArray
              }
            );
            break;
          case 4:
            Answers.push(
              {
                question_id: Questions[i].id,
                answer_array: Questions[i].answer ? [Questions[i].answer] : []
              }
            );
            break;
          case 5:
            tempArray = [];
            for (j = 0; j < Questions[i].answer.length; j++) {
              if (Questions[i].answer[j].answer) {
                tempArray.push(Questions[i].answer[j].answer);
              }
            }
            Answers.push(
              {
                question_id: Questions[i].id,
                answer_array: tempArray
              }
            );
            break;
          case 6: //date
            g = Questions[i].answer;
            Answers.push(
              {
                question_id: Questions[i].id,
                answer_array: g ? [g.getDate() + "-" + (g.getMonth() + 1) + "-" + g.getFullYear()] : []
              }
            );
            break;
          case 7://time
            g = Questions[i].answer;
            Answers.push(
              {
                question_id: Questions[i].id,
                answer_array: g ? [g.getHours() + ":" + g.getMinutes()] : []

              }
            );
            break;
          case 8://number
            Answers.push(
              {
                question_id: Questions[i].id,
                answer_array: Questions[i].answer ? [Questions[i].answer] : []
              }
            );
            break;
        }
      }

      var data = {
        form: formId,
        owner: $rootScope.currentUser.id,
        values: Answers,
        time: time
      };

      RestFormService.post($ApiUrls.Answer, data)
        .then(function (data) {
          defer.resolve(data);
        }, function (data) {
          defer.reject(data);
        });

      return defer.promise;
    }

    return {
      add: add
    };
  });
