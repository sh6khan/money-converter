var assert = require('assert');
var YahooTable = require('../sources/yahoo_tables');

suite('yahoo-table');

test('should be able to get a rate from yahoo', function(done) {
  YahooTable('USD', 'CAD', function(err, resp, rate) {
    assert.ifError(err);
    assert(rate);
    console.log(rate);
    done();
  });
});