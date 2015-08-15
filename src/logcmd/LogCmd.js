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
LogCmd.prototype.exec = function exec(next) {
  Array.prototype.forEach.call(this.context.data.content, function(elem) {
    console.log(elem);
  });
  return next();
};

// Export the constructor.
module.exports = LogCmd;
