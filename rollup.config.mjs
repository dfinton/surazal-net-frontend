import babel from '@rollup/plugin-babel';
import nodeResolve from '@rollup/plugin-node-resolve';
import dotenv from 'rollup-plugin-dotenv';
import esbuild from 'rollup-plugin-esbuild';

export default {
  input: 'src/component/page/index.js',
  output: {
    format: 'es',
    file: 'page/assets/js/app.js',
  },
  plugins: [
    nodeResolve(),
    esbuild({
      target: 'es2020',
    }),
    dotenv(),
    babel({
      babelHelpers: "bundled",
      plugins: [
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
