/*!
 * plissken
 * by Martin Kock
 * MIT Licensed
 */
'use strict';

var util = require('util'),
  EventEmitter = require('events').EventEmitter;

/**
 * @constructor
 */
function Cmd(name) {
  this.name = name;
};

// Let's use event emitters.
util.inherits(Cmd, EventEmitter);

/**
 * @return {String} Cmd name
 */
Cmd.prototype.getName = function getName() {
  return this.name;
};

// Export the constructor.
module.exports = Cmd;
