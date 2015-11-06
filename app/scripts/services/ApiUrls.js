'use strict';
/**
 * @ngdoc service
 * @name emiApp.$ApiUrls
 * @description
 * # $ApiUrls
 * Service in the emiApp.
 */
angular.module('emiApp')
  .service('$ApiUrls', function () {
    return {
      Login: "Login",
      Logout: "Logout",
      City: "City",
      AcademicUnit: "AcademicUnit",
      Specialty: "Specialty",
      Semester: "Semester",
      Student: "Student",
      People: "People",
      Account: "Account",
      Form: "Forms/Form",
      Question: "Forms/Question",
      FormQuestion: "Forms/FormQuestion",
      FormEnabled: "Forms/FormEnabled",
      Answer: "Forms/Answer"
    };
  });
