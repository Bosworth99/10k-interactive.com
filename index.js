// index.js

require.config({
    urlArgs: 'v=' + (new Date()).getTime(),
    baseUrl: 'Javascript/app',
    paths: {
        jquery                 : '../vendor/jquery/dist/jquery',
        underscore             : '../vendor/underscore/underscore',
        backbone               : '../vendor/backbone/backbone',

        'backbone.radio'       : '../vendor/backbone.radio/build/backbone.radio',
        'backbone.marionette'  : '../vendor/marionette/lib/backbone.marionette',
        'backbone.advice'      : '../vendor/backbone.advice/advice',
    },

    shim: {

      // Backbone
      "backbone": {

         // Depends on underscore/lodash and jQuery
         "deps": ["underscore", "jquery"],

         // Exports the global window.Backbone object
         "exports": "Backbone"

      },

   }

});

var app = {} || window.app;

(function(){
	"use strict";

    require( [ 'app' ], function (App) {

        var Application;

        $(function () {

            window.app = Application = new App();
            window.app.name 	= '10k-interactive.com';
			window.app.version 	= '0.1';

            window.app.start();
        });

        return Application;
    });

}());