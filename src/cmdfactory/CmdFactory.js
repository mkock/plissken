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
  SelectCmd = require('./../selectcmd/SelectCmd');

/**
 * Factory is a singleton pattern.
 */
module.exports = (function() {
  return {

    /**
     * @return {Object} GetCmd
     */
    createGetCmd: function(relUrl, opts) {
      return new GetCmd(relUrl, opts);
    },

    /**
     * @return {Object} LogCmd
     */
    createLogCmd: function() {
      return new LogCmd();
    },

    /**
     * @return {Object} FilterCmd
     */
    createFilterCmd: function(filterFunc) {
      return new FilterCmd(filterFunc);
    },

    /**
     * @return {Object} SelectCmd
     */
    createSelectCmd: function(selectFunc) {
      return new SelectCmd(selectFunc);
    },

  };
})();
