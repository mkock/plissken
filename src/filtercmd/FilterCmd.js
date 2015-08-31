/*!
 * plissken
 * by Martin Kock
 * MIT Licensed
 */
'use strict';

var util = require('util'),
  async = require('async'),
  Cmd = require('./../cmd/Cmd');

/**
 * @constructor
 * @param {Function} filterFn(elem, next) Filter function
 */
function FilterCmd(filterFn) {
  if (typeof filterFn !== 'function') {
    throw new Error('First argument must be a function');
  }
  Cmd.call(this, 'FilterCmd');
  this.filterFn = filterFn;
};

// Inherit from Cmd.
FilterCmd.prototype = Object.create(Cmd.prototype);
FilterCmd.prototype.constructor = FilterCmd;

/**
 * Executes this Cmd
 * @param {Function} next(err) Callback
 */
FilterCmd.prototype.exec = function exec(next) {
  var self = this;
  async.filter(this.context.data.content, this.filterFn.bind(this.context), function(content) {
    self.context.data.content = content;
    return next();
  });
};

// Export the constructor.
module.exports = FilterCmd;
