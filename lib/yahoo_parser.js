var YahooParser = function(err, resp, data) {
  var returnObject = {};

  if (err) {
    returnObject.err = err;
    return returnObject;
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
    returnObject.err = err;
    return returnObject;
  }

  var rate = response.query.results.rate.Rate;
  
  returnObject.rate = rate;
  returnObject.resp = resp;

  return returnObject;
};

module.exports = YahooParser;