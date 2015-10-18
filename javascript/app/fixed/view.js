// # FixedView

define(function (require) {
    'use strict';

    // @includes
    var Dispatcher  = require('dispatcher');
    var Marionette  = require('backbone.marionette');

    // @components
    var Template    = require('requireText!fixed/template.html');

    // CLASS //////////////////////////////////////////////////////////////////
    var FixedView = Marionette.ItemView.extend({

        name : 'FixedView',

        template: _.template(Template),

        initialize : function(){

            this.$el.attr('data-el', this.name);
        },

        onAttach : function(){

            Dispatcher.dispatch({action : 'module:opened:fixed'});
        },

        onDestroy : function(){},

        // MODEL EVENTS ///////////////////////////////////////////////////////
        modelEvents: {},

        // UI EVENTS //////////////////////////////////////////////////////////
        events: {}

    });

    return FixedView;
});