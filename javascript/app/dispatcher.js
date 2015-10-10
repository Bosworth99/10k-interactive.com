define(function (require) {
    'use strict';

    var Backbone   = require('backbone');
    var Radio      = require('backbone.radio');

    var Dispatcher =  Backbone.Model.extend({

        name : 'Dispatcher',

        initialize : function(){
            console.log('Dispatcher::initialize');

            this.disptacher = Radio.channel('dispatcher');
        }

    });

    return new Dispatcher();

});