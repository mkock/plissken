/*!
 * plissken
 * by Martin Kock
 * MIT Licensed
 */
 'use strict';

var xml2json = require('xml2json');

/**
 * @param {Object} HTTP response
 * @param {String} Body
 * @return {Object} Body
 */
function toJSON(res, body) {
  if (/^application\/json/.test(res.headers['content-type'])) {
    return JSON.parse(body);
  } else if (/^application\/xml/.test(res.headers['content-type'])) {
    return xml2json.toJson(body);
  } else {
    return body;
  }
}

/**
 * Default "accept" function for Datasrc.
 *
 * @param {Error} Error, if any
 * @param {Object} HTTP response
 * @param {Function} Callback
 */
module.exports = function(err, res, next) {
  if (err) return next(err);
  if (res.response.statusCode === 200) {
    return next(null, toJSON(res.response, res.body));
  } else {
    return next(new Error('HTTP/%d - %s', res.response.statusCode, res.body));
  }
};
