/*!
 * plissken
 * by Martin Kock
 * MIT Licensed
 */
 'use strict';

var debug = require('debug')('plissken:datasrc'),
  request = require('request'),
  extend = require('extend'),
  xml2json = require('xml2json');

/**
 * @constructor
 */
function Datasrc(opts) {
  this.opts = opts;
};

/**
 * @param {Object} Options
 */
function makeOpts(opts, moreOpts) {
  debug('GET %s', opts.baseUrl + moreOpts.url);
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
 * @param {String} Body
 */
function toJSON(headers, body) {
  if (/^application\/json/.test(headers['content-type'])) {
    return JSON.parse(body);
  } else if (/^application\/xml/.test(headers['content-type'])) {
    return xml2json.toJson(body);
  } else {
    return body;
  }
};

/**
 * @param {Object} Options
 * @param {Function} Next
 */
Datasrc.prototype.get = function get(opts, next) {
  return request(makeOpts(this.opts, opts), function(err, response, body) {
    if (err) return next(err);
    return next(null, toJSON(response.headers, body));
  });
};

// Export the constructor.
module.exports = Datasrc;
