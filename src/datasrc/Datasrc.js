/*!
 * plissken
 * by Martin Kock
 * MIT Licensed
 */
 'use strict';

var debug = require('debug')('plissken:Datasrc'),
  request = require('request'),
  extend = require('extend');

/**
 * @constructor
 */
function Datasrc(opts) {
  this.opts = extend({
    headers: {
      'User-Agent': 'plissken'
    }
  }, opts);
};

/**
 * @param {Object} Options
 */
function makeOpts(opts, moreOpts) {
  return checkOpts(extend(opts, moreOpts));
};

/**
 * @param {Object} Options
 */
function checkOpts(opts) {
  if (!opts.baseUrl) throw new Error('Need baseUrl');
  else if (!opts.url) throw new Error('Need relative url');
  return opts;
};

/**
 * @param {Object} HTTP response headers
 * @param {String} HTTP response body
 */
function toErr(res, body) {
  return new Error('HTTP/%d %s', res.statusCode, body);
}

/**
 * @param {Object} Options
 * @param {Function} Next
 */
Datasrc.prototype.get = function get(opts, next) {
  this.opts = makeOpts(this.opts, opts);
  debug('GET %s', this.opts.baseUrl + this.opts.url);
  return request(this.opts, function(err, res, body) {
    return next(err, {request: opts, response: res, content: body});
  });
};

// Export the constructor.
module.exports = Datasrc;
