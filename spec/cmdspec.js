/*!
 * plissken
 * by Martin Kock
 * MIT Licensed
 */
'use strict';

var plissken = require('./../index');

/**
 * Plissken Test Suite
 */
describe('Plissken Cmd Test Suite', function() {

  /**
   * Test Cmd
   */
  describe('Cmd Tests', function() {
    // Test Cmd class name.
    var Cmd = require('./../src/cmd/Cmd');
    it('remembers its name', function() {
      var cmd = new Cmd('MyCmd');
      expect(cmd.getName()).toEqual('MyCmd');
    });
    // Test that Cmd class context.
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
    // Test LogCmd custom log fn.
    it('accepts a logFn', function() {
      var logCmd = plissken.CmdFactory.newLogCmd(function() {});
      expect(logCmd.logFn).not.toBeUndefined();
    });
  });

});
