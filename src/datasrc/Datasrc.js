/*!
 * plissken
 * by Martin Kock
 * MIT Licensed
 */
 'use strict';

var debug = require('debug')('plissken:Datasrc'),
  request = require('request'),
  prettyBytes = require('pretty-bytes'),
  retry = require('retry'),
  extend = require('extend');

/**
 * @constructor
 */
function Datasrc(opts, retryOpts) {
  this.opts = extend({
    headers: {
      'User-Agent': 'node.js/plissken'
    }
  }, opts);
  this.retryOpts = retryOpts || {
    retries: 3,
    factor: 3,
    minTimeout: 1 * 1000,
    maxTimeout: 60 * 1000,
  };
}

/**
 * @param {Object} Options
 */
function makeOpts(opts, moreOpts) {
  return checkOpts(extend(opts, moreOpts));
}

/**
 * @param {Object} Options
 */
function checkOpts(opts) {
  if (!opts.baseUrl) throw new Error('Need baseUrl');
  else if (!opts.url) throw new Error('Need relative url');
  return opts;
}

/**
 * Requests the URL provided in opts.baseUrl + opts.url, retrying when it fails
 * @param {Object} Options
 * @param {Function} Next
 */
Datasrc.prototype.get = function(opts, next) {
  var self = this,
    op = retry.operation(this.retryOpts);
  this.opts = makeOpts(this.opts, opts);
  op.attempt(function(currAttempt) {
    var url = self.opts.baseUrl + self.opts.url;
    debug('GET %s, attempt %d', url, currAttempt);
    return request(self.opts, function(err, res, body) {
      debug('GET %s %d %s, %s',
        url,
        res.statusCode,
        res.statusMessage,
        prettyBytes(parseInt(res.headers['content-length']) || 0)
      );
      // TODO: Only retry for timeout responses?
      if (op.retry(err)) return;
      return next(err ? op.mainError() : null, {
        request: opts, response: res, content: body
      });
    });
  });
};

// Export the constructor.
module.exports = Datasrc;
