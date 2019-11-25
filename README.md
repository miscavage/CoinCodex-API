# CoinCodex API Client for Node.js

<span class="badge-travisci"><a href="http://travis-ci.org/miscavage/CoinCodex-API" title="Check this project's build status on TravisCI"><img src="https://img.shields.io/travis/miscavage/CoinCodex-API/master.svg" alt="Travis CI Build Status" /></a></span>
<span class="badge-npmversion"><a href="https://npmjs.org/package/coincodex-api" title="View this project on NPM"><img src="https://img.shields.io/npm/v/coincodex-api.svg" alt="NPM version"/></a></span>
<span class="badge-npmdownloads"><a href="https://npmjs.org/package/coincodex-api" title="View this project on NPM"><img src="https://img.shields.io/npm/dm/coincodex-api.svg" alt="NPM downloads" /></a></span>
<span class="badge-daviddm"><a href="https://david-dm.org/miscavage/coincodex-api" title="View the status of this project's dependencies on DavidDM"><img src="https://img.shields.io/david/miscavage/coincodex-api.svg" alt="Dependency Status" /></a></span>
<span class="badge-daviddmdev"><a href="https://david-dm.org/miscavage/coincodex-api#info=devDependencies" title="View the status of this project's development dependencies on DavidDM"><img src="https://img.shields.io/david/dev/miscavage/coincodex-api.svg" alt="Dev Dependency Status" /></a></span>

A Node.js wrapper for the CoinCodex API with no dependencies.

## • Installation

Latest version: 0.0.1

`npm install coincodex-api`

## • CoinCodex API Documentation

For complete API documentation, up-to-date parameters, responses and errors, please refer to https://coincodex.com/page/api.

## • Quick Start Example

```javascript
//1. Import coincodex-api
const CoinCodex = require('coincodex-api');

//2. Initiate the CoinCodex API Client
const CoinCodexClient = new CoinCodex();

//3. Make calls
var func = async() => {
  let data = await CoinCodexClient.coins.fetch('btc');
};
```

_
## • Making Calls
All calls using the CoinCodexClient are asynchronous.

All calls are returned in the following format:
```javascript
{
    success: Boolean,
    message: String,
    code: Number,
    data: Object
}
```

The CoinCodexClient splits up the currently available calls outline in the official CoinCodex API documentation into two parts. (Including `firstPageHistory()`)

| Namespace | Usage | Description |
| --- | --- | --- |
`coins` | `CoinCodexClient.coins[...]` | Calls related to coins

___
### • First Page History
Returns historic data for coins needed to draw the graph on the frontpage.

#### `firstPageHistory()`
Check API server status.

Params:

- `params`: `Object` - Parameters to pass through to the request
- `params.days`: `String|Number` - (Required) The number of days we need the history for
- `params.coins_limit`: `String|Number` - (Required) The number of top coins (by market cap) must be returned
- `params.samples` `String|Number` [default: `1`] - How many price values between the start_date and end_date to be included in the results.

Usage Example:
```javascript
let data = await CoinCodexClient.firstPageHistory();
```

___
### • Coins
Calls related to coins.


#### `coins.all()`
Returns all coins on the platform with properties that are needed to display them on the frontpage.

Usage Example:
```javascript
let data = await CoinCodexClient.coins.all();
```

___
#### `coins.fetch()`
Returns all properties for the coin needed to display the coin details page.

Params:
             
- `coinId`: `String` - (Required) The unique internal id for the coin

Usage Example:
```javascript
let data = await CoinCodexClient.coins.fetch('btc');
```

___
#### `coins.fetchHistory()`
Returns historical price data for a single coin.

Params:

- `coinId`: `String` - (Required) The unique internal id for the coin
- `params`: `Object` - Parameters to pass through to the request
- `params.start_date`: `String` - (Required) The start date of the historical data snapshot in YYYY-MM-DD e.g. `2018-01-01`
- `params.end_date`: `String` - (Required) The start date of the historical data snapshot in YYYY-MM-DD e.g. `2018-01-31`
- `params.samples`: `String|Number` [default: `1`] - How many price values between the `start_date` and `end_date` to be included in the results. (e.g. if `start_date`: `2018-01-01`, `end_date`: `2018-01-31`, `samples`: `1`. Only `1` value will be returned. If `samples`: `30`, `30` values will be returned)

Usage Example:
```javascript
let data = await CoinCodexClient.coins.fetchHistory('btc', {
  start_date: '2018-01-01',
  end_date: '2018-01-31',
  samples: 30,
});
```

___
#### `coins.markets()`
Returns exchanges and markets for a coin.

Params:

- `coinId`: `String` - (Required) The unique internal id for the coin

Usage Example:
```javascript
let data = await CoinCodexClient.coins.markets('btc');
```

___
#### `coins.ranges()`
Returns min and max ranges of given coinId(s) for 1 hour, 1 day, 7 day, 30 day, 90 day, 180 day, year to date, last 365 days and all time.

Params:

- `coinIds`: `String|Array` - (Required) A comma separated string or array of the unique internal id(s) for coin(s)

Usage Example:
```javascript
//Single
let data = await CoinCodexClient.coins.ranges('btc');
//Multiple
let data = await CoinCodexClient.coins.ranges(['btc', 'eth']);
//Multiple alternative
let data = await CoinCodexClient.coins.ranges('btc,eth');
```

## • Say Hi

Find me on Gab: [@markmiscavage](https://gab.com/markmiscavage).

Tweet at me: [@markmiscavage](https://twitter.com/markmiscavage).

## • License

MIT License

Copyright (c) 2019 Mark Miscavage

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.