'use strict';

//Modules
const https = require('https');

//Helpers
const Utils = require('./helpers/utilities');
const Constants = require('./helpers/constants');
const ReturnObject = require('./helpers/ReturnObject');

/**
 * @class CoinCodex
 * @author Mark Miscavage <markmiscavage@protonmail.com>
 * @description A Node.js wrapper for the CoinCodex API with no dependencies. For more information, visit: https://coincodex.com/page/api/
 * @example
 *     const CoinCodex = require('coincodex-api');
 *     const CoinCodexClient = new CoinCodex();
 * @public
 * @version 1.0.0
 * @license MIT
 * @kind class
 */
class CoinCodex {

  /**
   * @description Returns historic data for coins needed to draw the graph on the frontpage
   * @function firstPageHistory()
   * @async
   * @param {object} params - Parameters to pass through to the request
   * @param {string|number} params.days - (Required) The number of days we need the history for
   * @param {string|number} params.coins_limit - (Required) The number of top coins (by market cap) must be returned
   * @param {string|number} params.samples [default: 1] - How many price values between the start_date and end_date to be included in the results.
   *   (i.e. if start_date: 2018-01-01, end_date: 2018-01-31, samples: 1. Only 1 value will be returned. If samples: 30, 30 values will be returned)
   * @returns {ReturnObject}
   */
  async firstPageHistory(params = {}) {
    //Must be object
    if (!Utils.isObject(params)) Utils._WARN_('Invalid parameter', 'params must be of type: Object');

    if (!params['days']) Utils._WARN_('Missing parameter', 'params must include `days` and be a string or number');
    if (!params['coins_limit']) Utils._WARN_('Missing parameter', 'params must include `coins_limit` and be a string or number');

    //If no 'samples', just set to default: 1
    if (Utils.isNumber(params['samples'])) params['samples'] = `${params['samples']}`;
    if (!Utils.isString(params['samples']) || Utils.isStringEmpty(params['samples'])) {
      params['samples'] = 1;
    }

    //Get values
    const { days, samples, coins_limit } = params;

    const path = `/api/coincodex/get_firstpage_history/${days}/${samples}/${coins_limit}`;
    const options = this._buildRequestOptions(path);

    return this._request(options);
  };

