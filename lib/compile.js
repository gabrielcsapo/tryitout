const webpack = require('webpack');
const path = require('path');
const concat = require('concat');

module.exports = (source, output, callback) => {
    var externals = source && source.externals || [];
    var workingDirectory = path.dirname(source.path || process.cwd());
    return webpack({
        entry: path.resolve(__dirname, '..', 'index.js'),
        output: {
            path: output,
            filename: "build.js"
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
                source: JSON.stringify(source)
            }),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.optimize.UglifyJsPlugin({
                comments: false,
                compress: {
                    unused: true,
                    dead_code: true,
                    warnings: false,
                    drop_debugger: true,
                    conditionals: true,
                    evaluate: true,
                    sequences: true,
                    booleans: true,
                }
            }),
            new webpack.optimize.AggressiveMergingPlugin(),
        ]
    }, function(err, stats) {
        if(stats.compilation.errors && stats.compilation.errors.length > 0) { return callback(stats.compilation.errors); } // eslint-disable-line
        if(err) { return callback(err); }
        if (externals && externals.length > 0) {
            // get the absolute path for the externals
            externals = externals.map((e) => path.resolve(workingDirectory, e));
            const outFile = path.resolve(output, 'build.js');
            externals.push(outFile);
            concat(externals, outFile).then(() => callback()).catch((ex) => callback(ex, null));
        } else {
          return callback(null, null);
        }
    });
}
