/*!
 * plissken
 * by Martin Kock
 * MIT Licensed
 */
'use strict';

var util = require('util'),
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
  Array.prototype.forEach.call(this.context.data.content, function(elem) {
    return self.logFn.call(self.context.data, elem);
  });
  return next();
};

// Export the constructor.
module.exports = LogCmd;
