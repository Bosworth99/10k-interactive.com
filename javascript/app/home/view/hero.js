// # HomeView

define(function (require) {
    'use strict';

    // @includes
    var Dispatcher  = require('dispatcher');
    var Marionette  = require('backbone.marionette');
    var TweenMax    = require('tweenmax');

    // @components
    var Template    = require('requireText!home/template/hero.html');

    // CLASS //////////////////////////////////////////////////////////////////
    var HomeViewHero = Marionette.ItemView.extend({

        name : 'HomeViewHero',

        template: _.template(Template),

        initialize : function(){

            this.$el.attr('id', this.name + '_el');
        },

        onAttach : function(){

            this.$title = this.$el.find('h1.title');
        },

        onDestroy : function(){},

        // MODEL EVENTS ///////////////////////////////////////////////////////
        modelEvents: {
            'change:h1Text' : 'onChangeTitle'
        },

        onChangeTitle : function(){

            this.$title.text(this.model.get('h1Text'));
        },

        // UI EVENTS //////////////////////////////////////////////////////////
        events: {
            'click h1' : 'onClickH1'
        },

        onClickH1 : function(e){
            e.preventDefault();

            var action = 'home:click:title';

            Dispatcher.dispatch( { action : action } );
        }


    });

    return HomeViewHero;
});