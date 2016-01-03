/*!
 * plissken
 * by Martin Kock
 * MIT Licensed
 */
 'use strict';

var async = require('async'),
  debug = require('debug')('plissken:RequestManager');

/**
 * @Constructor
 */
function RequestManager(datasrc, concurrency) {
  var self = this;
  if (concurrency && (typeof concurrency !== 'number' || concurrency < 1)) {
    throw new Error('Parameter "concurrency" must be a positive number');
  }
  this.datasrc = datasrc;
  this.concurrency = concurrency;
  this.cargo = async.cargo(this._worker.bind(this), this.concurrency);
  this.cargo.saturated = function() {
    debug('Starting to queue requests (queue size is %d)', self.cargo.length());
  };
}

/**
 * Worker function for async.cargo
 * @param {Array} List of Datasrc options
 * @param {Function} Callback
 */
RequestManager.prototype._worker = function(tasks, next) {
  debug('Making %d concurrent requests', tasks.length);
  async.parallel(tasks, function(err, res) {
    return next(err);
  });
};

/**
 * Make a request under RequestManager's control
 * @param {Object} Request that will be provided to Datasrc
 * @param {Function} Callback
 */
RequestManager.prototype.get = function(req, next) {
  var self = this,
    _err, _res;
  return this.cargo.push(function(aNext) {
    return self.datasrc.get(req, function(err, res) {
      _err = err;
      _res = res;
      return aNext(err, res);
    });
  }, function() {
    return next(_err, _res);
  });
};

/**
 * Returns the currently used Datasrc object.
 * @return {Object} Datasrc
 */
RequestManager.prototype.getDatasrc = function() {
  return this.datasrc;
}

/**
 * Returns the current concurrency value.
 * @return {Number} Concurrency
 */
RequestManager.prototype.getConcurrency = function() {
  return this.concurrency;
}

// Export the constructor.
module.exports = RequestManager;
