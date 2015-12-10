var assert = require('assert');
var YahooCsv = require('../sources/yahoo_csv');

suite('yahoo-csv');

test('should be able to get a rate from yahoo', function(done) {
  YahooCsv('USD', 'CAD', function(err, resp, rate) {
    assert.ifError(err);
    assert(rate);
    done();
  });
});

test('should return 1 for the same currency', function(done) {
  YahooCsv('USD', 'USD', function(err, resp, rate) {
    assert.ifError(err);
    assert(rate);
    assert.equal(rate, 1);
    done();
  });
});