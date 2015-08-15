/*!
 * plissken
 * by Martin Kock
 * MIT Licensed
 */
'use strict';

var util = require('util'),
  extend = require('extend'),
  EventEmitter = require('events').EventEmitter;

/**
 * @constructor
 */
function Cmd(name) {
  if (typeof name !== 'string') {
    throw new Error('Cmd name must be a string');
  }
  this.name = name;
  this.context = {
    cmdName: name
  };
};

// Let's use event emitters.
util.inherits(Cmd, EventEmitter);

/**
 * @return {String} Cmd name
 */
Cmd.prototype.getName = function getName() {
  return this.name;
};

/**
 * Sets the Cmd context.
 * @param {Object} Cmd context (injected by CmdRunner)
 */
Cmd.prototype.setContext = function setContex(context) {
  this.context = context;
  this.context.cmdName = this.name;
};

/**
 * Filters given elems by removing empty values (null, undefined, etc).
 * @param {Array} List of elements
 * @param {Function} Callback
 */
Cmd.prototype.clean = function clean(content, next) {
  if (Array.isArray(content) && content.length) {
    content = content.filter(Boolean);
  }
  return next(null, content);
};

// Export the constructor.
module.exports = Cmd;
