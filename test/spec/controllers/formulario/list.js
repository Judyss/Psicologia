'use strict';

describe('Controller: FormularioListCtrl', function () {

  // load the controller's module
  beforeEach(module('emiApp'));

  var FormularioListCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FormularioListCtrl = $controller('FormularioListCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(FormularioListCtrl.awesomeThings.length).toBe(3);
  });
});
