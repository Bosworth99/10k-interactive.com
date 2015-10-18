// # FooterStore

define(function (require) {
    'use strict';

    var Backbone        = require('backbone');
    var Dispatcher      = require('dispatcher');

    // CLASS //////////////////////////////////////////////////////////////////
    var FooterStore =  Backbone.Model.extend({

        name : 'FooterStore',

        initialize: function () {
            //console.log('%s::initialize ', this.name );

            this.set('init', true);

            this.addEventHandlers();
        },

        activate : function(){

            Dispatcher.dispatch({action:'module:ready:footer'});
        },

        dectivate : function(){},

        // DISPATCHER EVENTS //////////////////////////////////////////////////
        addEventHandlers : function(){

            var _this = this;

            Dispatcher.bus.on('module:open:footer',   function(args){ _this.onModuleOpenFooter(args); });
            Dispatcher.bus.on('module:opened:footer', function(args){ _this.onModuleOpenedFooter(args); });
            Dispatcher.bus.on('module:closed:footer', function(args){ _this.onModuleClosedFooter(args); });
        },

        onModuleOpenFooter : function(args){

            this.activate();
        },

        onModuleOpenedFooter : function(args){

            this.trigger('render:view');
        },

        onModuleClosedFooter : function(args){

            this.dectivate();
        },


    });

    return new FooterStore();

});