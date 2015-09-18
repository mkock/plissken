/*!
 * plissken
 * by Martin Kock
 * MIT Licensed
 */
'use strict';

/**
 * Plissken Test Suite
 */
describe('Plissken Cmd Test Suite', function() {

  /**
   * Test Cmd
   */
  describe('Cmd Tests', function() {

    var Cmd = require('./../src/cmd/Cmd');

    it('remembers its name', function() {
      var cmd = new Cmd('MyCmd');
      expect(cmd.getName()).toEqual('MyCmd');
    });

    it('remembers its context', function() {
      var cmd = new Cmd('MyCmd'),
        context = {foo: 'bar'};
      cmd.setContext(context);
      expect(cmd.getContext()).toEqual(context);
    })

  });
  
  /**
   * Test LogCmd
   */
  describe('LogCmd Tests', function() {

    var plissken = require('./../index');

    it('accepts a logFn', function() {
      var logCmd = plissken.CmdFactory.newLogCmd(function() {});
      expect(logCmd.logFn).not.toBeUndefined();
    });

  });

});
