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

  createDataSrc: function(opts) {
    return new Datasrc(opts);
  },

  createCmdRunner: function(datasrc) {
    return new CmdRunner(datasrc);
  },

  CmdFactory: Factory

};
