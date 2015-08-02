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
FilterCmd.prototype.exec = function exec(elems, next) {
  return next(null, Array.prototype.filter.call(elems, this.filterFunc));
};

// Export the constructor.
module.exports = FilterCmd;
