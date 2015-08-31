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

/*
 * @return {Object}
 */
SaveCmd.prototype.exec = function exec(next) {
  var self = this;
  Array.prototype.forEach.call(this.context.data.content, function(elem) {
    return self.saveFn.call(self.context.data, elem);
  });
  return next();
};

// Export the constructor.
module.exports = SaveCmd;
