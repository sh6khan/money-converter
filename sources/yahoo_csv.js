var request = require('request');
var YahooParser = require('../lib/yahoo_parser');

var YahooCsv = function(to, from, callback) {
  var product = to + from;
  var url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20csv%20where%20url%3D'http%3A%2F%2Ffinance.yahoo.com%2Fd%2Fquotes.csv%3Fe%3D.csv%26f%3Dsl1d1t1%26s%3D"+product+"%3DX'%20%20and%20columns%3D'pair%2Crate%2Cdata%2Ctime'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys"
  request(url, function(err, resp, data) {
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
        !response.query.results.row ||
        !response.query.results.row.rate) {

      var err = new Error('Got response from yahoo api url, but rate could not be parsed');
      callback(err);
      return;
    }

    var rate = response.query.results.row.rate;

    callback(null, resp, rate);
  });
};

module.exports = YahooCsv;
