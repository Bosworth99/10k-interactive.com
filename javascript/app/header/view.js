// # HeaderView

define(function (require) {
    'use strict';

    // @includes
    var Dispatcher  = require('dispatcher');
    var Marionette  = require('backbone.marionette');

    // @components
    var Template    = require('requireText!header/template.html');

    // CLASS //////////////////////////////////////////////////////////////////
    var HeaderView = Marionette.ItemView.extend({

        name : 'HeaderView',

        template: _.template(Template),

        initialize : function(){

            this.$el.attr('data-el', this.name);
        },

        onAttach : function(){

            Dispatcher.dispatch({action : 'module:opened:header'});
        },

        onDestroy : function(){},

        // MODEL EVENTS ///////////////////////////////////////////////////////
        modelEvents: {},

        // UI EVENTS //////////////////////////////////////////////////////////
        events: {},

    });

    return HeaderView;
});