const eventEmitter = require('./index')

let ee
let fn
beforeEach(() => {
  ee = eventEmitter()
  fn = jest.fn()
})

test('it removes a listener', () => {
  ee.on('change', fn)
  ee.emit('change')
  expect(fn.mock.calls.length).toBe(1)
  ee.off('change')
})

test('it removes all listeners', () => {
  const initFn = jest.fn()
  ee.on('change', fn)
  ee.once('change', fn)
  ee.on('init', initFn)

  ee.emit('change')
  ee.emit('init')
  expect(fn.mock.calls.length).toBe(2)
  expect(initFn.mock.calls.length).toBe(1)

  ee.offAll()

  ee.emit('change')
  ee.emit('init')
  expect(fn.mock.calls.length).toBe(2)
  expect(initFn.mock.calls.length).toBe(1)
})

test('it executes a listener any amount of times', () => {
  ee.on('change', fn)
  ee.emit('change')
  ee.emit('change')
  ee.emit('change')
  expect(fn.mock.calls.length).toBe(3)
})

test('it executes a listener with arguments', () => {
  ee.on('change', fn)
  ee.emit('change', 'first', 'second')
  expect(fn.mock.calls[0]).toEqual(['first', 'second'])
})

test('it executes a listener only one time', () => {
  ee.once('changeOnce', fn)
  ee.emit('changeOnce')
  ee.emit('changeOnce')
  expect(fn.mock.calls.length).toBe(1)
})
