// # HomeStore

define(function (require) {
    'use strict';

    var Backbone        = require('backbone');
    var Dispatcher      = require('dispatcher');

    // CLASS //////////////////////////////////////////////////////////////////
    var HomeStore =  Backbone.Model.extend({

        name : 'HomeStore',

        initialize: function () {
            console.log('%s::initialize ', this.name );

            this.set('init', true);

            this.set('h1Text',  'Handcrafted Internet');
            this.set('bgsrc',   'desktop.v1.jpg' );

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

            Dispatcher.bus.on('module:home:click:h1', function(args){ _this.onModuleHomeClickH1(args); });
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

        onModuleHomeClickH1 : function(args){

            var text = _.shuffle( args.text.split('') );

            this.set( 'h1Text', text.join('') );

            this.setHomeTitleTimer();
        },

        // CHILD METHODS //////////////////////////////////////////////////////

        setHomeTitleTimer : function(){

            if (this.homeTitleInterval){
                window.clearInterval((this.homeTitleInterval));
            }

            var _this = this;
            this.homeTitleInterval = window.setInterval(function(){

                _this.set('h1Text', 'Handcrafted Internet');
            }, 2500);

        },

        setBGTimer : function(){

            if (this.bgsrcTimer){
                window.clearInterval((this.bgsrcTimer));
            }

            var _this = this;
            this.bgsrcTimer = window.setInterval( function(){

                var list   = _this.get('img_bg');
                var bgsrc = _.shuffle( list )[0];

                _this.set('bgsrc', bgsrc);

            }, 2000);

        }




    });

    return new HomeStore();

});