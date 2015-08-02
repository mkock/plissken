/*!
 * plissken
 * by Martin Kock
 * MIT Licensed
 */
'use strict';

var Factory = require('./src/cmdfactory/CmdFactory'),
  CmdRunner = require('./src/cmdrunner/CmdRunner');

var getCmd = Factory.createGetCmd('/path/to/stuff'),
  selectCmd = Factory.createSelectCmd(function(elem) {
    return elem.value;
  }),
  logCmd = Factory.createLogCmd(),
  filterCmd = Factory.createFilterCmd(function(elem) {
      return elem % 2 === 0;
    }),
  runner = new CmdRunner();

console.log(runner.run([getCmd, selectCmd, filterCmd, logCmd], function(err, sums) {
  console.log(err, sums);
}));
