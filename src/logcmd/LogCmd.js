/*!
 * plissken
 * by Martin Kock
 * MIT Licensed
 */
'use strict';

var async = require('async'),
  util = require('util'),
  Cmd = require('./../cmd/Cmd'),
  stdout = require('./stdout');

/**
 * @constructor
 * @param {Function} logFn(elem) Optional custom log function
 */
function LogCmd(logFn) {
  Cmd.call(this, 'LogCmd');
  this.logFn = logFn || stdout; // Fallback is stdout.
  if (typeof this.logFn !== 'function') {
    throw new Error('Argument is not a function');
  }
};

// Inherit from Cmd.
LogCmd.prototype = Object.create(Cmd.prototype);
LogCmd.prototype.constructor = LogCmd;

/*
 * Executes this Cmd
 * @param {Function} next(err) Callback
 * @return {Object}
 */
LogCmd.prototype.exec = function exec(next) {
  var self = this;
  async.eachSeries(this.context.__elems, function(elem, aNext) {
    return self.logFn.call(self.context, elem, aNext);
  }, next);
};

// Export the constructor.
module.exports = LogCmd;
