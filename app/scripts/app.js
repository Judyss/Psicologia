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
        'ngMaterial'
    ])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl',
                controllerAs: 'main'
            })
            .when('/about', {
                templateUrl: 'views/about.html',
                controller: 'AboutCtrl',
                controllerAs: 'about'
            })
            .when('/home', {
                templateUrl: 'views/portfolio.html',
                controller: 'AboutCtrl',
                controllerAs: 'about'
            })
            .when('/evaluacion/razonamiento-verbal', {
              templateUrl: 'views/evaluacion/razonamiento_verbal.html',
              controller: 'EvaluacionRazonamientoVerbalCtrl',
              controllerAs: 'evaluacion/razonamientoVerbal'
            })
            .when('/evaluacion', {
              templateUrl: 'views/evaluaciones.html',
              controller: 'EvaluacionesCtrl',
              controllerAs: 'evaluaciones'
            })
            .when('/evaluacion/razonamiento-numerico', {
              templateUrl: 'views/evaluacion/razonamiento_numerico.html',
              controller: 'EvaluacionRazonamientoNumericoCtrl',
              controllerAs: 'evaluacion/razonamientoNumerico'
            })
            .otherwise({
                redirectTo: '/'
            });
    });
