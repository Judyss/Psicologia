'use strict';

describe('Service: FileUpload', function () {

  // load the service's module
  beforeEach(module('planillasApp'));

  // instantiate service
  var FileUpload;
  beforeEach(inject(function (_FileUpload_) {
    FileUpload = _FileUpload_;
  }));

  it('should do something', function () {
    expect(!!FileUpload).toBe(true);
  });

});
