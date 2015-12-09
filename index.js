// the idea is to have a two way binding on each currency pair
// and store that value in memory

var currencies = require('./currencies');
var async = require('async');
var ApiConverter = require('./sources/api_converter');

var Fx = function(base, currencies, callback) {
  this.currencies = currencies || currencies.SUPPORTED_CURRENCIES;
  this.rates = {}
  this.base = base;

  this.apiConverter = new ApiConverter();

  async.each(this.currencies, this.buildRateMap.bind(self), callback);
};

Fx.prototype.buildRateMap = function(currency, done) {
  var self = this;

  self.getRate(this.base, curreny, function(err, rate) {
    if (err) {
      done(err);
      return;
    }
    
    self.rates[curreny] = rate;
    done();
  });
};

// uses an avaiable api to get the fx rate
Fx.prototype.getRate = function(to, from, callback) {
  this.apiConverter(to, from, function(err, verifiedRate) {
    if (err) {
      callback(err);
      return;
    }

    if (verifiedRate.message) {
      console.log(verifiedRate.message);
    }

    callback(verifiedRate.rate);
  });
};

Fx.prototype.convert = function(amount, opts) {
  rates = this.rates;

  var from = rates[opts.from]
  var to = rates[opts.to]

  if (!from || !to) {
    throw 'This pair is not in cache, either use apiConversion (which is async) or add this currency pair into the beggining'
  }



};

Fx.prototype.updateRates = function() {

};

