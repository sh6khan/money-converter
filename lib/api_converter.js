var async = require('async');
var YahooTable = require('../sources/yahoo_tables');
var YahooCsv = require('../sources/yahoo_csv');

var ApiConverter = function() {
  this.deviationTolerace = 0.1;
};

ApiConverter.prototype.convert = function(to, from, callback) {
  var self = this;
  var errCount = 0;

  async.parallel([
    yahooTable,
    yahooCsv
  ], returnRate );

  function yahooTable(done) {
    YahooTable(to, from, function(err, resp, rate) {
      if (err) {
        console.log(err);
        errCount++;
      }

      done(null, rate);
    });
  }

  function yahooCsv(done) {
    YahooCsv(to, from, function(err, resp, rate) {
      if (err) {
        console.log(err);
        errCount++;
      }
    
      done(null, rate);
    });
  }

  function returnRate(err, result) {
    if (errCount == 2) {
      callback(err);
      return;
    }

    result = result.filter(function(r) { return r != undefined; });
    
    verifiedRate = self.verifyRates(result);

    callback(null, verifiedRate);
  };
};


// check through the results to see if they are very different
ApiConverter.prototype.verifyRates = function(results) {
  var verifiedRate = {};

  // finding the min and max
  var min = results[0];
  var max = results[0];

  var minIndex = 0;
  var maxIndex = 0;

  results.forEach(function(rate) {
    if (min < rate) {
      min = rate;
    }

    if (max > rate) {
      max = rate;
    }
  });

  
  var diff = Math.abs(max - min)
  var relativeDeviation = (diff / min) * 100

  if (relativeDeviation > this.deviationTolerace) {
    verifiedRate.message = 'there was deviations in the rates returned was larger than' + this.deviationTolerace;
  }

  // return a rate object with yahoo
  verifiedRate.rate = results[0];

  return verifiedRate;
};

module.exports = ApiConverter;