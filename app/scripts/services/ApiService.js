'use strict';

/**
 * @ngdoc service
 * @name psicologiaApp.ApiService
 * @description
 * # ApiService
 * Service in the psicologiaApp.
 */
angular.module('psicologiaApp')
  .service('$API', function ($q, $resource) {
    //var base_url = '/apiPlanillas/api/';
    //var base_url = 'http://localhost:8000/api/';
    //var base_url = 'http://localhost/apiPlanillas/api/';
    var base_url = 'apiPsicologia/';
    return {
      usuarios: $resource(base_url + 'usuarios/:id', {id: '@id'}, {update: {method: 'PUT'}}),
      authenticate: $resource(base_url + 'authenticate/:id', {id: '@id'}, {update: {method: 'PUT'}}),
      logout: $resource(base_url + 'authenticate/logout/:id', {id: '@id'}, {update: {method: 'PUT'}}),
      especialidades: $resource(base_url + 'especialidades/:id', {id: '@id'}, {update: {method: 'PUT'}}),
      docentes: $resource(base_url + 'docentes/:id', {id: '@id'}, {update: {method: 'PUT'}}),
      departamentos: $resource(base_url + 'departamentos/:id', {id: '@id'}, {update: {method: 'PUT'}}),
      materias: $resource(base_url + 'materias/:id', {id: '@id'}, {update: {method: 'PUT'}}),
      tipos_usuarios: $resource(base_url + 'tipos_usuarios/:id', {id: '@id'}, {update: {method: 'PUT'}}),
      unidades_academicas: $resource(base_url + 'unidades_academicas/:id', {id: '@id'}, {update: {method: 'PUT'}}),

      razonamiento_verbal: $resource(base_url + 'cuestionario/razonamiento_verbal/:id', {id: '@id'}, {update: {method: 'PUT'}}),
      razonamiento_numerico: $resource(base_url + 'cuestionario/razonamiento_numerico/:id', {id: '@id'}, {update: {method: 'PUT'}}),
      razonamiento_abstracto: $resource(base_url + 'cuestionario/razonamiento_abstracto/:id', {id: '@id'}, {update: {method: 'PUT'}}),
      razonamiento_mecanico: $resource(base_url + 'cuestionario/razonamiento_mecanico/:id', {id: '@id'}, {update: {method: 'PUT'}})
    }
  });
