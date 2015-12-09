var request = require('request');

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
    if (err) {
      callback(err);
      return;
    }

    var response;

    try {
      response = JSON.parse(resp.body);
    } catch(e) {
      console.log(e, resp.body);
    }
    

    if (!response ||
        !response.query ||
        !response.query.results ||
        !response.query.results.rate) {

      var err = new Error('Got response from yahoo.finance.xchange but rate could not be parsed');
      callback(err);
      return;
    }

    var rate = response.query.results.rate.Rate;
    
    callback(null, resp, rate);
  })

};

module.exports = YahooExchangeTables;
