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
};

// Inherit from Cmd.
SelectCmd.prototype = Object.create(Cmd.prototype);
SelectCmd.prototype.constructor = SelectCmd;

/*
 * @return {Object}
 */
SelectCmd.prototype.exec = function exec(next) {
  var self = this;
  self.selectFunc.call(self.context, self.context.data.content, function(err, content) {
    if (err) return next(err);
    self.context.data.content = content;
    return self.clean(self.context.data.content, function(err, content) {
      if (!err) self.context.data.content = content;
      return next(err);
    });
  });
};

// Export the constructor.
module.exports = SelectCmd;
