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
function toJSON(res, body, next) {
  if (/^application\/json/.test(res.headers['content-type'])) {
    return next(null, JSON.parse(body));
  } else if (/^application\/xml/.test(res.headers['content-type'])) {
    return next(null, xml2json.toJson(body));
  } else {
    return next(null, body);
  }
}

/**
 * Default "accept" function for Datasrc.
 *
 * @param {Error} Error, if any
 * @param {Object} HTTP response
 * @param {Function} Callback; receives False on EOF
 */
module.exports = function(err, res, next) {
  if (err) return next(err);
  if (res.response.statusCode === 200) {
    return toJSON(res.response, res.content, function(err, content) {
      if (err) return next(err);
      return next(null, content);
    });
  } else {
    return next(null, false);
  }
};
