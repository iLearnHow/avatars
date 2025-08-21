const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/workers/synthesis-worker.js',
  target: 'webworker',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'synthesis-worker.js',
    clean: true
  },
  resolve: {
    extensions: ['.js', '.json']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              '@babel/plugin-proposal-class-properties',
              '@babel/plugin-proposal-private-methods',
              '@babel/plugin-proposal-private-property-in-object'
            ]
          }
        }
      }
    ]
  },
  optimization: {
    minimize: true,
    splitChunks: false
  },
  externals: {
    // Cloudflare Workers runtime provides these
    'node:fs': 'commonjs node:fs',
    'node:path': 'commonjs node:path',
    'node:url': 'commonjs node:url'
  }
}; 