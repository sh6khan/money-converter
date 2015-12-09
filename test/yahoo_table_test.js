var assert = require('assert');
var YahooTable = require('../sources/yahoo_tables');

suite('yahoo-table');

test('should be able to get a rate from yahoo', function(done) {
  YahooTable('USD', 'CAD', function(err, resp, rate) {
    assert.ifError(err);
    assert(rate);
    done();
  });
});

test('should return 1 for the same currency', function(done) {
  YahooTable('USD', 'USD', function(err, resp, rate) {
    assert.ifError(err);
    assert(rate);
    assert.equal(rate, 1);
    done();
  });
});