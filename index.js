// index.js

require.config({
    urlArgs: 'v=' + (new Date()).getTime(),
    baseUrl: 'javascript/app',
    paths: {
        jquery                 : '../vendor/jquery/dist/jquery',
        underscore             : '../vendor/underscore/underscore',
        backbone               : '../vendor/backbone/backbone',

        'backbone.radio'       : '../vendor/backbone.radio/build/backbone.radio',
        'backbone.marionette'  : '../vendor/marionette/lib/backbone.marionette',
        'backbone.advice'      : '../vendor/backbone.advice/advice',

        tweenmax               :  '../vendor/gsap/src/minified/TweenMax.min'
    },

    shim: {

        //jQuery
        'jquery' :{

            'exports' : 'jQuery'
        },

        // Backbone
        'backbone': {

            // Depends on underscore/lodash and jQuery
            'deps': ['underscore', 'jquery'],

            // Exports the global window.Backbone object
            'exports': 'Backbone'
        },

        // GSAP
        'tweenmax' : {

            'exports' : 'TweenMax'
        }

    }

});

var app = {} || window.app;

(function(){
	"use strict";

    require( [ 'jquery', 'underscore', 'backbone', 'app' ], function ( jQuery, Underscore, Backbone, App ) {

        var Application;

        $(function () {

            window.app = Application = new App();
            window.app.start();
        });

        return Application;
    });

}());
