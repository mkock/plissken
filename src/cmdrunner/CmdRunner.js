/*!
 * plissken
 * by Martin Kock
 * MIT Licensed
 */
'use strict';

var async = require('async'),
  Cmd = require('./../cmd/Cmd');

/**
 * @constructor
 */
function CmdRunner() {
  this.cmds = [];
};

/**
 * Runs the given array of commands in order and returns the results.
 * @public
 */
CmdRunner.prototype.run = function run(cmds, next) {
  var self = this;
  this.cmds = cmds;
  if (!Array.isArray(cmds)) {
    throw new Error('First argument must be an array');
  } else if (cmds.length === 0) {
    return next(null, []);
  } else if (!isCmds(cmds)) {
    throw new Error('First argument must be an array of Cmd objects');
  } else if (cmds[0].getName() !== 'GetCmd') {
    throw new Error('First Cmd must be a GetCmd');
  }
  listCmds(self.cmds);
  // Needs to be async.
  async.waterfall(this.cmds.map(function(cmd) {
    return async.apply(cmd.exec.bind(cmd));
  }), function(err, sums) {
    return next(err, sums);
  });
};

/**
 * @param {Array} Array of Cmds
 * @return {Boolean} True if array contains all-Cmds, False otherwise
 */
function isCmds(cmds) {
  return Array.prototype.every.call(cmds, function(cmd) {
    return cmd instanceof Cmd;
  });
};

/**
 * Prints the Cmd names in order.
 * @param {Array} Array of Cmds
 */
function listCmds(cmds) {
  var names = [];
  Array.prototype.forEach.call(cmds, function(cmd) {
    return names.push(cmd.getName());
  });
  console.log(names.join(' -> '));
};

// Export the constructor.
module.exports = CmdRunner;
