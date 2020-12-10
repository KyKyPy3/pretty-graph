module.exports = (_env, argv) => {



  return {
    entry: __dirname + '/src/index.ts',
    output: {
      path: __dirname + '/dist',
      filename: argv.mode == 'production' ? 'controls.min.js' : 'controls.js',
      library: 'prettyGraphControls',
      libraryTarget: 'umd',
      umdNamedDefine: true,
      globalObject: "typeof self !== 'undefined' ? self : this"
    },
    externals: {
      "three": "three"
    },
    resolve: {
      modules: [
        'node_modules',
      ],
      extensions: [".ts", ".js"]
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          loader: "ts-loader"
        }
      ]
    }
  }
}
