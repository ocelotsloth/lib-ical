var assert = require('assert');
var path = require('path');
var fs = require('fs');

describe('ical-generator 0.3.x / ICalTimezone', function() {
  'use strict';

  it('Module exports type', function() {
    var vTZ = require(path.join(__dirname, '..', 'lib', 'timezone'));
    var actual = typeof(vTZ);
    var expected = 'function';

    assert.equal(actual, expected,
      'timezone.js should return a function');
  });

});
