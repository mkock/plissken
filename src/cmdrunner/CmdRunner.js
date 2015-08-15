/*!
 * plissken
 * by Martin Kock
 * MIT Licensed
 */
'use strict';

var debug = require('debug')('plissken:CmdRunner'),
  async = require('async'),
  Cmd = require('./../cmd/Cmd'),
  pagination = require('./pagination');

/**
 * @constructor
 */
function CmdRunner(datasrc) {
  this.cmds = [];
  this.datasrc = datasrc;
  this.pageFn = pagination.pageFn;
  this.stopFn = pagination.stopFn;
  this.context = {};
}

/**
 * @param {Function} User function which can create context data using "this".
 */
CmdRunner.prototype.newContext = function newContext(fn) {
  if (typeof fn !== 'function') {
    throw new Error('First argument must be a function');
  }
  return fn.call(this.context);
};

/**
 * @param {Array} Array of Cmds
 */
function validateCmds(cmds) {
  if (!Array.isArray(cmds)) {
    throw new Error('First argument must be an array');
  } else if (cmds.length === 0) {
    return next(null, []);
  } else if (cmds[0].getName() !== 'GetCmd') {
    throw new Error('First Cmd must be a GetCmd');
  }
  cmds.forEach(function(cmd, index) {
    if (!cmd instanceof Cmd) {
      throw new Error('Object at position %d is not a Cmd', index);
    }
  });
}

/**
 * Runs a single iteration of commands in a repeatable fashion.
 * @param {Function} Callback
 */
CmdRunner.prototype._runPages = function _runPages(next) {
  var self = this;
  this.context.step = 0;
  // Run Cmds one by one.
  async.series(this.cmds.map(function(cmd) {
    return async.apply(function iteration(aNext) {
      if (cmd.setDatasrc) cmd.setDatasrc(self.datasrc);
      if (cmd.setPageFn) cmd.setPageFn(self.pageFn);
      self.context.step++;
      cmd.setContext(self.context);
      debug('Running %s', cmd.getName());
      return cmd.exec.call(cmd, aNext);
    });
  }), next);
};

/**
 * Runs the given array of commands in order and returns the results.
 * @public
 */
CmdRunner.prototype.run = function run(cmds, next) {
  var self = this;
  validateCmds(cmds);
  this.cmds = cmds;
  listCmds(this.cmds);
  async.doWhilst(this._runPages.bind(self), function() {
    return self.stopFn.call(self.context, self.context.data);
  }, function(err) {
    return next(err, self.context.data.content);
  });
};

/**
 * Adds pagination to the command chain execution.
 * Two functions are required;
 * one that delivers the HTTP/GET query params required for fetching the next
 * page, and another that returns True if the next page should be loaded, and
 * False if page loading should stop.
 * @param {Function} Pagination function
 * @param {Function} Stop function
 */
CmdRunner.prototype.paginate = function paginate(pageFn, stopFn) {
  if (pageFn === null && stopFn === null) {
    // Treat the absence of arguments as a reset to default.
    this.pageFn = pagination.pageFn;
    this.stopFn = pagination.stopFn;
  } else if (typeof pageFn !== 'function') {
    throw new Error('First argument must be a function');
  } else if (typeof stopFn !== 'function') {
    throw new Error('Second argument must be a function');
  } else {
    this.pageFn = pageFn;
    this.stopFn = stopFn;
  }
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
}

// Export the constructor.
module.exports = CmdRunner;
