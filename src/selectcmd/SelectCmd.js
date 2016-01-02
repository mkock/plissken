/*!
 * plissken
 * by Martin Kock
 * MIT Licensed
 */
'use strict';

var util = require('util'),
  Cmd = require('./../cmd/Cmd');

/**
 * @constructor
 */
function SelectCmd(selFn) {
  if (typeof selFn !== 'function') {
    throw new Error('First argument must be a function');
  }
  Cmd.call(this, 'SelectCmd');
  this.selFn = selFn;
}

// Inherit from Cmd.
SelectCmd.prototype = Object.create(Cmd.prototype);
SelectCmd.prototype.constructor = SelectCmd;

/**
 * Executes this Cmd
 * @param {Function} Callback(err)
 * @return {Object}
 */
SelectCmd.prototype.exec = function(next) {
  var self = this;
  self.selFn.call(self.context, self.context.__content, function(err, elems) {
    if (err) {
      return next(err);
    } else if (!Array.isArray(elems)) {
      return next(new Error('"selFn" must return an array of elements'));
    }
    self.context.__elems = elems;
    return next();
  });
};

// Export the constructor.
module.exports = SelectCmd;
