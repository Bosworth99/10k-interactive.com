// #App
// Instantiate application core and apply static resources to the global app

define(function (require) {
    'use strict';

    // @includes
    var Marionette  = require('backbone.marionette');
    var Router      = require('router');

    // @modules
    var RootView    = require('rootview/store');

    var App =  Marionette.Application.extend({

        name : 'App',

        initialize : function(){
            console.log('App::initialize');

            // Start the router and the instantiation train
            this.router         = new Router(this);

            this.modules        = {

                rootview : RootView
            };

            $.ajaxSetup({ cache: false });

        },

        start: function () {
            console.log('App::start');

            Backbone.history.start();
        }


    });

    return App;
});
