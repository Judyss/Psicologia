'use strict';

describe('Directive: PreviewImage', function () {

  // load the directive's module
  beforeEach(module('planillasApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<-preview-image></-preview-image>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the PreviewImage directive');
  }));
});
