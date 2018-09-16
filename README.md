# Event Emitter
## Register handlers by name for custom triggering

### Installation
```
  $ git clone https://github.com/ventinus/event-emitter-v.git && cd event-emitter-v
```

### Usage

```javascript
const eventEmitter = require('./index') // or require('event-emitter-v') if installed from npm (not actually published)
const ee = eventEmitter()
const listener = (args) => { ... }

ee.on('change', listener)

ee.once('change', (args) => {
  // … react to first 'change' event (invoked only once!)
})

ee.on('rogue', listener)

ee.emit('change', arg1, arg2 /*…args*/) // Two 'change' handlers invoked
ee.emit('change', arg1, arg2 /*…args*/) // Only first 'change' listener invoked

ee.off('change')    // Removed all 'change' handlers
ee.emit('change')   // No 'change' handlers invoked
ee.offAll()         // Remove all handlers
ee.emit('rogue')    // Not invoked
```

### Tests and Linting
```
  $ yarn install
  $ yarn test
  $ yarn lint
```
Test in watch mode
```
  $ yarn dev
```

### Build
```
  $ yarn build
```
