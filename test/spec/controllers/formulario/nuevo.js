'use strict';

describe('Controller: FormularioNuevoCtrl', function () {

  // load the controller's module
  beforeEach(module('emiApp'));

  var FormularioNuevoCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FormularioNuevoCtrl = $controller('FormularioNuevoCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(FormularioNuevoCtrl.awesomeThings.length).toBe(3);
  });
});
