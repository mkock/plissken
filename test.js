/*!
 * plissken
 * by Martin Kock
 * MIT Licensed
 */
'use strict';

var plissken = require('./index');

var mock = plissken.newDataSrc({baseUrl: 'http://www.mockapi.net/api/'});

var getCmd = plissken.CmdFactory.newGetCmd('WspubgByuQgAP3NhF'),
  selectCmd = plissken.CmdFactory.newSelectCmd(function(elems, next) {
    var vals = [];
    elems.forEach(function(elem) {
      vals.push(elem.value);
    });
    return next(null, vals);
  }),
  logCmd = plissken.CmdFactory.newLogCmd(),
  filterCmd = plissken.CmdFactory.newFilterCmd(function(elem, next) {
    return next(elem % 2 === 0);
  }),
  runner = plissken.newCmdRunner(mock);
  runner.newContext(function() {
    this.elems = [];
  });
  runner.paginate(function() {
    var page = 0;
    return {
      page: ++page,
      pagesize: 10
    };
  }, function(payload) {
    // return payload.response.statusCode === 200;
    return payload.response.statusCode !== 200;
  });
runner.run([getCmd, logCmd, selectCmd, logCmd, filterCmd, logCmd], function(err, data) {
  console.log(err, data);
});
