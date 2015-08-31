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
  SaveCmd = require('./../savecmd/SaveCmd');

/**
 * Factory is a singleton pattern.
 */
module.exports = (function() {
  return {

    /**
     * @return {Object} GetCmd
     */
    newGetCmd: function(relUrl, opts) {
      return new GetCmd(relUrl, opts);
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
      return new FilterCmd(filterFn);
    },

    /**
     * @return {Object} SelectCmd
     */
    newSelectCmd: function(selectFn) {
      return new SelectCmd(selectFn);
    },

    /**
     * @return {Object} SaveCmd
     */
    newSaveCmd: function(saveFn) {
      return new SaveCmd(saveFn);
    }

  };
})();
