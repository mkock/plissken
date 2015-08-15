/*!
 * plissken
 * by Martin Kock
 * MIT Licensed
 */
'use strict';

/*
 * Default pagination functions for CmdRunner. 
 */
module.exports = (function() {
  var empty = {};
  return {
    pageFn: function() {
      return empty;
    },
    stopFn: function(payload) {
      return false;
    }
  };
})();
