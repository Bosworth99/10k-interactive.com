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
            console.log('BackgroundView::initialize');

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
            'change:stats' : 'onResize'
        },

        onChangeSrc : function(){
            //console.log('BackgroundView::onChangeSrc', this.model.get('src') );

            var bgImage = String( 'url("' + this.model.get('src') + '")');

            if (this.model.get('top') === 'two'){

                this.$img2.attr('src', this.model.get('src') ).css({'z-index': 2}).hide().fadeIn(750);
                this.$img1.css({'z-index' : 1});

            } else {

                this.$img1.attr('src', this.model.get('src') ).css({'z-index': 2}).hide().fadeIn(750);
                this.$img2.css({'z-index' : 1 });
            }

        },

        onResize : function(){
            //console.log('BackgroundView::onResize', this.model.get('stats') );

            var win = this.model.get('stats');

            this.$el.css({
                height  : win.height,
                width   : win.width
            });

            var _width      = 2688;
            var _height     = 1520;
            var ratio       = _width / _height;

            var height, width, top, left;

            height = win.height;
            width  = win.height * ratio;
            left   = ((width - win.width ) / 2 ) * -1;
            top    = 0;

            // ensure the img fills teh browser
            if (width < win.width){

                height = win.width * ratio;
                width  = win.width;
                left   = 0;
                top    = ((height - win.height) / 2) * -1;
            }

            //now resize the image relative to the ratio
            this.$img1.attr('width', width).attr('height', height).css({ left : left + 'px'});
            this.$img2.attr('width', width).attr('height', height).css({ left : left + 'px'});

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