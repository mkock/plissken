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
SelectCmd.prototype.exec = function exec(elems, next) {
  console.log('SelectCmd', elems);
  return next(null, Array.prototype.map.call(elems, this.selectFunc));
};

// Export the constructor.
module.exports = SelectCmd;
