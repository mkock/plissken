/*!
 * plissken
 * by Martin Kock
 * MIT Licensed
 */
'use strict';

var Datasrc = require('./src/datasrc/Datasrc'),
  Factory = require('./src/cmdfactory/CmdFactory'),
  CmdRunner = require('./src/cmdrunner/CmdRunner');

module.exports = {

  newDataSrc: function(opts) {
    return new Datasrc(opts);
  },

  newCmdRunner: function(datasrc) {
    return new CmdRunner(datasrc);
  },

  CmdFactory: Factory

};
