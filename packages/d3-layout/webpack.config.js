module.exports = env => {

  return {
    entry: __dirname + '/src/index.ts',
    mode: env.production ? 'production' : 'development',
    output: {
      path: __dirname + '/dist',
      filename: env.production ? 'd3-layout.min.js' : 'd3-layout.js',
      library: 'd3Layout',
      libraryTarget: 'umd',
      umdNamedDefine: true,
      globalObject: "typeof self !== 'undefined' ? self : this"
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
