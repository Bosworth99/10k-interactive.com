// # RootView/View

define(function(require){
    'use strict';

    // @includes
    var Dispatcher      = require('dispatcher');
    var Marionette      = require('backbone.marionette');

    // @componentes
    var Template        = require('requireText!rootview/template.html');

    // @modules
    var HomeView        = require('home/view');

    // CLASS //////////////////////////////////////////////////////////////////

    return Marionette.LayoutView.extend({

        name : 'RootViewView',

        el: '#main',

        template: _.template(Template),

        regions: {
            header  : '#site-header',
            content : '#site-content',
            footer  : '#site-footer',
            fixed   : '#site-fixed'
        },

        initialize: function () {

            this.addEventHandlers();

            this.render();
        },

        addEventHandlers : function(){ },

        // MODEL EVENTS ///////////////////////////////////////////////////////
        modelEvents: {
            'render:content:home' : 'onRenderContentHome'
        },

        onRenderContentHome : function(){

            if (this.getRegion('content')){

                this.showChildView('content', new HomeView());
            }

        },

        // DOM EVENTS ///////////////////////////////////////////////////////

        events : {}


    });

});
