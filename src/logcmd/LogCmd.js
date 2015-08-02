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
function LogCmd() {
  Cmd.call(this, 'LogCmd');
};

// Inherit from Cmd.
LogCmd.prototype = Object.create(Cmd.prototype);
LogCmd.prototype.constructor = LogCmd;

/*
 * @return {Object}
 */
LogCmd.prototype.exec = function exec(elems, next) {
  Array.prototype.forEach.call(elems, function(elem) {
    console.log(elem);
  });
  // Pass elems untouched.
  return next(null, elems);
};

// Export the constructor.
module.exports = LogCmd;
