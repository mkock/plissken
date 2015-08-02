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
function GetCmd(relUrl, opts) {
  Cmd.call(this, 'GetCmd');
  this.relUrl = relUrl;
  this.opts = opts || {};
};

// Inherit from Cmd.
GetCmd.prototype = Object.create(Cmd.prototype);
GetCmd.prototype.constructor = GetCmd;

/*
 * @return {Object}
 */
GetCmd.prototype.exec = function exec(next) {
  // TODO: Use URL with opts to fetch data.
  return next(null, [{value: 1}, {value: 2}, {value: 3}, {value: 4}, {value: 5}, {value: 6}, {value: 7}, {value: 8}, {value: 9}, {value: 10}]);
};

// Export the constructor.
module.exports = GetCmd;
