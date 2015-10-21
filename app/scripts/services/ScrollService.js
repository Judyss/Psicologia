'use strict';

/**
 * @ngdoc service
 * @name emiAppApp.Scroll
 * @description
 * # Scroll
 * Service in the emiAppApp.
 */
angular.module('psicologiaApp')
  .service('ScrollService', function ($document, $timeout, $location) {
    function toSection(scrollTo, scrollTime){
      $timeout(function(){
        var top;
        if(scrollTo == 'fullTop'){
          top = 0;
        }else if(scrollTo == 'fullButton') {
          top = 100000;
        }else if(!$(scrollTo).position()){
          $location.url('/main');
          return;
        }else{
          top = $(scrollTo).position().top;
          if(!top) return;
        }

        $document.duScrollTopAnimated((top - 30 >0?top - 30:0), scrollTime || 2000 ).then(function() {
        //  console && console.log('You just scrolled to the top!');
        });
      });
    }
    return {
      toSection:toSection
    }
  });
