// # RootView/View

define(function(require){
    'use strict';

    // @includes
    var Dispatcher      = require('dispatcher');
    var Marionette      = require('backbone.marionette');

    // @componentes
    var Template        = require('requireText!rootview/template.html');

    // @modules
    var HeaderView      = require('header/view');
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
            console.log('RootViewView::initialize');

            this.$el.attr('data-el', this.name);

            this.render();


            this.$window  = $(window);

            this.addWindowEvents();

            this.onResize();

        },

        // MODEL EVENTS ///////////////////////////////////////////////////////
        modelEvents: {
            'render:header'         : 'onRenderHeader',
            'render:content:home'   : 'onRenderContentHome'
        },

        onRenderHeader : function(){

            if (this.getRegion('header')){

                this.showChildView('header', new HeaderView());
            }

        },

        onRenderContentHome : function(){

            if (this.getRegion('content')){

                this.showChildView('content', new HomeView());

                this.onResize();
            }

        },

        // DOM EVENTS ///////////////////////////////////////////////////////

        addWindowEvents : function(){
            var _this = this;

            this.$window.on('resize', function(){ _this.onResize(); });
        },

        events : {
            'update:window' : 'onResize'
        },

        onResize : function(){

            var params = {
                height : window.innerHeight,
                width  : window.innerWidth
            };

            Dispatcher.bus.trigger( 'window:resize', { stats : params } );
        }


    });

});
