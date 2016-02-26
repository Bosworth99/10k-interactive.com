// # HeaderStore

define(function (require) {
    'use strict';

    var k10            = require('abstract');

    //var Backbone        = require('backbone');
    //var Dispatcher      = require('dispatcher');

    // CLASS //////////////////////////////////////////////////////////////////

    var Klass =  k10.Store.extend({

        name : 'HeaderStore',

        initialize: function () {
            console.log('%s::initialize %o', this.name, k10.Store.bar );

            this.set('init', true);

            this.addEventHandlers();
        },

        activate : function(){

            //Dispatcher.dispatch({action:'module:ready:header'});

            k10.publish( { action:'module:ready:header'} );
        },

        dectivate : function(){},

        // DISPATCHER EVENTS //////////////////////////////////////////////////
        addEventHandlers : function(){

            var _this = this;

            k10.subscribe('module:open:header',   function(args, e){ _this.onModuleOpenHeader(args, e); });
            k10.subscribe('module:opened:header', function(args, e){ _this.onModuleOpenedHeader(args, e); });
            k10.subscribe('module:closed:header', function(args, e){ _this.onModuleClosedHeader(args, e); });
        },

        onModuleOpenHeader : function(args, e){

            this.activate();
        },

        onModuleOpenedHeader : function(args, e){

            this.trigger('render:view');
        },

        onModuleClosedHeader : function(args, e){

            this.dectivate();
        },


    });

    return new Klass();

});
