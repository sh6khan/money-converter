var assert = require('assert');
var ApiConverter = require('../sources/api_converter');

suite('api-converter');

var apiConverter = new ApiConverter();

test('should be able to get rate through yahoo table', function(done) {

  apiConverter.convert('USD', 'EUR', function(err, verifiedRate) {
    assert.ifError(err);
    assert(verifiedRate);
    assert(verifiedRate.rate);
    done();
  });
});

test('should return 1 for same currency', function(done) {
  apiConverter.convert('CAD', 'CAD', function(err, verifiedRate) {
    assert.ifError(err);
    assert(verifiedRate);
    assert.equal(verifiedRate.rate, 1);
    done();
  });
});