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
   * @return {Boolean}           Represents successful execution
   */
  const on = (name, callback) => _addEvent('multi', name, callback)

  /**
   * Adds a function to the array found by the key name under the once prop
   *
   * @param  {String}   name     The name of the event
   * @param  {Function} callback Function to be executed
   * @return {Boolean}           Represents successful execution
   */
  const once = (name, callback) => _addEvent('once', name, callback)

  /**
   * Removes the handlers found by the key name under both multi and once props
   *
   * @param  {String}   name     Name of event to be removed
   * @return {Boolean}           Represents successful execution
   */
  const off = name => {
    events.multi[name] = undefined
    events.once[name] = undefined
    return true
  }

  /**
   * Removes all handlers
   *
   * @return {Boolean}   Represents successful execution
   */
  const offAll = () => {
    events.multi = {}
    events.once = {}
    return true
  }

  /**
   * Triggers the handlers found by the key name under both multi and once props,
   * forwarding along any other arguments to the handlers
   *
   * @param  {String}   name     Name of event to be triggered
   * @return {Boolean}           Represents successful execution
   */
  const emit = (name, ...rest) => {
    _triggerEvent('multi', name, ...rest)
    _triggerEvent('once', name, ...rest)
    events.once[name] = undefined
    return true
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
    if (typeof callback === 'function') {
      events[src][name] = events[src][name] ? events[src][name].concat(callback) : [callback]
    } else {
      console.error('callback must be a function')
      return false
    }
    return true
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
