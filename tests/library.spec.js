/* global bipbop */

'use strict';

describe('bipbop', function () {
  this.timeout(5000);

  it('deprecated call', function (done) {
    $.bipbop("SELECT FROM 'INFO'.'INFO'", undefined, {
      success: function (doc) {
        var jdoc = $(doc);
        if (jdoc.find('BPQL > header > query').text() != "SELECT FROM 'INFO'.'INFO'")
          throw 'unexpected content';
        done();
      }
    });
  });

  it('simple call', function (done) {
    $.bipbop("SELECT FROM 'INFO'.'INFO'", undefined, {
      success: function (doc) {
        var jdoc = $(doc);
        if (jdoc.find('BPQL > header > query').text() != "SELECT FROM 'INFO'.'INFO'")
          throw 'unexpected content';
        done();
      }
    });
  });
});