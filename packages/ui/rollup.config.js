import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import dts from 'rollup-plugin-dts'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const pkg = JSON.parse(readFileSync(join(__dirname, 'package.json'), 'utf-8'))

const external = [
  'react',
  'react-dom',
  'react/jsx-runtime',
  '@mui/material',
  '@mui/icons-material',
  'shiki',
  'react-markdown',
  'remark-gfm',
]

const plugins = [
  resolve({
    preferBuiltins: false,
    browser: true,
  }),
  commonjs(),
  typescript({
    tsconfig: './tsconfig.json',
    declaration: false,
    declarationMap: false,
  }),
]

export default [
  // ESM build
  {
    input: 'src/index.ts',
    output: {
      file: pkg.exports['.'].import,
      format: 'esm',
      sourcemap: true,
    },
    external,
    plugins,
  },
  // CJS build
  {
    input: 'src/index.ts',
    output: {
      file: pkg.exports['.'].require,
      format: 'cjs',
      sourcemap: true,
      exports: 'named',
    },
    external,
    plugins,
  },
  // Primitives ESM
  {
    input: 'src/primitives/index.ts',
    output: {
      file: pkg.exports['./primitives'].import,
      format: 'esm',
      sourcemap: true,
    },
    external,
    plugins,
  },
  // Primitives CJS
  {
    input: 'src/primitives/index.ts',
    output: {
      file: pkg.exports['./primitives'].require,
      format: 'cjs',
      sourcemap: true,
      exports: 'named',
    },
    external,
    plugins,
  },
  // Blocks ESM
  {
    input: 'src/blocks/index.ts',
    output: {
      file: pkg.exports['./blocks'].import,
      format: 'esm',
      sourcemap: true,
    },
    external,
    plugins,
  },
  // Blocks CJS
  {
    input: 'src/blocks/index.ts',
    output: {
      file: pkg.exports['./blocks'].require,
      format: 'cjs',
      sourcemap: true,
      exports: 'named',
    },
    external,
    plugins,
  },
  // Domain ESM
  {
    input: 'src/domain/index.ts',
    output: {
      file: pkg.exports['./domain'].import,
      format: 'esm',
      sourcemap: true,
    },
    external,
    plugins,
  },
  // Domain CJS
  {
    input: 'src/domain/index.ts',
    output: {
      file: pkg.exports['./domain'].require,
      format: 'cjs',
      sourcemap: true,
      exports: 'named',
    },
    external,
    plugins,
  },
  // Type declarations
  {
    input: 'src/index.ts',
    output: {
      file: pkg.exports['.'].types,
      format: 'esm',
    },
    external,
    plugins: [
      dts({
        tsconfig: './tsconfig.json',
      }),
    ],
  },
  {
    input: 'src/primitives/index.ts',
    output: {
      file: pkg.exports['./primitives'].types,
      format: 'esm',
    },
    external,
    plugins: [
      dts({
        tsconfig: './tsconfig.json',
      }),
    ],
  },
  {
    input: 'src/blocks/index.ts',
    output: {
      file: pkg.exports['./blocks'].types,
      format: 'esm',
    },
    external,
    plugins: [
      dts({
        tsconfig: './tsconfig.json',
      }),
    ],
  },
  {
    input: 'src/domain/index.ts',
    output: {
      file: pkg.exports['./domain'].types,
      format: 'esm',
    },
    external,
    plugins: [
      dts({
        tsconfig: './tsconfig.json',
      }),
    ],
  },
]
