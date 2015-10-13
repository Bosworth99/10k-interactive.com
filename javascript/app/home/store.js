// # HomeStore

define(function (require) {
    'use strict';

    var Backbone        = require('backbone');
    var Dispatcher      = require('dispatcher');

    // CLASS //////////////////////////////////////////////////////////////////
    var HomeStore =  Backbone.Model.extend({

        name : 'HomeStore',

        initialize: function () {
            //console.log('%s::initialize ', this.name );

            this.set('init', true);

            this.set('h1Text',  'HANDCRAFTED INTERNET');
            this.set('bgsrc',   '/images/bg/desktop.v3.jpg' );

            this.addEventHandlers();
        },

        activate : function(){

            Dispatcher.dispatch({action:'module:ready:home'});

            this.setBGTimer();
        },

        dectivate : function(){},

        defaults : {

            img_bg : [
                { src : '/images/bg/desktop.v1.jpg' },
                { src : '/images/bg/desktop.v2.jpg' },
                { src : '/images/bg/desktop.v3.jpg' }
            ]
        },

        // DISPATCHER EVENTS //////////////////////////////////////////////////
        addEventHandlers : function(){

            var _this = this;

            Dispatcher.bus.on('module:open:home',   function(args){ _this.onModuleOpenHome(args); });
            Dispatcher.bus.on('module:opened:home', function(args){ _this.onModuleOpenedHome(args); });
            Dispatcher.bus.on('module:closed:home', function(args){ _this.onModuleClosedHome(args); });

            Dispatcher.bus.on('home:click:title',   function(){     _this.onHomeClickTitle(); });
        },

        onModuleOpenHome : function(args){

            this.activate();
        },

        onModuleOpenedHome : function(args){

            this.trigger('render:children');
        },

        onModuleClosedHome : function(args){

            this.dectivate();
        },

        onHomeClickTitle : function(){

            // listening in HomeViewHero
            this.set( 'h1Text', this.setTitleText() );

            this.setHomeTitleTimer();
        },

        // CHILD METHODS //////////////////////////////////////////////////////

        setHomeTitleTimer : function(){

            if (this.homeTitleInterval){
                window.clearInterval((this.homeTitleInterval));
            }

            var _this = this;
            this.homeTitleInterval = window.setInterval(function(){

                // listening in HomeViewHero
                _this.set('h1Text', 'HANDCRAFTED INTERNET');
            }, 5000);

        },

        setBGTimer : function(){

            if (this.bgsrcTimer){
                window.clearInterval((this.bgsrcTimer));
            }

            var _this = this;
            this.bgsrcTimer = window.setInterval( function(){

                var list   = _this.get('img_bg');
                var bgsrc = _.shuffle( list )[0].src;

                // listening in HomeView
                _this.set('bgsrc', bgsrc);

            }, 10000);

        },

        setTitleText : function(txt){

            var titles = [
                'handicraft rented ten',
                'ten had frantic rented',
                'frantic nether add ten',
                'frantic hardened tent',
                'ardent definer nth cat',
                'ardent finch attender',
                'chant draftier end ten',
                'tender handicraft net',
                'refracted ninth anted',
                'rented frantic dent ha',
                'tender craften hat inn',
                'ardent defect ran thin',
                'interface trend ad nth',
                'den refracted at ninth'
            ];

            return _.shuffle( titles )[0].toUpperCase();
        }

    });

    return new HomeStore();

});