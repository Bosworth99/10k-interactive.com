// # HomeView

define(function (require) {
    'use strict';

    // @includes
    var Dispatcher  = require('dispatcher');
    var Marionette  = require('backbone.marionette');
    var $max        = require('tweenmax');
    //https://ihatetomatoes.net/wp-content/uploads/2015/08/GreenSock-Cheatsheet-2.pdf

    // @components
    var Template    = require('requireText!shared/background/template.html');
    var Store       = require('shared/background/store');

    // CLASS //////////////////////////////////////////////////////////////////
    var BackgroundView = Marionette.ItemView.extend({

        name : 'BackgroundView',

        template: _.template(Template),

        initialize : function(){
            //console.log('BackgroundView::initialize');

            this.model = new Store();

            this.addModelEvents();

            this.$el.attr('data-el', this.name + '_el');

        },

        onAttach : function(){

            this.$background = this.$el.find('.tki_background');

            this.$img1 = this.$background.find('[data-img="one"]');
            this.$img2 = this.$background.find('[data-img="two"]');
            this.$filter = this.$background.find('[data-img="filter"]');

            this.onChangeSrc();
            this.onChangeFilter();
        },

        onDestroy : function(){ },

        // MODEL EVENTS ///////////////////////////////////////////////////////
        modelEvents: {
            'change:src'    : 'onChangeSrc',
            'change:filter' : 'onChangeFilter',
            'dom:resize'    : 'onDOMResize'
        },

        onChangeSrc : function(){
            ///console.log('BackgroundView::onChangeSrc', this.model.get('src') );

            var _this   = this;
            var img1    = this.$img1;
            var img2    = this.$img2;
            var src     = this.model.get('src');
            var bgImage = String( 'url("' + src + '")');

            // make sure the image has loaded prior to rendering it
            var img     = new Image();
            img.onload  = function(){

                if (_this.model.get('top') === 'two'){
                    //img2.attr('src', src ).css({'z-index': 2, 'display' : 'none' }).fadeIn(1250);

                    img2[0].src = src;

                    $max.set(   [img2],      { opacity : 0.0 , 'z-index' : 2 });
                    $max.to(    [img2], 1,   { opacity : 1.0 });

                    $max.set(   [img1],      { 'z-index' : 1 });

                } else {
                    //img1.attr('src', src ).css({'z-index': 2, 'display' : 'none' }).fadeIn(1250);

                    img1[0].src = src;

                    $max.set(   [img1],      { opacity : 0.0 , 'z-index' : 2 });
                    $max.to(    [img1], 1,   { opacity : 1.0 });

                    $max.set(   [img2],      { 'z-index' : 1 });
                }

               Dispatcher.bus.trigger('request:window');

            };
            img.src     = src;

        },

        onChangeFilter : function(){

            var col     = this.model.get('filter');
            var filter  = this.$filter;

            var opc     = Math.random() - 0.4;
            opc = ( opc < 0.1 )? 0.1 : opc;
            opc = ( opc > 0.4 )? 0.4 : opc;

            $max.to( [filter], 9, { backgroundColor : col, opacity : opc });

            console.log('BackgroundView::onChangeFilter', this.model.get('filter'), opc );
        },

        onDOMResize : function(){
            //console.log('BackgroundView::onResize', this.model.get('window'), this.$img1[0].naturalHeight );

            var win     = this.model.get('window');
            var img1    = this.$img1;
            var img2    = this.$img2;

            // set the container dimensions. coulde probably just css this
            this.$el[0].style.height = win.height;
            this.$el[0].style.width  = win.width;

            // set the native resolution
            var nHeight = ( img1[0].naturalHeight > 0 ) ? img1[0].naturalHeight : 1520;  // try and get teh natural dimensions
            var nWidth  = ( img1[0].naturalWidth > 0 )  ? img1[0].naturalWidth  : 2688;    // try and get teh natural dimensions
            var ratio   = nWidth / nHeight;       // get the natural ratio, to size the image up and down

            // store a props object to hand to max
            var props   = {};

            // if the browser goes wider than the width,
            if ( ( win.height * ratio ) < win.width ){

                // then size to width and center vertically
                props   = {
                    height  : win.width / ratio,
                    width   : win.width,
                    left    : 0,
                    top     : (( ( win.width / ratio ) - win.height) / 2) * -1
                };

            } else {

                // size img to height, and center horizontally
                props   = {
                    height  : win.height,
                    width   : win.height * ratio,
                    left    : (( (win.height * ratio ) - win.width ) / 2 ) * -1,
                    top     : 0
                };

            }

            //now resize the image relative to the ratio, and determine its left / top props
            $max.set( [img1, img2], props );

            //console.log('%s::onDOMResize props:%o win:%o',this.name, props, win, nWidth, nHeight);
        },

        addModelEvents : function(){

            var _this = this;

            for (var evt in this.modelEvents){
                this.listenTo( this.model, evt,  this[ this.modelEvents[evt] ] );
            }
        },

        // UI EVENTS //////////////////////////////////////////////////////////
        events: { }

    });

    return BackgroundView;
});