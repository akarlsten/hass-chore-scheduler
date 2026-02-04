const path = require('path')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

module.exports = (env, argv) => {
  const isProd = argv.mode === 'production'

  const babelOptions = {
    presets: [
      ['@babel/preset-env', {
        targets: 'chrome >= 55',
        modules: false,
      }]
    ],
  }

  return {
    entry: './src/index.tsx',
    mode: isProd ? 'production' : 'development',
    devtool: isProd ? false : 'source-map',
    devServer: {
      static: './dev',
      allowedHosts: 'all',
      hot: true,
      port: 8080,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
      },
    },
    module: {
      rules: [
        {
          // TypeScript files: ts-loader → babel-loader (chained, right to left)
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: [
            { loader: 'babel-loader', options: babelOptions },
            { loader: 'ts-loader', options: { transpileOnly: true } },
          ],
        },
        {
          // JS files from node_modules: babel-loader only
          test: /\.m?js$/,
          include: /node_modules/,
          use: [
            { loader: 'babel-loader', options: babelOptions },
          ],
        },
      ],
    },
    resolve: {
      plugins: [new TsconfigPathsPlugin({})],
      extensions: ['.tsx', '.ts', '.js'],
      alias: {
        react: 'preact/compat',
        'react-dom/test-utils': 'preact/test-utils',
        'react-dom': 'preact/compat',
        'react/jsx-runtime': 'preact/jsx-runtime',
        '@components': path.resolve(__dirname, 'src/card/components'),
        '@hooks': path.resolve(__dirname, 'src/hooks'),
        '@store': path.resolve(__dirname, 'src/store'),
        '@types': path.resolve(__dirname, 'src/types'),
        '@utils': path.resolve(__dirname, 'src/utils'),
      },
    },
    output: {
      filename: 'chore-scheduler-card.js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
    },
  }
}
