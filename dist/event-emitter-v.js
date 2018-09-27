'use strict';

/**
 * Event Emitter
 *
 * Register named events to trigger under conditions
 */

var eventEmitter = function eventEmitter() {
  // events are categorized by desired execution
  // times so as to avoid name conflicts
  var events = {
    /**
     * houses all events to be triggered any amount of times
     * @type {Object}
     */
    multi: {},
    /**
     * houses all events to be triggered only once
     * @type {Object}
     */
    once: {}

    /**
     * Adds a function to the array found by the key name under the multi prop
     *
     * @param  {String}   name     The name of the event
     * @param  {Function} callback Function to be executed
     */
  };var on = function on(name, callback) {
    return _addEvent('multi', name, callback);
  };

  /**
   * Adds a function to the array found by the key name under the once prop
   *
   * @param  {String}   name     The name of the event
   * @param  {Function} callback Function to be executed
   */
  var once = function once(name, callback) {
    return _addEvent('once', name, callback);
  };

  /**
   * Removes the handlers found by the key name under both multi and once props
   *
   * @param  {String}   name     Name of event to be removed
   */
  var off = function off(name) {
    events.multi[name] = undefined;
    events.once[name] = undefined;
  };

  /**
   * Removes all handlers
   */
  var offAll = function offAll() {
    events.multi = {};
    events.once = {};
  };

  /**
   * Triggers the handlers found by the key name under both multi and once props,
   * forwarding along any other arguments to the handlers
   *
   * @param  {String}   name     Name of event to be triggered
   */
  var emit = function emit(name) {
    for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      rest[_key - 1] = arguments[_key];
    }

    _triggerEvent.apply(undefined, ['multi', name].concat(rest));
    _triggerEvent.apply(undefined, ['once', name].concat(rest));
    events.once[name] = undefined;
  };

  /**
   * Adds a handler by name to the existing or new array of handlers
   *
   * @private
   * @param  {Object}   src      Either events.multi or events.once
   * @param  {String}   name     Name of event to be added
   * @param  {Function} callback Handler to attach to event name
   */
  var _addEvent = function _addEvent(src, name, callback) {
    if (typeof callback !== 'function') {
      throw new Error('callback must be a function');
    }
    events[src][name] = events[src][name] ? events[src][name].concat(callback) : [callback];
  };

  /**
   * Triggers the handlers in the array found by the event name
   *
   * @private
   * @param  {Object}   src      Either events.multi or events.once
   * @param  {String}   name     Name of event to trigger
   * @param  {Any}      rest     Any arguments to forward to the handler
   */
  var _triggerEvent = function _triggerEvent(src, name) {
    for (var _len2 = arguments.length, rest = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
      rest[_key2 - 2] = arguments[_key2];
    }

    if (events[src][name]) {
      events[src][name].forEach(function (e) {
        return e.apply(undefined, rest);
      });
    }
  };

  // expose all public functions
  return {
    on: on,
    once: once,
    off: off,
    offAll: offAll,
    emit: emit
  };
};

module.exports = eventEmitter;
