'use strict';

describe('Service: ViewService', function () {

  // load the service's module
  beforeEach(module('planillasApp'));

  // instantiate service
  var ViewService;
  beforeEach(inject(function (_ViewService_) {
    ViewService = _ViewService_;
  }));

  it('should do something', function () {
    expect(!!ViewService).toBe(true);
  });

});
