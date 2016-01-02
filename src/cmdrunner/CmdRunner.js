/*!
 * plissken
 * by Martin Kock
 * MIT Licensed
 */
'use strict';

var debug = require('debug')('plissken:CmdRunner'),
  date = require('date-extended'),
  async = require('async'),
  Cmd = require('./../cmd/Cmd'),
  Context = require('./Context'),
  pagination = require('./pagination');

/**
 * @constructor
 */
function CmdRunner(datasrc, name) {
  this.name = name || 'plissken';
  this.cmds = [];
  this.datasrc = datasrc;
  this.pageFn = pagination;
  this.context = new Context();
}

/**
 * Returns time passed in a human readable format
 * @param {Object} Date representing start time
 * @param {Object} Date representing end time
 * @return {String} Human readable time
 */
function humanTime(start, end) {
  var secs = date.difference(start, end, 'seconds'),
    mins, hours;
  if (secs < 60) {
    return secs + (secs === 1 ? ' second' : ' seconds');
  } else {
    mins = date.difference(start, end, 'minutes');
    if (mins < 60) {
      return mins + (mins === 1 ? ' minute' : ' minutes');
    } else {
      hours = date.difference(start, end, 'hours');
      return hours + (hours === 1 ? ' hour' : ' hours');
    }
  }
}

/**
 * @param {Function} User function which can create context data using "this"
 */
CmdRunner.prototype.newContext = function newContext(fn) {
  if (typeof fn !== 'function') {
    throw new Error('First argument must be a function');
  }
  return fn.call(this.context);
};

/**
 * Returns the context for this CmdRunner
 * @return {Object} Context
 */
CmdRunner.prototype.getContext = function getContext() {
  return this.context;
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
 * Runs a single iteration of commands in a repeatable fashion
 * @param {Function} Callback
 */
CmdRunner.prototype._runPages = function _runPages(next) {
  var self = this;
  this.context.__step = 0;
  // Run Cmds one by one.
  async.series(this.cmds.map(function(cmd) {
    return async.apply(function iteration(aNext) {
      if (cmd.setDatasrc) cmd.setDatasrc(self.datasrc);
      if (cmd.setPageFn) cmd.setPageFn(self.pageFn);
      self.context.__step++;
      cmd.setContext(self.context);
      debug('Running %s', cmd.getName());
      return cmd.exec.call(cmd, function(err, __) {
        self.context.rmEmptyElems();
        self.context.cleanOne();
        return aNext(err, cmd.getName());
      });
    });
  }), function(err, cmds) {
    if (err) return next(err);
    // Push all elems onto a list in order.
    if (Array.isArray(self.context.__elems) && self.context.__elems.length) {
      self.context.__elems.forEach(function(elem) {
        self.context.elems.push(elem);
      });
    }
    return next();
  });
};

/**
 * @return {Boolean} True if GetCmd has marked that it's done, False otherwise
 * @private
 */
CmdRunner.prototype._isNotDone = function _isNotDone() {
  return !this.context.__done;
};

/**
 * Runs the given array of commands in order and returns the results
 * @param {Array} List of Cmds
 * @param {Function} Callback(err, res) where "res" is an array that contains
 *   a nested array per iteration (corresponds to the number of pages processed)
 * @public
 */
CmdRunner.prototype.run = function run(cmds, next) {
  var self = this,
    start = new Date(),
    end;
  validateCmds(cmds);
  this.cmds = cmds;
  listCmds(this.cmds);
  debug('Starting "%s"', this.name);
  // Stop condition is an Error with name = 'EndOfDataError'.
  async.doWhilst(this._runPages.bind(self), this._isNotDone.bind(self), function(err) {
    self.context.cleanTwo();
    end = new Date();
    if (err instanceof Error && err.name === 'EndOfDataError') {
      // This serves to mark that we're done.
      debug('Finished "%s" in %s', self.name, humanTime(start, end));
      return next(null, self.context.elems);
    } else {
      if (err) debug('Aborted "%s" due to an error', self.name);
      return next(err, self.context.elems);
    }
  });
};

/**
 * Adds pagination to the command chain execution.
 * A single function is required, which delivers the HTTP/GET query params
 * required for fetching the next page.
 * @param {Function} Pagination function
 */
CmdRunner.prototype.paginate = function paginate(pageFn) {
  this.pageFn = pagination.pageFn || pageFn;
  if (typeof pageFn !== 'function') {
    throw new Error('Argument must be a function');
  }
};

/**
 * Prints the Cmd names in order
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
