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
function SelectCmd(selectFunc) {
  if (typeof selectFunc !== 'function') {
    throw new Error('First argument must be a function');
  }
  Cmd.call(this, 'SelectCmd');
  this.selectFunc = selectFunc;
}

// Inherit from Cmd.
SelectCmd.prototype = Object.create(Cmd.prototype);
SelectCmd.prototype.constructor = SelectCmd;

/**
 * Executes this Cmd
 * @param {Function} Callback(err)
 * @return {Object}
 */
SelectCmd.prototype.exec = function exec(next) {
  var self = this;
  self.selectFunc.call(self.context, self.context.__elems, function(err, elems) {
    if (err) return next(err);
    self.context.__elems = elems;
    return self.clean(self.context.__elems, function(err, elems) {
      if (!err) self.context.__elems = elems;
      return next(err);
    });
  });
};

// Export the constructor.
module.exports = SelectCmd;
