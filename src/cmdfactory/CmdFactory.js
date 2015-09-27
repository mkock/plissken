/*!
 * plissken
 * by Martin Kock
 * MIT Licensed
 */
'use strict';

var util = require('util'),
  GetCmd = require('./../getcmd/GetCmd'),
  LogCmd = require('./../logcmd/LogCmd'),
  FilterCmd = require('./../filtercmd/FilterCmd'),
  SelectCmd = require('./../selectcmd/SelectCmd'),
  ExtendCmd = require('./../extendcmd/ExtendCmd'),
  SaveCmd = require('./../savecmd/SaveCmd');

/**
 * Factory is a singleton pattern.
 */
module.exports = (function() {
  return {

    /**
     * @return {Object} GetCmd
     */
    newGetCmd: function(relUrl, acceptFn, opts) {
      if (!relUrl) {
        throw new Error('First argument must be a relative URL');
      }
      if (typeof acceptFn === 'function') {
        // Caller provided a custom "acceptFn"; "opts" is optional.
        return new GetCmd(relUrl, acceptFn, opts);
      } else if (typeof acceptFn === 'object' && !opts) {
        // Caller provided "opts" in place of "acceptFn".
        return new GetCmd(relUrl, null, opts);
      } else {
        // Caller only provided the required URL; the rest is optional.
        return new GetCmd(relUrl);
      }
    },

    /**
     * @return {Object} LogCmd
     */
    newLogCmd: function(logFn) {
      return new LogCmd(logFn);
    },

    /**
     * @return {Object} FilterCmd
     */
    newFilterCmd: function(filterFn) {
      if (typeof filterFn !== 'function') {
        throw new Error('First argument must be a function');
      }
      return new FilterCmd(filterFn);
    },

    /**
     * @return {Object} SelectCmd
     */
    newSelectCmd: function(selectFn) {
      if (typeof selectFn !== 'function') {
        throw new Error('First argument must be a function');
      }
      return new SelectCmd(selectFn);
    },

    /**
     * @param {Function} "urlFn" which must return an "opts" object for "request"
     * @param {Function} Optional "acceptFn" with three arguments;
     *   "err" will be an Error if the request failed,
     *   "res" will be the unprocessed HTTP response,
     *   "next" is a callback that takes two arguments; 1) an Error if something
     *   went wrong, and 2) a JSON object if the HTTP request and subsequent
     *   conversion from String to JSON went well, or a falsy value if this
     *   element should be skipped altogether
     * @param {Function} "extendFn" which takes care of extending the element,
     *   it takes three arguments; 1) the original element to be extended,
     *   2) the newly requested object that provides the data to extend with,
     *   and 3) the callback to call when finished
     * @param {Object} Additional options (optional)
     * @return {Object} ExtendCmd
     */
     newExtendCmd: function(urlFn, acceptFn, extendFn, opts) {
      var _acceptFn, _extendFn;
      if (typeof urlFn !== 'function') {
        throw new Error('First argument must be a function');
      }
      if (arguments.length === 2) {
        // Only the two required arguments are provided.
        if (typeof acceptFn !== 'function') {
          throw new Error('Second argument must be a function');
        }
        _acceptFn = null;
        _extendFn = acceptFn;
      } else if (arguments.length > 2) {
        // The two required arguments are provided, and optionally a
        // custom "acceptFn".
        if (acceptFn && typeof acceptFn !== 'function') {
          throw new Error('Second argument must be a function');
        }
        if (typeof extendFn !== 'function') {
          throw new Error('Third argument must be a function');
        }
        _acceptFn = acceptFn;
        _extendFn = extendFn;
      }
      return new ExtendCmd(urlFn, _acceptFn, _extendFn, opts);
    },

    /**
     * @return {Object} SaveCmd
     */
    newSaveCmd: function(saveFn) {
      if (typeof saveFn !== 'function') {
        throw new Error('First argument must be a function');
      }
      return new SaveCmd(saveFn);
    }

  };
})();
