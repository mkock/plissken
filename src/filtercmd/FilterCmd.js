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
 */
function FilterCmd(filterFunc) {
  if (typeof filterFunc !== 'function') {
    throw new Error('First argument must be a function');
  }
  Cmd.call(this, 'FilterCmd');
  this.filterFunc = filterFunc;
};

// Inherit from Cmd.
FilterCmd.prototype = Object.create(Cmd.prototype);
FilterCmd.prototype.constructor = FilterCmd;

/*
 * @return {Object}
 */
FilterCmd.prototype.exec = function exec(next) {
  var self = this;
  async.filter(this.context.data.content, this.filterFunc.bind(this.context), function(content) {
    self.context.data.content = content;
    return next();
  });
};

// Export the constructor.
module.exports = FilterCmd;
