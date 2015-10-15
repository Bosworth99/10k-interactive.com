// # HomeView

define(function (require) {
    'use strict';

    // @includes
    var Dispatcher  = require('dispatcher');
    var Marionette  = require('backbone.marionette');
    var TweenMax    = require('tweenmax');

    // @components
    var Template    = require('requireText!shared/template.html');
    var Store       = require('shared/background/store');

    // CLASS //////////////////////////////////////////////////////////////////
    var HomeViewHero = Marionette.ItemView.extend({

        name : 'BackgroundView',

        el : '#page-home-bg',

        template: _.template(Template),

        initialize : function(){
            console.log('BackgroundView::initialize');


            this.model = new Store();
            this.model.activate();  // hmmm

            this.$el.attr('id', this.name + '_el');
        },

        onAttach : function(){ 

        },

        onDestroy : function(){ },

        // MODEL EVENTS ///////////////////////////////////////////////////////
        modelEvents: { 
            'change:src' : 'onChangeSrc'
        },

        onChangeSrc : function(){

            var background = String( 'url("' + this.model.get('bgsrc') + '")');

            this.$el.css({
                'background-image' : background
            });

        },

        // UI EVENTS //////////////////////////////////////////////////////////
        events: { }

    });

    return HomeViewHero;
});