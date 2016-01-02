/*!
 * plissken
 * by Martin Kock
 * MIT Licensed
 */
'use strict';

var async = require('async'),
  Cmd = require('./../cmd/Cmd'),
  Datasrc = require('./../datasrc/Datasrc'),
  RequestManager = require('./../datasrc/RequestManager'),
  accept = require('./accept');

/**
 * @constructor
 * @param {Function} URL provider function
 * @param {Function} Optional function for accepting/rejecting GET response
 * @param {Function} Function that does the actual work of extending an elem
 * @param {Object} Optional extra options
 */
function ExtendCmd(urlFn, acceptFn, extendFn, opts) {
  Cmd.call(this, 'ExtendCmd');
  this.reqManager = false;
  this.urlFn = urlFn;
  this.acceptFn = acceptFn || accept;
  this.extendFn = extendFn;
  this.opts = opts || {};
}

// Inherit from Cmd.
ExtendCmd.prototype = Object.create(Cmd.prototype);
ExtendCmd.prototype.constructor = ExtendCmd;

/**
 * @param {Object} Data source
 */
ExtendCmd.prototype.setDatasrc = function setDatasrc(datasrc) {
  if (!datasrc instanceof Datasrc) {
    throw new Error('Argument must be an instance of Datasrc');
  }
  this.datasrc = datasrc;
  this.reqManager = new RequestManager(this.datasrc, this.opts.concurrency);
};

/**
 * Delegates the request to RequestManager and validates the response
 * @param {Object} Request
 * @param {Function} Callback
 */
ExtendCmd.prototype._get = function _get(req, next) {
  var self = this;
  // Carry out the actual HTTP(S) request.
  return this.reqManager.get(req, function(err, res) {
    return self.acceptFn.call(self.context, err, res, function(err, elem) {
      if (err) {
        return next(err);
      }
      return next(null, res, elem);
    });
  });
};

/*
 * Executes this Cmd
 * @param {Function} next(err) Callback
 */
ExtendCmd.prototype.exec = function exec(next) {
  // 1. Iterate elems
  // 2. Call urlFn to get URL
  // 3. Make request
  // 4. Check with acceptFn
  // 5. Feed elem and response (xElem) into extendFn
  // 6. Store results
  var self = this;
  return async.map(this.context.__elems, function(elem, aNext) {
    return self.urlFn.call(self.context, elem, {}, function(err, req) {
      if (err) {
        return aNext(err);
      } else if (!req || typeof req !== 'object' || !req.url) {
        return aNext(new Error('"urlFn" must provide a relative URL to request'));
      } else {
        return self._get(req, function(err, res, xElem) {
          if (err) return aNext(err);
          return self.extendFn.call(self.context, elem, xElem, res, aNext);
        });
      }
    });
  }, function(err, elems) {
    if (!err) {
      // Replace elems by their extended counterparts.
      self.context.__elems = elems;
    }
    return next(err);
  });
};

// Export the constructor.
module.exports = ExtendCmd;
