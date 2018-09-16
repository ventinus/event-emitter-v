import babel from 'rollup-plugin-babel'
import {terser} from 'rollup-plugin-terser'

export default [
  {
    input: 'index.js',
    output: {
      file: 'dist/event-emitter-v.js',
      format: 'cjs'
    },
    plugins: [
      babel({
        exclude: 'node_modules/**' // only transpile our source code
      })
    ]
  }, {
    input: 'dist/event-emitter-v.js',
    output: {
      format: 'cjs',
      file: 'dist/event-emitter-v.min.js'
    },
    plugins: [terser()]
  }
];
