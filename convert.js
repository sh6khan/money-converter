// the idea is to have a two way binding on each currency pair
// and store that value in memory

var async = require('async');
var ApiConverter = require('./lib/api_converter');



// a list of some very popular currencies
var SUPPORTED_CURRENCIES = ['USD','EUR','JPY','AUD','GBP','NZD','CHF','ZAR','CNY','BTC', 'CAD'];

var Fx = function(base, currencies, callback) {

  var self = this;

  this.currencies = currencies || SUPPORTED_CURRENCIES;
  this.rates = {}
  this.base = base;

  this.apiConverter = new ApiConverter();

  async.each(this.currencies, this.buildRateMap.bind(self), callback);
};

Fx.prototype.buildRateMap = function(currency, callback) {
  var self = this;

  self.getRate(this.base, currency, function(err, rate) {

    if (err) {
      callback(err);
      return;
    }
    
    self.rates[currency] = rate;

    callback();
  });
};

// uses an avaiable api to get the fx rate
Fx.prototype.getRate = function(to, from, callback) {
  this.apiConverter.convert(to, from, function(err, verifiedRate) {
    if (err) {
      callback(err);
      return;
    }

    if (verifiedRate.message) {
      console.log(verifiedRate.message);
    }

    callback(null, verifiedRate.rate);
  });
};

Fx.prototype.convert = function(amount, opts) {
  var factor;
  var from = opts.from;
  var to = opts.to
  
  if (!this.rates[from] || !this.rates[to]) {
    throw 'This pair is not in cache, either use apiConversion (which is async) or add this currency pair into the beggining'
  }

  if (this.base === from) {
    factor = this.rates[to];
    return amount * factor;
  }

  // if `from` is not the base, first covert amount to base, then convert it to target

  // finding base equvicalent
  factor = this.rates[from];

  var baseEquiv = amount / factor;

  return baseEquiv * this.rates[to];
};

Fx.prototype.updateRates = function() {

};

module.exports = Fx;
