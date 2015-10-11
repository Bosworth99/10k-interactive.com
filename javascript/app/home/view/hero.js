// # HomeView

define(function (require) {
    'use strict';

    // @includes
    var Dispatcher  = require('dispatcher');
    var Marionette  = require('backbone.marionette');
    var TweenMax    = require('tweenmax');

    // @components
    var Store       = require('home/store');
    var Template    = require('requireText!home/template/hero.html');

    // CLASS //////////////////////////////////////////////////////////////////
    var HomeViewHero = Marionette.ItemView.extend({

        name : 'HomeViewHero',

        template: _.template(Template),

        initialize : function(){

            this.$el.attr('class', '_10k_section-inner');

            this.model = Store;
        },

        onAttach : function(){},

        onDestroy : function(){},

        // MODEL EVENTS ///////////////////////////////////////////////////////
        modelEvents: {},

        // UI EVENTS //////////////////////////////////////////////////////////
        events: {
            'click h1' : function(){ console.log('clicky clicky'); }
        }


    });

    return HomeViewHero;
});