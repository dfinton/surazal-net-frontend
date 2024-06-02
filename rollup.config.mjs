import babel from '@rollup/plugin-babel';
import nodeResolve from '@rollup/plugin-node-resolve';
import { importMetaAssets } from '@web/rollup-plugin-import-meta-assets';
import minifier from 'babel-plugin-template-html-minifier';
import path from 'path';
import dotenv from 'rollup-plugin-dotenv';
import esbuild from 'rollup-plugin-esbuild';
import multiInputModule from 'rollup-plugin-multi-input';

const multiInput = multiInputModule.default;

export default {
  input: ['src/**/*.js'],
  output: {
    format: 'es',
    dir: 'page/assets/js',
  },
  preserveEntrySignatures: false,
  plugins: [
    multiInput({
      relative: 'src/',
    }),
    /** Resolve bare module imports */
    nodeResolve(),
    /** Minify JS, compile JS to a lower language target */
    esbuild({
      target: 'es2020',
    }),
    /** Bundle assets references via import.meta.url */
    importMetaAssets(),
    dotenv(),
    babel({
      babelHelpers: "bundled",
      plugins: [
        [
          minifier,
          {
            modules: { lit: ['html', { name: 'css', encapsulation: 'style' }] },
            failOnError: false,
            strictCSS: true,
            htmlMinifier: {
              collapseWhitespace: true,
              conservativeCollapse: true,
              removeComments: true,
              caseSensitive: true,
              minifyCSS: true,
            },
          },
        ],
        [
          "module-resolver",
          {
            alias: {
              "^@/(.+)": "./src/\\1",
            },
          },
        ],
      ],
    }),
  ]
};
