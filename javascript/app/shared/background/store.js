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

            this.set('src',   '/images/bg/desktop.v3.jpg' );

            this.addEventHandlers();
        },

        activate : function(){

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
        },

        setBGTimer : function(){

            if (this.srcTimer){
                window.clearInterval((this.srcTimer));
            }

            var _this = this;
            this.srcTimer = window.setInterval( function(){

                var list   = _this.get('img_bg');
                var src = _.shuffle( list )[0].src;

                // listening in HomeView
                _this.set('src', src);

            }, 10000);

        },

    });

    return BackgroundStore;

});