/*!
 * plissken
 * by Martin Kock
 * MIT Licensed
 */
'use strict';

/**
 * Plissken Test Suite
 */
describe('Plissken Cmd Test Suite', function() {

  /**
   * Test RequestManager
   */
  describe('RequestManager Tests', function() {

    var ReqMan = require('./../src/datasrc/RequestManager'),
      MockDatasrc = require('./helpers/MockDatasrc');

    it('fails when "concurrency" is not a positive number', function() {
      var instantiate = function() {
        var reqMan = new ReqMan(new MockDatasrc(), -1); 
      }
      expect(instantiate).toThrowError();
    });

    it('accepts positive numbers as "concurrency"', function() {
      var reqMan = new ReqMan(new MockDatasrc(), 10);
      expect(reqMan.getConcurrency()).toEqual(10);
    });

    it('uses the correct data source', function() {
      var reqMan = new ReqMan(new MockDatasrc(), 10);
      expect(reqMan.getDatasrc() instanceof MockDatasrc).toBeTruthy();
    });

    it('calls "get" on the data source', function() {
      var mockDatasrc = new MockDatasrc(),
        reqMan = new ReqMan(mockDatasrc, 1);
      spyOn(mockDatasrc, 'get').and.callThrough();
      reqMan.get({num: 1}, function(err, res) {
        expect(mockDatasrc.get).toHaveBeenCalled();
      });
    });

  });

});
