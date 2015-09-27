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
  this.context = null;
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
 * Sets the Cmd context
 * @param {Object} Cmd context (injected by CmdRunner)
 */
Cmd.prototype.setContext = function setContex(context) {
  this.context = context;
  this.context._cmdName = this.name;
};

/**
 * Returns the Cmd context
 * @return {Object} Context
 */
Cmd.prototype.getContext = function getContext() {
  return this.context;
};

// Export the constructor.
module.exports = Cmd;
