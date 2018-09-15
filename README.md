# Event Emitter
## Register handlers by name for custom triggering

### Installation

  $ npm install event-emitter

### Usage

```javascript
cosnt eventEmitter = require('event-emitter')
const ee = eventEmitter()
const listener = (args) => { ... }

ee.on('change', listener)

ee.once('change', (args) => {
  // … react to first 'change' event (invoked only once!)
})

ee.on('rogue', listener)

ee.emit('change', arg1, arg2 /*…args*/) // Two above listeners invoked
ee.emit('change', arg1, arg2 /*…args*/) // Only first listener invoked

ee.off('change', listener)              // Removed first listener
ee.emit('change', arg1, arg2 /*…args*/) // No listeners invoked
ee.offAll()
ee.emit('rogue') // Not invoked
```

### Tests

  $ npm test
