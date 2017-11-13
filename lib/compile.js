const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BabiliPlugin = require('babel-minify-webpack-plugin');

module.exports = ({
  config,
  output,
  injectConfig = true,
  skipConcat = false,
  template = 'code'
}, callback) => {
  const workingDirectory = path.dirname(config.path || process.cwd());
  const outFile = path.resolve(output, 'build.js');

  let webpackConfig = {
    entry: {
      build: path.resolve(__dirname, '..', 'src', 'templates', `${template}.js`)
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
            presets: ['env', 'react']
          }
        },
        {
          test: /\.(jpg|png|svg)$/,
          loader: 'url-loader',
          options: {
            limit: 25000,
          }
        }
      ]
    },
    resolve: {
      modules: [path.resolve(__dirname, 'node_modules'), 'node_modules']
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': process.env.NODE_ENV ? `"${process.env.NODE_ENV}"` : JSON.stringify('production')
        },
        'global.config': injectConfig ? JSON.stringify(config) : undefined
      }),
      new BabiliPlugin({
        simplify: false,
        deadcode: false
      }),
      new webpack.optimize.AggressiveMergingPlugin(),
      new HtmlWebpackPlugin({
        inlineSource: '.(js|css)$',
        template: './template.html'
      }),
      new HtmlWebpackInlineSourcePlugin()
    ]
  };

  var compiler = webpack(webpackConfig);

  if (!skipConcat && config.externals && config.externals.length > 0) {
    compiler.plugin('compilation', function(compilation) {
      compilation.plugin('html-webpack-plugin-alter-asset-tags', function(htmlPluginData, callback) {
        let head = htmlPluginData.head;
        let body = htmlPluginData.body;

        config.externals.forEach((e) => {
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

  compiler.run(async function(err, stats) {
    if (err) return callback(err);
    if (stats.compilation.errors && stats.compilation.errors.length > 0) return callback(stats.compilation.errors);

    fs.readFile(outFile, (error, content) => {
      if (error) return callback(error);

      const buildContents = content.toString('utf8');
      fs.unlink(path.resolve(output, 'build.js'), (error) => {
        if (error) return callback(error);

        if (webpackConfig.entry.vendor) {
          fs.unlink(path.resolve(output, 'vendor.js'), () => {
            return callback(null, buildContents);
          });
        } else {
          return callback(null, buildContents);
        }
      });
    });

  });
}
