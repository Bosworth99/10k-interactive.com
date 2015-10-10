// #Router
// Wire up all navigation events
// handle all callbacks as dispatcher events

define(function(require){
    'use strict';

    var Backbone    = require('backbone');

    return Backbone.Router.extend({

        name : 'Router',

        initialize : function(){ },

        routes: {
            '': function () {
                console.log('Router::[ empty ]');
            }
        }

    });
});
