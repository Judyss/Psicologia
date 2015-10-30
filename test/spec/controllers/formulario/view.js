'use strict';

describe('Controller: FormularioViewCtrl', function () {

  // load the controller's module
  beforeEach(module('emiApp'));

  var FormularioViewCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FormularioViewCtrl = $controller('FormularioViewCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(FormularioViewCtrl.awesomeThings.length).toBe(3);
  });
});
