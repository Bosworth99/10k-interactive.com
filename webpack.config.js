'use strict';

module.exports = {
    context : __dirname + '/javascript/app/',
    entry: './index',
    module: {
        loaders: [
            {
              test: /\.js?$/,
              exclude: /(node_modules|vendor)/,
              loader: 'babel-loader'
            }
        ]
    },
    output: {
        path: __dirname + '/javascript/dist/',
        filename: 'bundle.js'
    },
    resolve : {
        root : [
            __dirname + '/javascript/app',
            __dirname + '/javascript/vendor'
        ],
        modulesDirectories: ['javascript', 'node_modules'],
        extensions: ['', '.js'],
        alias: {
            'jquery' : 'jquery/dist/jquery.min',
            'gsap' : 'gsap/src/minified/TweenMax.min'
            //'underscore': 'underscore/underscore-min',
            //'backbone'  : 'backbone/backbone-min'
        },
        devtool: '#inline-source-map'
    },
    resolveLoader: {
        modulesDirectories: [
            __dirname + '/node_modules/'
        ]
    }
};
