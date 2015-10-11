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
            console.log('RootViewStore::initialize');

            this.addEventHandlers();
        },

        addEventHandlers : function(){

            var _this = this;

            Dispatcher.bus.on('module:ready:home', function(args,e){
                _this.onModuleReadyHome(args,e);
            });
        },

        onModuleReadyHome : function(args,e){

            this.trigger('render:content:home');
        }

    });

    return new RootViewStore();

});