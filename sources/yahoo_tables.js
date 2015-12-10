var request = require('request');
var YahooParser = require('../lib/yahoo_parser');

YAHOO_EXCHANGE_API_URI='https://query.yahooapis.com/v1/public/yql'

var YahooExchangeTables = function(to, from, callback) {
  var product = to + from

  var query = [
    'select Rate from yahoo.finance.xchange where pair in ("' + product + '")',
    'format=json',
    'env=store://datatables.org/alltableswithkeys'
  ].join('&');

  var fullUrl = YAHOO_EXCHANGE_API_URI + '?q=' + query;

  request(fullUrl, function(err, resp, data) {
    var yahooData = YahooParser(err, resp, data);
    callback(yahooData.err, yahooData.resp, yahooData.rate);
  })

};

module.exports = YahooExchangeTables;