  /**
   * @description Calls related to coins
   */
  get coins() {
    return {

      /**
       * @description Returns all coins on the platform with properties that are needed to display them on the frontpage
       * @function coins.all()
       * @async
       * @returns {ReturnObject}
       */
      all: async () => {
        const path = `/apps/coincodex/cache/all_coins.json`;
        const options = this._buildRequestOptions(path);

        return this._request(options);
      },

      /**
       * @description Returns all properties for the coin needed to display the coin details page
       * @function coins.fetch()
       * @async
       * @param {string} coinId - (Required) The unique internal id for the coin
       * @returns {ReturnObject}
       */
      fetch: async (coinId) => {
        //Must have coinId
        if (!Utils.isString(coinId) || Utils.isStringEmpty(coinId)) Utils._WARN_('Invalid parameter', 'coinId must be of type: String and greater than 0 characters.');

        const path = `/api/coincodex/get_coin/${coinId}`;
        const options = this._buildRequestOptions(path);

        return this._request(options);
      },

      /**
       * @description Returns historical price data for a single coin
       * @function coins.fetchHistory()
       * @async
       * @param {string} coinId - (Required) The unique internal id for the coin
       * @param {object} params - Parameters to pass through to the request
       * @param {string} params.start_date - (Required) The start date of the historical data snapshot in YYYY-MM-DD. e.g. 2018-01-01
       * @param {string} params.end_date - (Required) The end date of the historical data snapshot in YYYY-MM-DD. e.g. 2018-01-31
       * @param {string|number} params.samples [default: 1] - How many price values between the start_date and end_date to be included in the results.
       *   (i.e. if start_date: 2018-01-01, end_date: 2018-01-31, samples: 1. Only 1 value will be returned. If samples: 30, 30 values will be returned)
       * @returns {ReturnObject}
       */
      fetchHistory: async (coinId, params = {}) => {
        //Must have coinId
        if (!Utils.isString(coinId) || Utils.isStringEmpty(coinId)) Utils._WARN_('Invalid parameter', 'coinId must be of type: String and greater than 0 characters.');

        //Must be object
        if (!Utils.isObject(params)) Utils._WARN_('Invalid parameter', 'params must be of type: Object');

        //If no params.start_date, params.end_date... Warn
        if (!Utils.isString(params['start_date']) || Utils.isStringEmpty(params['date'])) Utils._WARN_('Missing parameter', 'params must include `start_date` and be a string in format: `YYYY-MM-DD`');
        if (!Utils.isString(params['end_date']) || Utils.isStringEmpty(params['end_date'])) Utils._WARN_('Missing parameter', 'params must include `end_date` and be a string in format: `YYYY-MM-DD`');

        //If no 'samples', just set to default: 1
        if (Utils.isNumber(params['samples'])) params['samples'] = `${params['samples']}`;
        if (!Utils.isString(params['samples']) || Utils.isStringEmpty(params['samples'])) {
          params['samples'] = 1;
        }

        //Get values
        const { start_date, end_date, samples } = params;

        const path = `/api/coincodex/get_coin_history/${coinId}/${start_date}/${end_date}/${samples}`;
        const options = this._buildRequestOptions(path);

        return this._request(options);
      },

      /**
       * @description Returns exchanges and markets for a coin
       * @function coins.markets()
       * @async
       * @param {string} coinId - (Required) The unique internal id for the coin
       * @returns {ReturnObject}
       */
      markets: async (coinId) => {
        //Must have coinId
        if (!Utils.isString(coinId) || Utils.isStringEmpty(coinId)) Utils._WARN_('Invalid parameter', 'coinId must be of type: String and greater than 0 characters.');

        const path = `/api/exchange/get_markets_by_coin/${coinId}`;
        const options = this._buildRequestOptions(path);

        return this._request(options);
      },

      /**
      * @description Returns min and max ranges of given coinId(s) for 1 hour, 1 day, 7 day, 30 day, 90 day, 180 day, year to date, last 365 days and all time.
      * @function coins.ranges()
      * @async
      * @param {string|array} coinIds - (Required) A comma separated string or array of the unique internal id(s) for coin(s)
      * @returns {ReturnObject}
      */
      ranges: async (coinIds) => {
        if (Utils.isString(coinIds) && Utils.isStringEmpty(coinIds)) Utils._WARN_('Invalid parameter', 'coinId must be of type: String or Array and greater than 0 characters, items.');

        if (Utils.isArray(coinIds)) {
          if (coinIds.length === 0) Utils._WARN_('Invalid parameter', 'coinId must be of type: String or Array and greater than 0 characters, items.');

          //If are arrays, convert to string
          coinIds = coinIds.join(',');
        }

        const path = `/api/coincodex/get_coin_ranges/${coinIds}`;
        const options = this._buildRequestOptions(path);

        return this._request(options);
      },
    };
  };

  /**
   * @description Build options for https.request
   * @function _buildRequestOptions
   * @protected
   * @param {string} path - Relative path for API
   * @param {object} params - Object representing query strings for url parameters
   * @returns {Object} - {path, method, host, port} Options for request
   */
  _buildRequestOptions(path) {
    return {
      path,
      method: 'GET',
      host: Constants.HOST,
      port: 443,
    };
  };

  /**
   * @description Perform https request
   * @function _request
   * @protected
   * @param {object} options - https.request options (from _buildRequestOptions())
   * @returns {Promise} Body of https request data results
   */
  _request(options) {
    return new Promise((resolve, reject) => {
      //Perform request
      let req = https.request(options, (res) => {
        let body = [];

        //Set body on data
        res.on('data', (chunk) => {
          body.push(chunk);
        });

        //On end, end the Promise
        res.on('end', () => {
          try {
            body = Buffer.concat(body);
            body = body.toString();

            //Check if page is returned instead of JSON
            if (body.startsWith('<!DOCTYPE html>')) Utils._WARN_('Invalid request', 'There was a problem with your request. The parameter(s) you gave are missing or incorrect.');

            //Attempt to parse
            body = JSON.parse(body);
          }
          catch (error) {
            reject(error);
          };

          //Create return object
          resolve(
            ReturnObject(
              !(res.statusCode < 200 || res.statusCode >= 300),
              res.statusMessage,
              res.statusCode,
              body
            )
          );
        });
      });

      //On error, reject the Promise
      req.on('error', (error) => reject(error));

      //End request
      req.end();
    });
  };
};

//Set Constants
CoinCodex.API_VERSION = Constants.API_VERSION;
CoinCodex.ACCEPTED_METHODS = Constants.ACCEPTED_METHODS;

//

module.exports = exports = CoinCodex;