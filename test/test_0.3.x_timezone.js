var assert = require('assert');
var path = require('path');
var fs = require('fs');

describe('ical-generator 0.3.x / ICalTimezone', function() {
  'use strict';

  it('required file should return a function', function() {
    var vTZ = require(path.join(__dirname, '..', 'lib', 'timezone'));
    var actual = typeof(vTZ);
    var expected = 'function';
    assert.equal(actual, expected);
  });

});
