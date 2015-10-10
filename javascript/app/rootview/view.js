// # Controller/View

define(function(require){
    'use strict';

    var Marionette     = require('backbone.marionette');
    var Template       = require('requireText!rootview/template.html');

    // CLASS //////////////////////////////////////////////////////////////////

    return Marionette.LayoutView.extend({

        name : 'RootViewView',

        el: '#main',

        template: _.template(Template),

        regions: {
            layout : '#layout'
        },

        initialize: function () {

        },

        // MODEL EVENTS ///////////////////////////////////////////////////////
        modelEvents: {
            'render:init' : 'render'
        },

        onRender : function(){
            console.log('RootViewView::onRender');
        },

        // DOM EVENTS ///////////////////////////////////////////////////////

        events : {
            'click [data-action="clickme"]' : 'onActionClickMe'
        },

        onActionClickMe : function(e){
            e.preventDefault();

            console.log('clicky clicky');

        }


    });

});
