/*!
 * plissken
 * by Martin Kock
 * MIT Licensed
 */
'use strict';

var async = require('async'),
  Cmd = require('./../cmd/Cmd');

/**
 * @constructor
 */
function CustomCmd(customFn) {
  Cmd.call(this, 'CustomCmd');
  this.customFn = customFn;
  if (typeof this.customFn !== 'function') {
    throw new Error('Argument is not a function');
  }
};

// Inherit from Cmd.
CustomCmd.prototype = Object.create(Cmd.prototype);
CustomCmd.prototype.constructor = CustomCmd;

/**
 * Executes this Cmd
 * @param {Function} next(err) Callback
 */
CustomCmd.prototype.exec = function(next) {
  var self = this;
  async.map(this.context.__elems, function(elem, aNext) {
    return self.customFn.call(self.context, elem, aNext);
  }, function(err, elems) {
    if (!err) {
      // Replace elems by their modified counterparts.
      self.context.__elems = elems;
    }
    return next(err);
  });
};

// Export the constructor.
module.exports = CustomCmd;
