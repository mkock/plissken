/*!
 * plissken
 * by Martin Kock
 * MIT Licensed
 */
'use strict';

var debug = require('debug')('plissken:Context');

/**
 * @Constructor
 */
function Context() {
  this.elems = [];
}

/**
 * Cleans up temporary variables (starting with "_")
 */
Context.prototype.cleanOne = function() {
  debug('Cleaning variables with single underscore');
  for (var key in this) {
    if (key.substring(0, 1) === '_' && key.substring(1, 2) !== '_') {
      delete this[key];
    }
  }
};

/**
 * Cleans up temporary variables (starting with "__")
 */
Context.prototype.cleanTwo = function() {
  debug('Cleaning variables with double underscore');
  for (var key in this) {
    if (key.substring(0, 2) === '__' && key.substring(2, 3) !== '_') {
      delete this[key];
    }
  }
};

/**
 * Removes all elems that are empty (null, undefined or false)
 */
Context.prototype.rmEmptyElems = function() {
  debug('Cleaning empty elements');
  this.elems = this.elems.filter(Boolean);
  if (this.__elems && Array.isArray(this.__elems) && this.__elems.length) {
    this.__elems = this.__elems.filter(Boolean);
  }
};

// Export the constructor.
module.exports = Context;
