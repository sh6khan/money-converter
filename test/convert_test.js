var assert = require('assert');
var Converter = require('../convert');

suite('convert');

var convert;
var CURRENCIES = ['USD','EUR','JPY','AUD','GBP','NZD','CHF','ZAR','CNY','BTC', 'CAD'];

before('init convert', function(done) {
  this.timeout(5000);
  var base = 'USD';
  convert = new Converter(base, CURRENCIES, done);
});

test('should be able to instantiate the converter', function() {
  assert(convert);
});

test('should have all base rates', function() {
  CURRENCIES.forEach(function(currency) {
    assert(convert.rates[currency]);  
  });
});

test('base conversion', function() {
  var result = convert.convert(1, {from: 'USD', to: 'CAD'})
  assert(result);
});

test('non base conversion', function() {
  var result = convert.convert(1, {from: 'CAD', to: 'EUR'});
  assert(result);
});

test('reverse base conversion', function() {
  var result = convert.convert(1, {from: 'CAD', to: 'USD'});
  console.log(result);
  assert(result);
});
