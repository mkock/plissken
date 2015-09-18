/*!
 * plissken
 * by Martin Kock
 * MIT Licensed
 */
'use strict';

/**
 * @Constructor
 */
function Context() {
  this.elems = [];
}

/**
 * Clean up temporary variables (starting with "_")
 */
Context.prototype.cleanOne = function cleanOne() {
  for (var key in this) {
    if (key.substring(0, 1) === '_' && key.substring(1, 2) !== '_') {
      delete this[key];
    }
  }
};

/**
 * Clean up temporary variables (starting with "__")
 */
Context.prototype.cleanTwo = function cleanTwo() {
  for (var key in this) {
    if (key.substring(0, 2) === '__' && key.substring(2, 3) !== '_') {
      delete this[key];
    }
  }
};

// Export the constructor.
module.exports = Context;
