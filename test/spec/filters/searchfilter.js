'use strict';

describe('Filter: SearchFilter', function () {

  // load the filter's module
  beforeEach(module('planillasApp'));

  // initialize a new instance of the filter before each test
  var SearchFilter;
  beforeEach(inject(function ($filter) {
    SearchFilter = $filter('SearchFilter');
  }));

  it('should return the input prefixed with "SearchFilter filter:"', function () {
    var text = 'angularjs';
    expect(SearchFilter(text)).toBe('SearchFilter filter: ' + text);
  });

});
