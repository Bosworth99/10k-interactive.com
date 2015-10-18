// # HomeView

define(function (require) {
    'use strict';

    // @includes
    var Dispatcher  = require('dispatcher');
    var Marionette  = require('backbone.marionette');
    var TweenMax    = require('tweenmax');

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

            this.onChangeSrc();
        },

        onDestroy : function(){ },

        // MODEL EVENTS ///////////////////////////////////////////////////////
        modelEvents: {
            'change:src' : 'onChangeSrc',
            'dom:resize' : 'onDOMResize'
        },

        onChangeSrc : function(){
            //console.log('BackgroundView::onChangeSrc', this.model.get('src') );

            var _this   = this;
            var src     = this.model.get('src');
            var bgImage = String( 'url("' + src + '")');

            // make sure the image has loaded prior to rendering it
            var img     = new Image();
            img.onload  = function(){

                if (_this.model.get('top') === 'two'){

                    _this.$img2.attr('src', src ).css({'z-index': 2, 'display' : 'none' }).fadeIn(1250);
                    _this.$img1.css({'z-index' : 1});

                } else {

                    _this.$img1.attr('src', src ).css({'z-index': 2, 'display' : 'none' }).fadeIn(1250);
                    _this.$img2.css({'z-index' : 1 });
                }

                _this.onDOMResize();
            };
            img.src     = src;

        },

        onDOMResize : function(){
            //console.log('BackgroundView::onResize', this.model.get('stats') );

            var win = this.model.get('window');

            this.$el[0].style.height = win.height;
            this.$el[0].style.width  = win.width;

            // set the native resolution
            var nWidth      = this.$img1[0].naturalWidth;    // try and get teh natural dimensions
            var nHeight     = this.$img1[0].naturalHeight;  // try and get teh natural dimensions

            var ratio       = nWidth / nHeight;

            var height, width, top, left;

            height = win.height;
            width  = win.height * ratio;
            left   = ((width - win.width ) / 2 ) * -1;
            top    = 0;

            // ensure the img fills teh browser
            if (width < win.width){

                height = win.width / ratio;
                width  = win.width;
                left   = 0;
                top    = ((height - win.height) / 2) * -1;
            }

            //now resize the image relative to the ratio, and determine its left / top props
            this.$img1.attr('width', width).attr('height', height).css({ left : left + 'px', top : top + 'px'});
            this.$img2.attr('width', width).attr('height', height).css({ left : left + 'px', top : top + 'px'});

            //console.log('%s::onDOMResize height:%s width:%s, left:%s, top:%s',this.name, height, width, left, top);
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