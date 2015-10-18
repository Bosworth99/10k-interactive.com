// # FixedStore

define(function (require) {
    'use strict';

    var Backbone        = require('backbone');
    var Dispatcher      = require('dispatcher');

    // CLASS //////////////////////////////////////////////////////////////////
    var FixedStore =  Backbone.Model.extend({

        name : 'FixedStore',

        initialize: function () {
            //console.log('%s::initialize ', this.name );

            this.set('init', true);

            this.addEventHandlers();
        },

        activate : function(){

            Dispatcher.dispatch({action:'module:ready:fixed'});
        },

        dectivate : function(){},

        // DISPATCHER EVENTS //////////////////////////////////////////////////
        addEventHandlers : function(){

            var _this = this;

            Dispatcher.bus.on('module:open:fixed',   function(args){ _this.onModuleOpenFixed(args); });
            Dispatcher.bus.on('module:opened:fixed', function(args){ _this.onModuleOpenedFixed(args); });
            Dispatcher.bus.on('module:closed:fixed', function(args){ _this.onModuleClosedFixed(args); });
        },

        onModuleOpenFixed : function(args){

            this.activate();
        },

        onModuleOpenedFixed : function(args){

            this.trigger('render:view');
        },

        onModuleClosedFixed : function(args){

            this.dectivate();
        },


    });

    return new FixedStore();

});