module.exports = env => {

  return {
    entry: __dirname + '/src/index.ts',
    mode: env.production ? 'production' : 'development',
    output: {
      path: __dirname + '/dist',
      filename: env.production ? 'controls.min.js' : 'controls.js',
      library: 'prettyGraphControls',
      libraryTarget: 'umd',
      umdNamedDefine: true,
      globalObject: "typeof self !== 'undefined' ? self : this"
    },
    externals: {
      "three": "THREE"
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
