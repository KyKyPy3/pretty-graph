module.exports = env => {

  return {
    entry: __dirname + '/src/index.ts',
    mode: env.production ? 'production' : 'development',
    output: {
      path: __dirname + '/dist',
      filename: env.production ? 'core.min.js' : 'core.js',
      library: 'prettyGraphCore',
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
