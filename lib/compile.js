const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = ({ source, output, injectSource = true, skipConcat = false }, callback) => {
  const workingDirectory = path.dirname(source.path || process.cwd());
  const outFile = path.resolve(output, 'build.js');

  let config = {
    entry: {
      build: path.resolve(__dirname, '..', 'index.js')
    },
    output: {
      path: output,
      filename: "[name].js"
    },
    context: __dirname,
    module: {
      loaders: [{
          test: /\.css$/,
          loaders: ['style-loader', 'css-loader']
        },
        {
          test: /.jsx?$/,
          loader: 'babel-loader',
          exclude: /node_modules(?!\/tryitout)/,
          query: {
            presets: ['es2015', 'react']
          }
        },
      ],
    },
    resolve: {
      modules: [path.resolve(__dirname, 'node_modules'), 'node_modules']
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        },
        source: injectSource ? JSON.stringify(source) : undefined
      }),
      new HtmlWebpackPlugin({
        inlineSource: '.(js|css)$',
        template: './template.html'
      }),
      new HtmlWebpackInlineSourcePlugin()
    ]
  };

  if (source.externals && source.externals.length > 0 && !skipConcat) {
    // get the absolute path for the externals
    config.entry.vendor = source.externals.map((e) => path.resolve(workingDirectory, e));
  }

  return webpack(config, function(err, stats) {
    if (stats.compilation.errors && stats.compilation.errors.length > 0) return callback(stats.compilation.errors);
    if (err) return callback(err);
    const buildContents = fs.readFileSync(outFile).toString('utf8');

    fs.unlinkSync(path.resolve(output, 'build.js'));
    if (config.entry.vendor) fs.unlinkSync(path.resolve(output, 'vendor.js'));

    return callback(null, buildContents);
  });
}
