define(function (require) {
    'use strict';

    // @includes
    var Marionette = require('backbone.marionette');
    var Backbone   = require('backbone');
    var Radio      = require('backbone.radio');

    var Config     = require('config');

    // CLASS //////////////////////////////////////////////////////////////////
    var Dispatcher = Marionette.Object.extend({

        name    : 'Dispatcher',

        bus     : Radio.channel('dispatcher'),

        initialize : function(){

            //console.log('Dispatcher::initialize', this.dispatcher, Radio);
        },

        dispatch : function(payload){

            var action = 'dispatch:empty';
            var params = {};

            if ( typeof payload !== 'undefined'){

                if ( typeof payload.action !== 'undefined') {

                    action = payload.action;
                } else {

                    throw new Error('payload.action is required. %o', payload.action );
                }

                if ( typeof payload.params !== 'undefined') {

                    params = payload.params;
                }

                if ( Config.debug && typeof window.console !== 'undefined'){
                    window.console.log('ACTION %s PAYLOAD %o', action, params );
                }

                if ( typeof payload.params !== 'undefined') {

                    // trigger the action / param on the Radio.channel bus
                    Radio.channel('dispatcher').trigger( action, params );

                } else {

                    // trigger the action / param on the Radio.channel bus
                    Radio.channel('dispatcher').trigger( action );

                }

            }

        },

        subscribe : function(action, callback){
            //console.log('dispatcher::subscribe', action, callback);

            Radio.channel('dispatcher').on(action, callback);
        }
    });

    return new Dispatcher();

});