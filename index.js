/**
 * Event Emitter
 *
 * Register named events to trigger under conditions
 */

const eventEmitter = () => {
  // events are categorized by desired execution
  // times so as to avoid name conflicts
  const events = {
    /**
     * houses all events to be triggered any amount of times
     * @type {Object}
     */
    multi: {},
    /**
     * houses all events to be triggered only once
     * @type {Object}
     */
    once: {},
  }

  /**
   * Adds a function to the array found by the key name under the multi prop
   *
   * @param  {String}   name     The name of the event
   * @param  {Function} callback Function to be executed
   */
  const on = (name, callback) => _addEvent('multi', name, callback)

  /**
   * Adds a function to the array found by the key name under the once prop
   *
   * @param  {String}   name     The name of the event
   * @param  {Function} callback Function to be executed
   */
  const once = (name, callback) => _addEvent('once', name, callback)

  /**
   * Removes the handlers found by the key name under both multi and once props
   *
   * @param  {String}   name     Name of event to be removed
   */
  const off = name => {
    events.multi[name] = undefined
    events.once[name] = undefined
  }

  /**
   * Removes all handlers
   */
  const offAll = () => {
    events.multi = {}
    events.once = {}
  }

  /**
   * Triggers the handlers found by the key name under both multi and once props,
   * forwarding along any other arguments to the handlers
   *
   * @param  {String}   name     Name of event to be triggered
   */
  const emit = (name, ...rest) => {
    _triggerEvent('multi', name, ...rest)
    _triggerEvent('once', name, ...rest)
    events.once[name] = undefined
  }

  /**
   * Adds a handler by name to the existing or new array of handlers
   *
   * @private
   * @param  {Object}   src      Either events.multi or events.once
   * @param  {String}   name     Name of event to be added
   * @param  {Function} callback Handler to attach to event name
   */
  const _addEvent = (src, name, callback) => {
    if (typeof callback !== 'function') {
      throw new Error('callback must be a function')
    }
    events[src][name] = events[src][name] ? events[src][name].concat(callback) : [callback]
  }

  /**
   * Triggers the handlers in the array found by the event name
   *
   * @private
   * @param  {Object}   src      Either events.multi or events.once
   * @param  {String}   name     Name of event to trigger
   * @param  {Any}      rest     Any arguments to forward to the handler
   */
  const _triggerEvent = (src, name, ...rest) => {
    if (events[src][name]) {
      events[src][name].forEach(e => e(...rest))
    }
  }

  // expose all public functions
  return {
    on,
    once,
    off,
    offAll,
    emit,
  }
}


module.exports = eventEmitter
