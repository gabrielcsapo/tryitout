const fs = require('fs')
const path = require('path')
const webpack = require('webpack')

const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = (options, callback) => {
  const { config, injectConfig = true, skipConcat = false } = options

  const workingDirectory = path.dirname(config.path)
  const outFile = path.resolve(config.output, 'build.js')

  const webpackConfig = {
    entry: {
      build: path.resolve(__dirname, '..', 'src', 'templates', `${config.template}.js`)
    },
    output: {
      path: config.output,
      filename: '[name].js'
    },
    context: __dirname,
    module: {
      rules: [{
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.ttf$/,
        use: ['file-loader']
      },
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules(?!\/tryitout)/,
        query: {
          cacheDirectory: true,
          presets: [
            ['@babel/env', {
              targets: {
                browsers: 'last 2 Chrome versions',
                node: 'current'
              },
              modules: 'commonjs'
            }],
            '@babel/react'
          ]
        }
      },
      {
        test: /\.(jpg|png|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 25000
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
          NODE_ENV: process.env.NODE_ENV ? `"${process.env.NODE_ENV}"` : JSON.stringify('production')
        },
        'global.config': injectConfig ? JSON.stringify(config) : undefined
      }),
      new webpack.optimize.AggressiveMergingPlugin(),
      new HtmlWebpackPlugin({
        inlineSource: '.(js|css)$',
        template: './template.html'
      }),
      new HtmlWebpackInlineSourcePlugin(HtmlWebpackPlugin)
    ]
  }

  if (config.template === 'code') {
    webpackConfig.plugins.push(
      new MonacoWebpackPlugin({
        languages: ['javascript']
      })
    )

    webpackConfig.optimization = {
      splitChunks: {
        cacheGroups: {
          monacoCommon: {
            test: /[\\/]node_modules[\\/]monaco\-editor/,
            name: 'monaco-editor-common',
            chunks: 'async'
          }
        }
      }
    }
  }

  const compiler = webpack(webpackConfig)

  if (!skipConcat && config.externals && config.externals.length > 0) {
    compiler.hooks.compilation.tap('html-webpack-plugin-alter-asset-tags', function (compilation) {
      HtmlWebpackPlugin.getHooks(compilation).alterAssetTagGroups.tapAsync('HtmlWebpackPluginTest', (htmlPluginData, callback) => {
        config.externals.forEach((e) => {
          const tag = {
            innerHTML: fs.readFileSync(path.resolve(workingDirectory, e)).toString('utf8')
          }
          if (path.extname(e) === '.js') {
            htmlPluginData.headTags.push(Object.assign(tag, {
              tagName: 'script',
              closeTag: true,
              attributes: {
                type: 'text/javascript'
              }
            }))
          }
          if (path.extname(e) === '.css') {
            htmlPluginData.headTags.push(Object.assign(tag, {
              tagName: 'style',
              closeTag: true,
              attributes: {
                type: 'text/css'
              }
            }))
          }
        })

        callback(null, htmlPluginData)
      })
    })
  }

  compiler.run(async function (err, stats) {
    if (err) return callback(err)
    if (stats.compilation.errors && stats.compilation.errors.length > 0) return callback(stats.compilation.errors)

    fs.readFile(outFile, (error, content) => {
      if (error) return callback(error)

      // This is used by watch or anything that wants to get the raw output for the build contents
      const buildContents = content.toString('utf8')

      // We want to unlink the build.js file as this is unnecessary and we just want one file
      fs.unlink(outFile, (error) => {
        if (error) return callback(error)

        if (webpackConfig.entry.vendor) {
          // This can be unlinked because it is in the buildContents
          fs.unlink(path.resolve(config.output, 'vendor.js'), () => {
            return callback(null, buildContents)
          })
        } else {
          return callback(null, buildContents)
        }
      })
    })
  })
}
