// # HeaderStore

define(function (require) {
    'use strict';

    var TKI             = require('abstract');

    var Backbone        = require('backbone');
    var Dispatcher      = require('dispatcher');

    // CLASS //////////////////////////////////////////////////////////////////
    var HeaderStore =  TKI.Model.extend({

        name : 'HeaderStore',

        initialize: function () {
            //console.log('%s::initialize ', this.name );

            this.set('init', true);

            this.addEventHandlers();

        },

        activate : function(){

            Dispatcher.dispatch({action:'module:ready:header'});

            TKI.publish( { action:'tki:publish:1' } );

            TKI.publish( { action:'tki:publish:2' } );

        },

        dectivate : function(){},

        // DISPATCHER EVENTS //////////////////////////////////////////////////
        addEventHandlers : function(){

            var _this = this;

            Dispatcher.subscribe('module:open:header',   function(args){ _this.onModuleOpenHeader(args); });
            Dispatcher.bus.on('module:opened:header', function(args){ _this.onModuleOpenedHeader(args); });
            Dispatcher.bus.on('module:closed:header', function(args){ _this.onModuleClosedHeader(args); });
        },

        onModuleOpenHeader : function(args){

            this.activate();
        },

        onModuleOpenedHeader : function(args){

            this.trigger('render:view');
        },

        onModuleClosedHeader : function(args){

            this.dectivate();
        },


    });

    return new HeaderStore();

});