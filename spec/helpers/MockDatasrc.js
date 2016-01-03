/*!
 * plissken
 * by Martin Kock
 * MIT Licensed
 */
'use strict';

/**
 * @constructor
 */
function MockDatasrc() {
  return;
}

/**
 * Mock "get" function that waits a second before returning to emulate HTTP.
 */
MockDatasrc.prototype.get = function(opts, next) {
  setTimeout(function() {
    return next(null, {request: opts, response: null, body: {foo: 'bar'}});
  }, 1000);
};

// Export the constructor.
module.exports = MockDatasrc;
