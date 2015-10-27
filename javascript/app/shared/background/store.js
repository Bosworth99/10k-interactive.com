// # BackgroundStore

define(function (require) {
    'use strict';

    var Abstract        = require('abstract');
    var Backbone        = require('backbone');
    var Dispatcher      = require('dispatcher');

    // CLASS //////////////////////////////////////////////////////////////////
    var BackgroundStore =  Abstract.Model.extend({

        name : 'BackgroundStore',

        initialize: function () {
            console.log('%s::initialize ', this.name, this );

            this.set('init', true);

            this.set('filter', '#F10808' );
            this.fltIdx = 0;

            this.set('src', '/images/bg/desktop.v3.jpg' );
            this.set('top', 'one');
            this.srcIdx = 0;

            this.addEventHandlers();

            this.setBGTimer();
            this.setFilterTimer();
        },

        activate : function(){},

        dectivate : function(){},

        defaults : {

            img_bg : [
                { src : '/images/bg/desktop.v1.jpg' },
                { src : '/images/bg/desktop.v2.jpg' },
                { src : '/images/bg/desktop.v3.jpg' },
                { src : '/images/bg/desktop.v2.jpg' }
            ],

            filter_color : [
                { color : '#F10808' },
                { color : '#08DEF1' },
                { color : '#37E950' },
                { color : '#3D3AD4' },
                { color : '#EE8E11' }
            ]
        },

        // DISPATCHER EVENTS //////////////////////////////////////////////////
        addEventHandlers : function(){

            var _this = this;

            Dispatcher.bus.on('dom:resize', function(args){ _this.onDOMResize(args); });
            //this.subscribe('dom:resize', function(args){ _this.onDOMResize(args); });
        },


        setFilterTimer : function(){

            if (this.filterTimer){
                window.clearInterval(this.filterTimer);
            }

            var _this = this;
            this.filterTimer = window.setInterval( function(){

                _this.updateFilter();

            }, 10000);
        },

        updateFilter : function(){

            var color   = this.get('filter_color')[this.fltIdx].color;

            // listening in HomeView
            this.set('filter', color);

            this.fltIdx++;
            if (this.fltIdx > this.get('filter_color').length - 1){
                this.fltIdx = 0;
            }

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

            var src   = this.get('img_bg')[this.srcIdx].src;

            if (this.get('top') === 'one'){

                this.set('top', 'two');
            } else {

                this.set('top', 'one');
            }

            // listening in HomeView
            this.set('src', src);

            this.srcIdx++;
            if (this.srcIdx > this.get('img_bg').length - 1){
                this.srcIdx = 0;
            }

        },

        onDOMResize : function(payload){

            this.set('window', payload.stats );

            this.trigger('dom:resize');
        }

    });

    return BackgroundStore;

});