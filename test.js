/*!
 * plissken
 * by Martin Kock
 * MIT Licensed
 */
'use strict';

var plissken = require('./index');

(function testNumbers() {
  var mock = plissken.newDataSrc({baseUrl: 'http://localhost:3000/'});
  var getCmd = plissken.CmdFactory.newGetCmd('numbers'),
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
    runner = plissken.newCmdRunner(mock, 'NumberImporter');
    runner.newContext(function() {
    });
  runner.run([getCmd, logCmd, selectCmd, logCmd, filterCmd, logCmd], function(err, data) {
    console.log(err, data);
  });
})();

(function testMovies() {
  // TODO: Current code requires us to have a SelectCmd due to Context.__content.
  var mock = plissken.newDataSrc({baseUrl: 'http://localhost:3000/'});
  var getCmd = plissken.CmdFactory.newGetCmd('movies'),
    selectCmd = plissken.CmdFactory.newSelectCmd(function(data, next) {
      return next(null, data.movies);
    }),
    logCmd = plissken.CmdFactory.newLogCmd(function(movie, next) {
      console.log("%d -> %s (%s)", movie.id, movie.title, movie.year);
      return next();
    }),
    filterCmd = plissken.CmdFactory.newFilterCmd(function(movie, next) {
      return next(movie.year <= 2000);
    }),
    extendCmd = plissken.CmdFactory.newExtendCmd(function(movie, req, next) {
      req.url = 'movies/' + movie.id;
      return next(null, req);
    }, function(movie, xMovie, response, next) {
      console.log('Extending movie ' + movie.id + '...');
      movie.genres = xMovie.genres;
      movie.runtime = xMovie.runtime;
      if (movie.id === 15) return next(null, null); // Test removing a movie.
      return next(null, movie);
    }),
    saveCmd = plissken.CmdFactory.newSaveCmd(function(movie, next) {
      console.log('Saving movie ' + movie.title + '...');
      return next();
    }),
    runner = plissken.newCmdRunner(mock, 'MovieImporter');
    runner.newContext(function() {
      this.doneMsg = 'Done!';
    });
    var page = 0;
    runner.paginate(function(opts) {
      opts.url = opts.url + '/page/' + (++page);
      return opts;
    });
  runner.run([
    getCmd,
    selectCmd,
    logCmd,
    filterCmd,
    logCmd,
    extendCmd,
    logCmd,
    saveCmd
  ], function(err, data) {
    console.log(err, data, runner.getContext());
  });
})();
