var async = require('async');
var YahooTable = require('./yahoo_table');

var ApiConverter = function() {
  this.deviationTolerace = 0.1;
  this.yahooTable = new YahooTable();
};

ApiConverter.convert = function(to, from, callback) {
  var errCount = 0;

  async.parallel({
    yahooTable
  }, returnRate );

  function yahooTable(done) {
    yahooTable.convert(to, from, function(err, rate) {
      if (err) {
        console.log(err);
        errCount++;
      }

      done(null, rate);
    });
  }

  function returnRate(err, result) {
    if (errCount == 1) {
      callback(err);
      return;
    }

    verifiedRate = self.verifyRates(result);

    callback(null, verifiedRate);
  };
};


// check through the results to see if they are very different
ApiConverter.prototype.verifyRates = function(resutls) {
  var verifiedRate = {};

  // finding the min and max
  var min = resutls[0];
  var max = resutls[0];

  var minIndex = 0;
  var maxIndex = 0;

  resutls.forEach(function(rate) {
    if (min < rate) {
      min = rate;
    }

    if (max > rate) {
      max = rate;
    }
  });

  
  var diff = Math.abs(max - min)
  var relativeDeviation = (diff / min) * 100

  if (deviation > this.deviationTolerace) {
    verifiedRate.message = 'there was deviations in the rates returned was larger than' + this.deviationTolerace;
  }

  // return a rate object with yahoo
  verifiedRate.rate = resutls[0];

  return returnRate;
};

module.exports = ApiConverter;