# Money Converter

There are plenty of currency converter packages out there, each getting their conversion rates from different places. Money Converter looks at multiple sources to ensure that you always have the most accurate exchange rate avaialable. Its fast, simple, light weight and most importantly, fault resistant.

# Install
```bash
npm install money-converter
```

# Usage

To make sure that __money-converter__ is as fast as possible, you pass it in an array of currencies and a bse currency. __money-converter__ will then load the conversion rate between your base currency and each of the other currencies. This async process must be completed before the module can be used

we're going to be using the popular `async` module here for demonstation of how load the currencies before using them

make sure to include the base currency in the list of currencies you pass into the constructor

```javacript
var MoneyConverter = require('monver-converter');
var async = require('async');

var money;

async.series([

  // load and cache currency conversions
  // the base currency is USD
  function(done) {
    money = new MoneyConverter('USD', ['CAD', 'GBP', 'EUR', 'USD'], done)
  }

  // example of how we want to actually use it
  function(done) {

    money.convert(1000, {from: 'USD', to: 'EUR'});
    // => 914

    money.convert(10, {from: 'CAD', to: 'EUR'});
    // => 6.655501347120076

    money.convert(1, {from: 'GBP', to: 'USD'});
    // => 1.50534397109739

    done();
  }
])






