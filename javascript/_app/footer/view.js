// # FooterView

define(function (require) {
    'use strict';

    // @includes
    var Dispatcher  = require('dispatcher');
    var Marionette  = require('backbone.marionette');

    // @components
    var Template    = require('requireText!footer/template.html');

    // CLASS //////////////////////////////////////////////////////////////////
    var FooterView = Marionette.ItemView.extend({

        name : 'FooterView',

        template: _.template(Template),

        initialize : function(){

            this.$el.attr('data-el', this.name);
        },

        onAttach : function(){

            Dispatcher.dispatch({action : 'module:opened:footer'});
        },

        onDestroy : function(){},

        // MODEL EVENTS ///////////////////////////////////////////////////////
        modelEvents: {},

        // UI EVENTS //////////////////////////////////////////////////////////
        events: {},

    });

    return FooterView;
});