/*!
 * plissken
 * by Martin Kock
 * MIT Licensed
 */
'use strict';

/**
 * Plissken Test Suite
 */
describe('Plissken CmdRunner Test Suite', function() {
  
  /** 
   * Test Context
   */
  describe('Context', function() {

    var Context = require('./../src/cmdrunner/Context');

    it('cleans all variables with a single underscore', function() {
      var context = new Context();
      context._one = 'one';
      context._two = 'two';
      context.__three = 'three';
      context.four = 'four';
      context.cleanOne();
      expect(context._one).not.toBeDefined();
      expect(context._two).not.toBeDefined();
      expect(context.__three).toBeDefined();
      expect(context.four).toBeDefined();
    });

    it('cleans all variables with a double underscore', function() {
      var context = new Context();
      context._one = 'one';
      context._two = 'two';
      context.__three = 'three';
      context.four = 'four';
      context.cleanTwo();
      expect(context._one).toBeDefined();
      expect(context._two).toBeDefined();
      expect(context.__three).not.toBeDefined();
      expect(context.four).toBeDefined();
    });

    it('does not clean other variables', function() {
      var context = new Context();
      context._one_ = 'one';
      context.two__2 = 'two';
      context.th_r__ee = 'three';
      context.four = 'four';
      context.cleanOne();
      context.cleanTwo();
      expect(context._one).not.toBeDefined();
      expect(context.two__2).toBeDefined();
      expect(context.th_r__ee).toBeDefined();
      expect(context.four).toBeDefined();
    });

    it('removes empty elements from global list', function() {
      var context = new Context();
      context.elems = [
        1, 2, 3, 4, undefined, false, 5, 6, 7, null, 8, 9.0, '10'
      ];
      context.rmEmptyElems();
      expect(context.elems).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9.0, '10']);
    });

    it('removes empty elements from local list', function() {
      var context = new Context();
      context.__elems = [
        1, 2, 3, 4, undefined, false, 5, 6, 7, null, 8, 9.0, '10'
      ];
      context.rmEmptyElems();
      expect(context.__elems).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9.0, '10']);
    });

  });

  /**
   * Test CmdRunner
   */
  describe('CmdRunner', function() {

    var CmdRunner = require('./../src/cmdrunner/CmdRunner');

    it('retains Context', function() {
      var runner = new CmdRunner({});
      runner.newContext(function() {
        this.one = 'one';
      });
      expect(typeof runner.getContext()).toEqual('object');
      expect(runner.getContext().one).toBeDefined();
    });

    it('does not accept non-Cmds', function() {
      var runner = new CmdRunner({});
      var run = function() {
        runner.run(false);
      };
      expect(run).toThrowError();
    });

  });

});
