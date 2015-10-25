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
    'duScroll',
    'ab-base64'
  ])
  .config(function ($routeProvider, $httpProvider) {

    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

    $httpProvider.interceptors.push('InterceptorService');

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
  .module('psicologiaApp').run(function($rootScope, AuthService){
    $rootScope.currentTestSelected= {};
    $rootScope.currentTest = {};
    $rootScope.currentIndexTest = -1;
    $rootScope.currentUser = AuthService.isLogged();

    AuthService.autoLogin()
      .then(function(data){
        console.log('auto login success',data);
        if(data.user)
          $rootScope.currentUser = data.user;
        else
          $rootScope.currentUser = false;
      },function(){
        $rootScope.currentUser = false;
      });

  });
