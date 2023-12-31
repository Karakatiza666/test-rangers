var path = require('path');
var DEBUG = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: {
    index: ['./app/entry.ts']
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build')
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.html$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'index.html'
          }
        }
      },
      {
        test: /\.jpe?g$|\.svg$|\.png|\.webp|\.mp3$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]'
          }
        },
        type: 'javascript/auto'
      },
      // {
      //   test: /\.json\?path$/,
      //   use: {
      //     loader: 'file-loader',
      //     options: {
      //       name: '[path][name].[ext]',
      //     }
      //   },
      // },
      {
        test: /\.json\.data/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name]',
          }
        },
        type: 'javascript/auto'
      },
      {
        test: /\.(shader|vert|frag|geom)$/i,
        use: 'raw-loader'
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  devServer: {
    static: path.join(__dirname, 'build'),
    compress: true,
    port: 8080
  },
  mode: DEBUG ? 'development' : 'production',
  devtool: DEBUG ? 'source-map' : false,
  optimization: {
    minimize: true
  },
};
