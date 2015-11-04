// # HeaderStore

define(function (require) {
    'use strict';

    var _10k            = require('abstract');

    //var Backbone        = require('backbone');
    //var Dispatcher      = require('dispatcher');

    // CLASS //////////////////////////////////////////////////////////////////
    var HeaderStore =  _10k.Model.extend({

        name : 'HeaderStore',

        initialize: function () {
            //console.log('%s::initialize ', this.name );

            this.set('init', true);

            this.addEventHandlers();

        },

        activate : function(){

            //Dispatcher.dispatch({action:'module:ready:header'});

            _10k.publish( { action:'module:ready:header'} );
            //_10k.publish( { action:'tki:publish:2' } );
        },

        dectivate : function(){},

        // DISPATCHER EVENTS //////////////////////////////////////////////////
        addEventHandlers : function(){

            var _this = this;

            _10k.subscribe('module:open:header',   function(args){ _this.onModuleOpenHeader(args); });
            _10k.subscribe('module:opened:header', function(args){ _this.onModuleOpenedHeader(args); });
            _10k.subscribe('module:closed:header', function(args){ _this.onModuleClosedHeader(args); });
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