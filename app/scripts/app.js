'use strict';
/**
 * @ngdoc overview
 * @name emiApp
 * @description
 * # emiApp
 *
 * Main module of the application.
 */
angular
  .module('emiApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'xeditable',//http://vitalets.github.io/angular-xeditable/#getstarted
    'restangular',//https://github.com/mgonto/restangular
    'textAngular',//https://github.com/fraywing/textAngular/
    'angularMoment',//https://github.com/urish/angular-moment
    'ngMask',//https://github.com/candreoliveira/ngMask
    'ngMaterial',
    'angularFileUpload'
  ])
  .config(function ($routeProvider, $httpProvider, RestangularProvider) {
    RestangularProvider.setBaseUrl('http://127.0.0.1:8000');
    RestangularProvider.setRequestSuffix('/');
    $httpProvider.interceptors.push('InterceptorService');
    $routeProvider
      .when('/', {
        redirectTo: '/Portafolio'
        /*templateUrl: 'views/main.html',
         controller: 'MainCtrl',
         controllerAs: 'main'*/
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/Login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'Login'
      })
      .when('/Registro', {
        templateUrl: 'views/register.html',
        controller: 'RegisterCtrl',
        controllerAs: 'Register'
      })
      .when('/Portafolio', {
        templateUrl: 'views/portfolio.html',
        controller: 'PortfolioCtrl',
        controllerAs: 'Portfolio'
      })
      .when('/Formulario/nuevo', {
        templateUrl: 'views/formulario/nuevo.html',
        controller: 'FormularioNuevoCtrl',
        controllerAs: 'Formulario/nuevo'
      })
      .when('/Formulario/edit/:id', {
        templateUrl: 'views/formulario/nuevo.html',
        controller: 'FormularioNuevoCtrl',
        controllerAs: 'Formulario/nuevo'
      })
      .when('/Formulario/view/:id', {
        templateUrl: 'views/formulario/view.html',
        controller: 'FormularioViewCtrl',
        controllerAs: 'Formulario/view'
      })
      .when('/Formulario/list', {
        templateUrl: 'views/formulario/list.html',
        controller: 'FormularioListCtrl',
        controllerAs: 'Formulario/list'
      })
      .when('/Formulario/answer/:id', {
        templateUrl: 'views/formulario/answer.html',
        controller: 'FormularioAnswerCtrl',
        controllerAs: 'Formulario/answer'
      })
      .when('/Administrador/Enviar', {
        templateUrl: 'views/admin/sendlist.html',
        controller: 'AdminSendListCtrl',
        controllerAs: 'admin/SendList'
      })
      .otherwise({
        redirectTo: '/Portafolio'
      });
  }).run(function ($rootScope, $timeout, $http, $Toast, $location, AuthService) {
    $rootScope.first_request = true;
    $timeout(function () {
      if ($rootScope.first_request) {
        $rootScope.reloadApp();
      }
    }, 20000);
    $rootScope.reloadApp = function () {
      $Toast.show("Lo sentimos ha ocurrido un error, actualize la pagina", 'Aceptar').then(function () {
        location.reload();
      });
    };
    var routeAuth = [
      '/Formulario/list',
      '/Formulario/edit',
      '/Formulario/view',
      '/Formulario/nuevo'
    ];
    var routeHideAuth = [
      '/Registro',
      '/Login'
    ];
    if (AuthService.isLogged()) {
      AuthService.autoLogin().then(function (data) {
        $rootScope.currentUser = data;
      });
    }
    $rootScope.logout = function () {
      AuthService.logout().then(function () {
        location.reload();
      });
    };
    $rootScope.$on('$routeChangeStart', function () {
      var currentUrl = $location.url(),
        index;
      console.log(currentUrl);
      for (index = 0; index < routeAuth.length && !AuthService.isLogged(); index++) {
        if (currentUrl.search(routeAuth[index]) >= 0) {
          $location.url('/Login');
        }
      }
      if (currentUrl === 'Formulario/list') {
        $rootScope.formulario_list_class = true;
      } else {
        $rootScope.formulario_list_class = true;
      }
      for (index = 0; index < routeHideAuth.length && AuthService.isLogged(); index++) {
        if (currentUrl.search(routeHideAuth[index]) >= 0) {
          $location.url('/');
        }
      }
    });
  });
