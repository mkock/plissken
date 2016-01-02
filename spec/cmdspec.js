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

    var Cmd = require('./../src/cmd/Cmd'),
      Context = require('./../src/cmdrunner/Context');

    it('remembers its name', function() {
      var cmd = new Cmd('MyCmd');
      expect(cmd.getName()).toEqual('MyCmd');
    });

    it('remembers its context', function() {
      var cmd = new Cmd('MyCmd'),
        context = new Context();
      context.foo = 'bar';
      cmd.setContext(context);
      expect(cmd.getContext()).toEqual(context);
    })

  });
  
  /**
   * Test LogCmd
   */
  describe('LogCmd Tests', function() {

    var LogCmd = require('./../src/logcmd/LogCmd'),
      Context = require('./../src/cmdrunner/Context');

    it('accepts a logFn', function() {
      var logCmd = new LogCmd(function() {});
      expect(logCmd.logFn).toBeDefined();
    });

    it('binds "this" to Context for logFn', function() {
      var thisRef,
        context = new Context(),
        logCmd = new LogCmd(function(elem, next) {
          thisRef = this;
          return next();
        });
        context.foo = 'bar';
        context.__elems = ['something'];
      logCmd.setContext(context);
      logCmd.exec(function() {
        expect(typeof thisRef).toEqual('object');
        expect(thisRef.foo).toBeDefined();
        expect(thisRef.foo).toEqual('bar');
      });
    });

  });

  describe('SelectCmd Tests', function() {
    var SelectCmd = require('./../src/selectcmd/SelectCmd'),
      Context = require('./../src/cmdrunner/Context');

    it('accepts a selFn', function() {
      var selectCmd = new SelectCmd(function() {});
      expect(selectCmd.selFn).toBeDefined();
    });

    it('binds "this" to Context for selFn', function() {
      var thisRef,
        context = new Context(),
        selectCmd = new SelectCmd(function(elem, next) {
          thisRef = this;
          return next();
        });
        context.foo = 'bar';
        context.__elems = ['something'];
      selectCmd.setContext(context);
      selectCmd.exec(function() {
        expect(typeof thisRef).toEqual('object');
        expect(thisRef.foo).toBeDefined();
        expect(thisRef.foo).toEqual('bar');
      });
    });

  });

  describe('SaveCmd Tests', function() {
    var SaveCmd = require('./../src/savecmd/SaveCmd'),
      Context = require('./../src/cmdrunner/Context');

    it('accepts a saveFn', function() {
      var saveCmd = new SaveCmd(function() {});
      expect(saveCmd.saveFn).toBeDefined();
    });

    it('binds "this" to Context for saveFn', function() {
      var thisRef,
        context = new Context(),
        saveCmd = new SaveCmd(function(elem, next) {
          thisRef = this;
          return next();
        });
        context.foo = 'bar';
        context.__elems = ['something'];
      saveCmd.setContext(context);
      saveCmd.exec(function() {
        expect(typeof thisRef).toEqual('object');
        expect(thisRef.foo).toBeDefined();
        expect(thisRef.foo).toEqual('bar');
      });
    });

  });

});
