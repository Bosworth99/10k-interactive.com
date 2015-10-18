// # HomeView

define(function (require) {
    'use strict';

    // @includes
    var $           = require('jquery');
    var Dispatcher  = require('dispatcher');
    var Marionette  = require('backbone.marionette');
    var TweenMax    = require('tweenmax');

    // @components
    var Store       = require('home/store');
    var Template    = require('requireText!home/template.html');

    // @children
    var HomeViewHero = require('home/view/hero');
    var Background  = require('shared/background/view');

    // CLASS //////////////////////////////////////////////////////////////////
    var HomeView = Marionette.LayoutView.extend({

        name : 'HomeView',

        template: _.template(Template),

        initialize : function(){

            this.$el.attr('data-el', this.name);

            this.model = Store;

            this.addModelEvents();
        },

        onAttach : function(){

            Dispatcher.dispatch({action:'module:opened:home'});
        },

        onDestroy : function(){

            Dispatcher.dispatch({action:'module:closed:home'});
        },

        // REGIONS ////////////////////////////////////////////////////////////
        regions : {

            'hero'          : '#page-home-hero',
            'background'    : '#page-home-bg'
        },

        // MODEL EVENTS ///////////////////////////////////////////////////////

        modelEvents: {
            'render:children'   : 'onRenderChildren',
            'change:stats'      : 'onResize'
        },

        onRenderChildren : function(){

            if (this.getRegion('hero')) {
                this.showChildView('hero', new HomeViewHero({model: this.model}));
            }

            if (this.getRegion('background')) {
                this.showChildView('background', new Background());
            }

        },

        onResize : function(){
            //console.log('BackgroundView::onResize', this.model.get('stats') );

            var stats = this.model.get('stats');

            this.$el.css({
                height  : stats.height,
                width   : stats.width
            });
        },

        addModelEvents : function(){

            var _this = this;

            for (var evt in this.modelEvents){
                this.listenTo( this.model, evt,  this[ this.modelEvents[evt] ] );
            }
        },

        // UI EVENTS //////////////////////////////////////////////////////////

        events: {}

    });

    return HomeView;
});