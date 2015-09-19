/*!
 * plissken
 * by Martin Kock
 * MIT Licensed
 */
'use strict';

var extend = require('extend'),
  Cmd = require('./../cmd/Cmd'),
  accept = require('./accept');

/**
 * @constructor
 * @param {String} Relative URL from REST service to GET from
 * @param {Function} Optional function for accepting/rejecting GET response
 * @param {Object} Optional extra options
 */
function GetCmd(relUrl, acceptFn, opts) {
  if (acceptFn && typeof acceptFn !== 'function') {
    throw new Error('Second argument must be a function');
  }
  Cmd.call(this, 'GetCmd');
  this.relUrl = relUrl;
  this.acceptFn = acceptFn || accept;
  this.opts = opts || {};
}

// Inherit from Cmd.
GetCmd.prototype = Object.create(Cmd.prototype);
GetCmd.prototype.constructor = GetCmd;

/**
 * Sets the data source
 * @param {Object} Data source
 */
GetCmd.prototype.setDatasrc = function setDatasrc(datasrc) {
  this.datasrc = datasrc;
};

/**
 * Sets the function used for retrieving paginated results
 * @param {Function} Pagination function
 */
GetCmd.prototype.setPageFn = function setPageFn(pageFn) {
  this.pageFn = pageFn;
};

/*
 * Executes this Cmd
 * @param {Function} next(err) Callback
 * @return {Object}
 */
GetCmd.prototype.exec = function exec(next) {
  var self = this,
    initOpts = {url: this.relUrl},
    currOpts = this.pageFn(initOpts),
    onePage = typeof currOpts === 'boolean' && !currOpts;
  // Reassign opts based on the "onePage" var.
  currOpts = onePage ? initOpts : extend(initOpts, currOpts);
  // Carry out the actual HTTP(S) request.
  return this.datasrc.get(currOpts, function(err, res) {
    return self.acceptFn.call(self.context, err, res, function(err, elems) {
      var eofErr;
      if (err) {
        return next(err);
      } else if (!onePage && typeof elems === 'boolean' && !elems) {
        eofErr = new Error('No more elems available');
        eofErr.name = 'EndOfDataError';
        return next(eofErr, null);
      }
      self.context.__done = onePage;
      self.context.__elems = elems;
      self.context._response = res;
      return next();
    });
  });
};

// Export the constructor.
module.exports = GetCmd;
