'use strict';

/**
 * @ngdoc directive
 * @name psicologiaApp.directive:ScrollButtonDirective
 * @description
 * # ScrollButtonDirective
 */
angular.module('psicologiaApp')
  .directive('scrollButton', function () {
    return {
      //template: '<div></div>',
      //restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.addClass('animated');
        reformatButton();
        $(window).scroll(function() {
          reformatButton();
        });
        function reformatButton(){
          var scrollTop = $(window).scrollTop();
          if ( scrollTop > 200) {
            element.removeClass('bounceOut');
            element.addClass('bounceIn');
          }else{
            element.removeClass('bounceIn');
            element.addClass('bounceOut');
          }
        }
      }
    };
  });

angular.module('psicologiaApp')
  .directive('scrollNavOpacity', function () {
    return {
      link: function postLink(scope, element, attrs) {
        $(window).scroll(function() {
          var scrollTop = $(window).scrollTop();
          if ( scrollTop > 200) {
            element.css({opacity: 0.85});
          }else{
            element.css({opacity: 1});
          }
        });
      }
    };
  });

angular.module('psicologiaApp')
  .directive('scrollTo', function (ScrollService) {
    return {
      scope:{
        scrollTo:'=',
        scrollTime:'='
      },
      link: function postLink(scope, element, attrs) {
        $(element).click(function(){
          ScrollService.toSection(scope.scrollTo,scope.scrollTime);
        });
      }
    };
  });

angular.module('psicologiaApp')
  .directive('scrollRouteChange', function ($location, ScrollService, $timeout) {
    return {
      link: function postLink(scope, element, attrs) {
        /*var Objetivos = $('#Objetivos').position().top;
        var Nosotros = $('#Nosotros').position().top;
        var Contactos = $('#Contactos').position().top;*/
        var ArrayUrl = ['Objetivos','Nosotros','Contactos'];
        $(window).scroll(function() {
          var scrollTop = $(window).scrollTop(),
            infinite = 999999999,
            min = infinite,
            indexTo,
            index,
            position;
          for(index = 0 ;index < ArrayUrl.length;index++){
            position = $('#'+ArrayUrl[index]).position();
            if(!position)continue;
            position = position.top;
            if (Math.abs(position - scrollTop) < min){
              min = Math.abs(position - scrollTop);
              indexTo = index;
            }
          }
          if(min !=infinite){
            $timeout(function(){
              //$location.path('/main/'+ArrayUrl[indexTo]);
            })
          }
        });
      }
    };
  });
