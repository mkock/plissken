/*!
 * plissken
 * by Martin Kock
 * MIT Licensed
 */
'use strict';

/**
 * Logs the entire element.
 * @param {Object} Element
 */
module.exports = function(elem, next) {
  console.log(elem);
  return next();
};
