// # HeaderStore

define(function (require) {
    'use strict';

    var _10k            = require('abstract');

    //var Backbone        = require('backbone');
    //var Dispatcher      = require('dispatcher');

    // CLASS //////////////////////////////////////////////////////////////////
    var Klass =  _10k.Model.extend({

        name : 'HeaderStore',

        initialize: function () {
            //console.log('%s::initialize ', this.name );

            this.set('init', true);

            this.addEventHandlers();
        },

        activate : function(){

            //Dispatcher.dispatch({action:'module:ready:header'});

            _10k.publish( { action:'module:ready:header'} );
        },

        dectivate : function(){},

        // DISPATCHER EVENTS //////////////////////////////////////////////////
        addEventHandlers : function(){

            var _this = this;

            _10k.subscribe('module:open:header',   function(args, e){ _this.onModuleOpenHeader(args, e); });
            _10k.subscribe('module:opened:header', function(args, e){ _this.onModuleOpenedHeader(args, e); });
            _10k.subscribe('module:closed:header', function(args, e){ _this.onModuleClosedHeader(args, e); });
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