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

  var Context = require('./../src/cmdrunner/Context');

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

    var LogCmd = require('./../src/logcmd/LogCmd');

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

    var SelectCmd = require('./../src/selectcmd/SelectCmd');

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

  describe('CustomCmd Tests', function() {

    var CustomCmd = require('./../src/customcmd/CustomCmd');

    it('accepts a customFn', function() {
      var customCmd = new CustomCmd(function() {});
      expect(customCmd.customFn).toBeDefined();
    });

    it('binds "this" to Context for customFn', function() {
      var thisRef,
        context = new Context(),
        customCmd = new CustomCmd(function(elem, next) {
          thisRef = this;
          return next(null, elem);
        });
        context.foo = 'bar';
        context.__elems = ['something'];
      customCmd.setContext(context);
      customCmd.exec(function() {
        expect(typeof thisRef).toEqual('object');
        expect(thisRef.foo).toBeDefined();
        expect(thisRef.foo).toEqual('bar');
      });
    });

    it('omits elements that the custom function never returns', function() {
      var context = new Context(),
        customCmd = new CustomCmd(function(elem, next) {
          return next();
        });
        context.foo = 'bar';
        context.__elems = ['something'];
      customCmd.setContext(context);
      customCmd.exec(function() {
        expect(context.__elems).not.toContain('something');
      });      
    });

  });

  describe('SaveCmd Tests', function() {

    var SaveCmd = require('./../src/savecmd/SaveCmd');

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
