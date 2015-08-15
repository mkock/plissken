/*!
 * plissken
 * by Martin Kock
 * MIT Licensed
 */
'use strict';

var plissken = require('./index');

var mock = plissken.createDataSrc({baseUrl: 'http://www.mockapi.net/api/'});

var getCmd = plissken.CmdFactory.createGetCmd('WspubgByuQgAP3NhF'),
  selectCmd = plissken.CmdFactory.createSelectCmd(function(elem) {
    this.elems.push(elem);
    console.log(this);
    return elem.value;
  }),
  logCmd = plissken.CmdFactory.createLogCmd(),
  filterCmd = plissken.CmdFactory.createFilterCmd(function(elem) {
      return elem % 2 === 0;
    }),
  runner = plissken.createCmdRunner(mock);
  runner.createContext(function() {
    this.elems = [];
  });
console.log(runner.run([getCmd, selectCmd, filterCmd, logCmd], function(err, sums) {
  console.log(err, sums);
}));
