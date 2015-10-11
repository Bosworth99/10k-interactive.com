// # HomeStore

define(function (require) {
    'use strict';

    var Backbone        = require('backbone');
    var Dispatcher      = require('dispatcher');

    // CLASS //////////////////////////////////////////////////////////////////
    var HomeStore =  Backbone.Model.extend({

        name : 'HomeStore',

        initialize: function () {
            console.log('%s::initialize ', this.name );

            this.set('init', true);

            this.addEventHandlers();
        },

        activate : function(){

            Dispatcher.dispatch({action:'module:ready:home'});
        },

        dectivate : function(){},

        // DISPATCHER EVENTS //////////////////////////////////////////////////
        addEventHandlers : function(){

            var _this = this;

            Dispatcher.bus.on('module:open:home',   function(args){ _this.onModuleOpenHome(args); });
            Dispatcher.bus.on('module:opened:home', function(args){ _this.onModuleOpenedHome(args); });
            Dispatcher.bus.on('module:closed:home', function(args){ _this.onModuleClosedHome(args); });
        },

        onModuleOpenHome : function(args){

            this.activate();
        },

        onModuleOpenedHome : function(args){

            this.trigger('render:children');
        },

        onModuleClosedHome : function(args){

            this.dectivate();
        },

    });

    return new HomeStore();

});