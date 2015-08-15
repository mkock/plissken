/*!
 * plissken
 * by Martin Kock
 * MIT Licensed
 */
'use strict';

var extend = require('extend'),
  Cmd = require('./../cmd/Cmd'),
  accept = require('./accept');

/**
 * @constructor
 * @param {String} Relative URL from REST service to GET from
 * @param {Function} Optional function for accepting/rejecting GET response
 * @param {Object} Optional extra options
 */
function GetCmd(relUrl, acceptFunc, opts) {
  if (acceptFunc && typeof acceptFunc !== 'function') {
    throw new Error('Second argument must be a function');
  }
  Cmd.call(this, 'GetCmd');
  this.relUrl = relUrl;
  this.acceptFunc = acceptFunc || accept;
  this.opts = opts || {};
};

// Inherit from Cmd.
GetCmd.prototype = Object.create(Cmd.prototype);
GetCmd.prototype.constructor = GetCmd;

/**
 * @param {Object} Data source
 */
GetCmd.prototype.setDatasrc = function setDatasrc(datasrc) {
  this.datasrc = datasrc;
};

/**
 * Sets the function used for retrieving paginated results.
 * @param {Function} Pagination function
 */
GetCmd.prototype.setPageFn = function setPageFn(pageFn) {
  this.pageFn = pageFn;
};

/*
 * @return {Object}
 */
GetCmd.prototype.exec = function exec(next) {
  var self = this,
    opts = extend({url: this.relUrl}, this.pageFn());
  return this.datasrc.get(opts, function(err, res) {
    self.context.data = res;
    return self.acceptFunc.call(self.context.data, err, res, function(err, data) {
      if (err) return next(err);
      self.context.data = data;
      return next();
    });
  });
};

// Export the constructor.
module.exports = GetCmd;
