// # RootViewStore
//  - this is the rootView Store, responsible for maintaining the state of the app
//  - we're using marionette regianView behaviors to manage the view lifecycle

define(function (require) {
    'use strict';

    var Dispatcher      = require('dispatcher');
    var Backbone        = require('backbone');

    // CLASS //////////////////////////////////////////////////////////////////

    var RootViewStore =  Backbone.Model.extend({

        name : 'RootViewStore',

        initialize: function () {
            //console.log('RootViewStore::initialize');

            this.addEventHandlers();
        },

        addEventHandlers : function(){

            var _this = this;

            Dispatcher.bus.on('request:window',         function(args){ _this.onDOMUpdate(args); });

            Dispatcher.bus.on('module:ready:header',    function(args){ _this.onModuleReadyHeader(args); });
            Dispatcher.bus.on('module:opened:header',   function(args){ _this.onModuleOpenedHeader(args); });

            Dispatcher.bus.on('module:ready:footer',    function(args){ _this.onModuleReadyFooter(args); });
            Dispatcher.bus.on('module:opened:footer',   function(args){ _this.onModuleOpenedFooter(args); });

            Dispatcher.bus.on('module:ready:fixed',     function(args){ _this.onModuleReadyFixed(args); });
            Dispatcher.bus.on('module:opened:fixed',    function(args){ _this.onModuleOpenedFixed(args); });

            Dispatcher.bus.on('module:ready:home',      function(args){ _this.onModuleReadyHome(args); });
            Dispatcher.bus.on('module:opened:home',     function(args){ _this.onModuleOpenedHome(args); });

        },

        // DOK
        onDOMUpdate : function(){

            this.trigger('update:dom');
        },

        // Header
        onModuleReadyHeader : function(args){

            this.trigger('render:header');
        },

        onModuleOpenedHeader : function(args){},

        // Footer
        onModuleReadyFooter : function(args){

            this.trigger('render:footer');
        },

        onModuleOpenedFooter : function(args){},


        // Fixed
        onModuleReadyFixed : function(args){

            this.trigger('render:fixed');
        },

        onModuleOpenedFixed : function(args){},

        // Home Page
        onModuleReadyHome : function(args){


            this.trigger('render:content:home');

            this.onDOMUpdate();
        },

        onModuleOpenedHome : function(args){}



    });

    return new RootViewStore();

});