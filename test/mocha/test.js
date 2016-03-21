var assert = require('assert');
describe('Array', function() {
  describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function () {
      assert.equal(-1, [1,2,3].indexOf(5));
      assert.equal(-1, [1,2,3].indexOf(0));
    });
  });
});

var server = require('./../../server.js');
var express = require('express');
var mongoose = require('mongoose');
describe('saveCallback', function() {
  it('should return a console error if err is true', function () {
    assert.equal(console.error(err), server.saveCallback(true, {}));
  });
});
