const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

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

  var compiler = webpack(config);

  if(!skipConcat && source.externals && source.externals.length > 0) {
    compiler.plugin('compilation', function(compilation) {
      compilation.plugin('html-webpack-plugin-alter-asset-tags', function(htmlPluginData, callback) {
        let head = htmlPluginData.head;
        let body = htmlPluginData.body;

        source.externals.forEach((e) => {
          let tag = {
            innerHTML: fs.readFileSync(path.resolve(workingDirectory, e)).toString('utf8')
          };
          if (path.extname(e) == '.js') {
            head.push(Object.assign(tag, {
              tagName: 'script',
              closeTag: true,
              attributes: {
                type: 'text/javascript'
              }
            }));
          }
          if (path.extname(e) == '.css') {
            head.push(Object.assign(tag, {
              tagName: 'style',
              closeTag: true,
              attributes: {
                type: 'text/css'
              }
            }));
          }
        })

        callback(null, {
          head: head,
          body: body,
          plugin: htmlPluginData.plugin,
          chunks: htmlPluginData.chunks,
          outputName: htmlPluginData.outputName
        });
      });
    });
  }

  compiler.run(function(err, stats) {
    if (stats.compilation.errors && stats.compilation.errors.length > 0) return callback(stats.compilation.errors);
    if (err) return callback(err);
    const buildContents = fs.readFileSync(outFile).toString('utf8');

    fs.unlinkSync(path.resolve(output, 'build.js'));
    if (config.entry.vendor) fs.unlinkSync(path.resolve(output, 'vendor.js'));

    return callback(null, buildContents);
  });

}
