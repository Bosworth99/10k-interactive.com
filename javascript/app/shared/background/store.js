// # BackgroundStore

define(function (require) {
    'use strict';

    var Backbone        = require('backbone');
    var Dispatcher      = require('dispatcher');

    // CLASS //////////////////////////////////////////////////////////////////
    var BackgroundStore =  Backbone.Model.extend({

        name : 'BackgroundStore',

        initialize: function () {
            console.log('%s::initialize ', this.name );

            this.set('init', true);

            this.set('src', '/images/bg/desktop.v3.jpg' );
            this.set('top', 'one');

            this.addEventHandlers();

            this.setBGTimer();
        },

        activate : function(){},

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

            Dispatcher.bus.on('window:resize', function(args){ _this.onResize(args); });
        },

        setBGTimer : function(){

            if (this.srcTimer){
                window.clearInterval(this.srcTimer);
            }

            var _this = this;

            this.srcTimer = window.setInterval( function(){
                _this.updateSrc();
            }, 10000);
        },

        updateSrc : function(){

            var src   = _.shuffle( this.get('img_bg') )[0].src;

            if (this.get('top') === 'one'){

                this.set('top', 'two');
            } else {

                this.set('top', 'one');
            }

            // listening in HomeView
            this.set('src', src);
        },

        onResize : function(payload){

            this.set('stats', payload.stats );

            this.trigger('change:stats');
        }

    });

    return BackgroundStore;

});