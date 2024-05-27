import babel from '@rollup/plugin-babel';
import nodeResolve from '@rollup/plugin-node-resolve';
import { rollupPluginHTML as html } from '@web/rollup-plugin-html';
import { importMetaAssets } from '@web/rollup-plugin-import-meta-assets';
import minifier from 'babel-plugin-template-html-minifier';
import path from 'path';
import dotenv from 'rollup-plugin-dotenv';
import esbuild from 'rollup-plugin-esbuild';

export default {
  input: '**/*.html',
  output: {
    entryFileNames: '[hash].js',
    chunkFileNames: '[hash].js',
    assetFileNames: '[hash][extname]',
    format: 'es',
    dir: 'dist',
  },
  preserveEntrySignatures: false,
  plugins: [
    /** Enable using HTML as rollup entrypoint */
    html({
      minify: true,
      injectServiceWorker: false,
      rootDir: path.join(process.cwd(), 'page'),
      flattenOutput: false,
    }),
    /** Resolve bare module imports */
    nodeResolve(),
    /** Minify JS, compile JS to a lower language target */
    esbuild({
      minify: true,
      target: ['chrome64', 'firefox67', 'safari11.1'],
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
