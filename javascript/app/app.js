// #App
// Instantiate application core and apply static resources to the global app

define(function (require) {
    'use strict';

    // @globals
    var Utility         = require('utility');
    var Config          = require('config');

    // @includes
    var Backbone        = require('backbone');
    var Marionette      = require('backbone.marionette');
    var Radio           = require('backbone.radio');

    // @modules
    var Router          = require('router');

    var RootView        = require('rootview/store');
    var RootViewView    = require('rootview/view');

    var Header          = require('header/store');
    var Home            = require('home/store');

    // CLASS //////////////////////////////////////////////////////////////////
    var App =  Marionette.Application.extend({

        name : 'App',

        initialize : function(){
            console.log('App::initialize %o', Config);

            // configure all the things
            this.configureApp();

            // make the moduels
            this.assembleModules();
        },

        configureApp : function(){

            // set some stuff
            this.config         = Config;

            // assign configurations
            Radio.DEBUG         = Config.Debug;

            // do some other stuff
            $.ajaxSetup({ cache: false });
        },

        assembleModules : function(){

            // Start the router and the instantiation train
            this.router             = new Router(this);

            this.modules            = {};
            this.modules.rootview   = RootView;
            this.modules.header     = Header;
            this.modules.home       = Home;

            // have to instatiate the root view manually
            this.rootView           = new RootViewView( { model : this.modules.rootview } );
        },

        start: function () {
            console.log('App::start %o', this);

            Backbone.history.start();
        }


    });

    return App;
});
