/*!
 * plissken
 * by Martin Kock
 * MIT Licensed
 */
'use strict';

var async = require('async'),
  util = require('util'),
  Cmd = require('./../cmd/Cmd');

/**
 * @constructor
 */
function SaveCmd(saveFn) {
  Cmd.call(this, 'SaveCmd');
  this.saveFn = saveFn; // Fallback is stdout.
  if (typeof this.saveFn !== 'function') {
    throw new Error('Argument is not a function');
  }
};

// Inherit from Cmd.
SaveCmd.prototype = Object.create(Cmd.prototype);
SaveCmd.prototype.constructor = SaveCmd;

/**
 * Executes this Cmd
 * @param {Function} next(err) Callback
 */
SaveCmd.prototype.exec = function(next) {
  var self = this;
  async.each(this.context.__elems, function(elem, aNext) {
    return self.saveFn.call(self.context, elem, aNext);
  }, next);
};

// Export the constructor.
module.exports = SaveCmd;
