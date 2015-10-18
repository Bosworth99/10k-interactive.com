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
    var FooterView      = require('footer/view');
    var FixedView       = require('fixed/view');
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
            //console.log('%s::initialize', this.name);

            this.$el.attr('data-el', this.name);

            this.render();

            this.$window  = $(window);

            this.addWindowEvents();

            this.onDOMUpdate();

        },

        // MODEL EVENTS ///////////////////////////////////////////////////////
        modelEvents: {
            'render:header'         : 'onRenderHeader',
            'render:footer'         : 'onRenderFooter',
            'render:fixed'          : 'onRenderFixed',
            'render:content:home'   : 'onRenderContentHome'
        },

        onRenderHeader : function(){

            if (this.getRegion('header') && !this.getRegion('header').hasView()){

                this.showChildView('header', new HeaderView());
            }

        },

        onRenderFooter : function(){

            if (this.getRegion('footer') && !this.getRegion('footer').hasView()){

                this.showChildView('footer', new FooterView());
            }
        },

        onRenderFixed : function(){

            if (this.getRegion('fixed') && !this.getRegion('fixed').hasView()){

                this.showChildView('fixed', new FixedView());
            }
        },

        onRenderContentHome : function(){

            if (this.getRegion('content')){

                this.showChildView('content', new HomeView());

                this.onDOMUpdate();
            }
        },

        // DOM EVENTS ///////////////////////////////////////////////////////

        addWindowEvents : function(){
            var _this = this;

            this.$window.on('resize', function(){ _this.onDOMUpdate(); });
        },

        events : {
            'update:dom' : 'onDOMUpdate'
        },

        onDOMUpdate : function(){

            var params = {
                height : window.innerHeight,
                width  : window.innerWidth
            };

            Dispatcher.bus.trigger( 'dom:resize', { stats : params } );
        }

    });

});
