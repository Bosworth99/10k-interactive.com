// # BackgroundStore

define(function (require) {
    'use strict';

    var Backbone        = require('backbone');
    var Dispatcher      = require('dispatcher');

    // CLASS //////////////////////////////////////////////////////////////////
    var BackgroundStore =  Backbone.Model.extend({

        name : 'BackgroundStore',

        initialize: function () {
            //console.log('%s::initialize ', this.name );

            this.set('init', true);

            this.set('src', '/images/bg/desktop.v3.jpg' );
            this.set('top', 'one');
            this.idx = 0;

            this.addEventHandlers();

            this.setBGTimer();
        },

        activate : function(){},

        dectivate : function(){},

        defaults : {

            img_bg : [
                { src : '/images/bg/desktop.v1.jpg' },
                { src : '/images/bg/desktop.v2.jpg' },
                { src : '/images/bg/desktop.v3.jpg' },
                { src : '/images/bg/desktop.v2.jpg' }
            ]
        },

        // DISPATCHER EVENTS //////////////////////////////////////////////////
        addEventHandlers : function(){

            var _this = this;

            Dispatcher.bus.on('dom:resize', function(args){ _this.onDOMResize(args); });
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

            var src   = this.get('img_bg')[this.idx].src;

            if (this.get('top') === 'one'){

                this.set('top', 'two');
            } else {

                this.set('top', 'one');
            }

            // listening in HomeView
            this.set('src', src);

            this.idx++;
            if (this.idx > this.get('img_bg').length - 1){
                this.idx = 0;
            }

        },

        onDOMResize : function(payload){

            this.set('window', payload.stats );

            this.trigger('dom:resize');
        }

    });

    return BackgroundStore;

});