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

  newDataSrc: function(opts, retryOpts) {
    return new Datasrc(opts, retryOpts);
  },

  newCmdRunner: function(datasrc, name) {
    return new CmdRunner(datasrc, name);
  },

  CmdFactory: Factory

};
