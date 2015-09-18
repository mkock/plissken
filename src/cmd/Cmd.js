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

/**
 * Filters given elems by removing empty values (null, undefined, etc)
 * @param {Array} List of elements
 * @param {Function} Callback
 */
Cmd.prototype.clean = function clean(elems, next) {
  if (Array.isArray(elems) && elems.length) {
    elems = elems.filter(Boolean);
  }
  return next(null, elems);
};

// Export the constructor.
module.exports = Cmd;
