var Fx = require('./convert');

var CURRENCIES = ['USD','EUR', 'CAD', 'GBP'];

var fx = new Fx('USD', CURRENCIES, function() {
  
  setTimeout(function() {
     console.log('waited 2 min');
  }, 120000);  
});