'use strict';

describe('Service: $ApiUrls', function () {

  // load the service's module
  beforeEach(module('planillasApp'));

  // instantiate service
  var $ApiUrls;
  beforeEach(inject(function (_$ApiUrls_) {
    $ApiUrls = _$ApiUrls_;
  }));

  it('should do something', function () {
    expect(!!$ApiUrls).toBe(true);
  });

});
