// #Router
// Wire up all navigation events

define(function(require){
    'use strict';

    var Dispatcher  = require('dispatcher');
    var Backbone    = require('backbone');

    // CLASS //////////////////////////////////////////////////////////////////
    return Backbone.Router.extend({

        name : 'Router',

        initialize : function(){

            this.addEventHandlers();
        },

        // DISPATCHER EVENTS //////////////////////////////////////////////////

        addEventHandlers : function(){

            var _this = this;

            Dispatcher.bus.on('module:opened:home', function(args,e){
                _this.onModuleOpenedHome(args,e);
            });
        },

        onModuleOpenedHome : function(args,e){

            Backbone.history.navigate('home');
        },

        // ROUTES /////////////////////////////////////////////////////////////

        routes: {
            ''          : 'onEmptyRoute',
            'home'      : 'onRouteHome'
        },

        onEmptyRoute : function(){

            Dispatcher.dispatch({ action : 'module:open:home' });
        },

        onRouteHome : function(){

            Dispatcher.dispatch({ action : 'module:open:home' });
        }

    });
});
