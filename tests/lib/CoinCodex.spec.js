//Modules
const mocha = require('mocha');
const chai = require('chai');
var should = chai.should();

//Helpers
const CoinCodex = require('../../lib/CoinCodex');

const shared = require('../shared');

describe('CoinCodex', function () {
  beforeEach(function (done) {
    this.CoinCodexClient = new CoinCodex();

    done();
  });

  describe('firstPageHistory', function () {
    beforeEach(function (done) {
      this.CoinCodexClient.firstPageHistory({
        days: 31,
        coins_limit: 5,
        samples: 31,
      }).then((data) => {
        this.data = data;
        done();
      });
    });

    shared.shouldBeAValidRequest();
  });

  describe('coins', function () {

    describe('all', function () {
      beforeEach(function (done) {
        this.CoinCodexClient.coins.all().then((data) => {
          this.data = data;
          done();
        });
      });

      shared.shouldBeAValidRequest();
    });

    describe('fetch', function () {
      beforeEach(function (done) {
        this.CoinCodexClient.coins.fetch('btc').then((data) => {
          this.data = data;
          done();
        });
      });

      shared.shouldBeAValidRequest();
    });

    describe('fetchHistory', function () {
      beforeEach(function (done) {
        this.CoinCodexClient.coins.fetchHistory('btc', {
          start_date: '2018-01-01',
          end_date: '2018-01-31',
          samples: 31,
        }).then((data) => {
          this.data = data;
          done();
        });
      });

      shared.shouldBeAValidRequest();
    });

    describe('markets', function () {
      beforeEach(function (done) {
        this.CoinCodexClient.coins.markets('btc').then((data) => {
          this.data = data;
          done();
        });
      });

      shared.shouldBeAValidRequest();
    });

    describe('ranges', function () {
      beforeEach(function (done) {
        this.CoinCodexClient.coins.ranges([
          'btc',
          'eth',
        ]).then((data) => {
          this.data = data;
          done();
        });
      });

      shared.shouldBeAValidRequest();
    });

  });

});