'use strict';
/**
 * @ngdoc service
 * @name emiApp.JsonService
 * @description
 * # JsonService
 * Service in the emiApp.
 */
angular.module('emiApp')
  .service('JsonService', function () {
    function encode_unicode(jsonObject) {
      var json = JSON.stringify(jsonObject);
      return json.replace(/[\u007f-\uffff]/g,
        function (c) {
          return '\\u' + ('0000' + c.charCodeAt(0).toString(16)).slice(-4);
        }
      );
    }

    function decode_unicode(jsonString) {
      return angular.fromJson(jsonString);
    }

    function encode_utf8(jsonObject) {
      var json = angular.toJson(jsonObject);
      return unescape(encodeURIComponent(json));
    }

    function decode_utf8(jsonString) {
      var json = decodeURIComponent(escape(jsonString));
      return angular.fromJson(json);
    }

    return {
      encode_unicode: encode_unicode,
      decode_unicode: decode_unicode,
      encode_utf8: encode_utf8,
      decode_utf8: decode_utf8
    }
  });
