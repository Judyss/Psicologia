'use strict';
/**
 * @ngdoc overview
 * @name psicologiaApp
 * @description
 * # psicologiaApp
 *
 * Main module of the application.
 */
angular
  .module('psicologiaApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngMaterial',
    'duScroll'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/portfolio.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/home', {
        redirectTo: '/'
      })
      .when('/evaluacion/test', {
        templateUrl: 'views/evaluacion/razonamiento_verbal.html',
        controller: 'EvaluacionRazonamientoVerbalCtrl',
        controllerAs: 'evaluacion/razonamientoVerbal'
      })
      .when('/evaluacion', {
        templateUrl: 'views/evaluaciones.html',
        controller: 'EvaluacionesCtrl',
        controllerAs: 'evaluaciones'
      })
      .otherwise({
        redirectTo: '/'
      });
  });


angular
  .module('psicologiaApp').run(function($rootScope){
    $rootScope.currentTestSelected= {};
    $rootScope.currentTest = {};
    $rootScope.currentIndexTest = -1;
  });
