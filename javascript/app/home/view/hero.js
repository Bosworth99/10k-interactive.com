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

        onAttach : function(){},

        onDestroy : function(){},

        // MODEL EVENTS ///////////////////////////////////////////////////////
        modelEvents: {
            'change:h1Text' : 'render'
        },

        onChangeH1 : function(){},

        // UI EVENTS //////////////////////////////////////////////////////////
        events: {
            'click h1' : 'onClickH1'
        },

        onClickH1 : function(e){
            e.preventDefault();

            var t = this.$el.find('h1');

            var action = 'module:home:click:h1';
            var params = {
                text : t.text()
            };

            Dispatcher.dispatch({action : action, params : params});
        }


    });

    return HomeViewHero;
});