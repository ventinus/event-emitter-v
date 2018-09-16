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
     * @return {Boolean}           Represents successful execution
     */
  };var on = function on(name, callback) {
    if (typeof callback === 'function') {
      _addEvent('multi', name, callback);
    } else {
      console.error('callback must be a function');
      return false;
    }
    return true;
  };

  /**
   * Adds a function to the array found by the key name under the once prop
   *
   * @param  {String}   name     The name of the event
   * @param  {Function} callback Function to be executed
   * @return {Boolean}           Represents successful execution
   */
  var once = function once(name, callback) {
    if (typeof callback === 'function') {
      _addEvent('once', name, callback);
    } else {
      console.error('callback must be a function');
      return false;
    }
    return true;
  };

  /**
   * Removes the handlers found by the key name under both multi and once props
   *
   * @param  {String}   name     Name of event to be removed
   * @return {Boolean}           Represents successful execution
   */
  var off = function off(name) {
    events.multi[name] = undefined;
    events.once[name] = undefined;
    return true;
  };

  /**
   * Removes all handlers
   *
   * @return {Boolean}   Represents successful execution
   */
  var offAll = function offAll() {
    events.multi = {};
    events.once = {};
    return true;
  };

  /**
   * Triggers the handlers found by the key name under both multi and once props,
   * forwarding along any other arguments to the handlers
   *
   * @param  {String}   name     Name of event to be triggered
   * @return {Boolean}           Represents successful execution
   */
  var emit = function emit(name) {
    for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      rest[_key - 1] = arguments[_key];
    }

    _triggerEvent.apply(undefined, ['multi', name].concat(rest));
    _triggerEvent.apply(undefined, ['once', name].concat(rest));
    events.once[name] = undefined;
    return true;
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
