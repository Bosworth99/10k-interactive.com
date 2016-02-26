// # Abstract

define(function (require) {
    'use strict';

    var $               = require('jquery');
    var _               = require('underscore');
    var Backbone        = require('backbone');
    var Marionette      = require('backbone.marionette');
    var Dispatcher      = require('dispatcher');
    var Config          = require('config');
    var Utility         = require('utility');

    // CLASS //////////////////////////////////////////////////////////////////
    var Abstract        = new Function();

    Abstract.prototype.Config           = Config;
    Abstract.prototype.Utility          = Utility;

    Abstract.prototype.Dispatcher       = Dispatcher;
    Abstract.prototype.publish          = function(payload ){
        //console.log('Abstract.publish %o', payload );

        Dispatcher.dispatch.call(this, payload );
    };

    Abstract.prototype.subscribe        = function(action, callback){
        //console.log('Abstract.subscribe %o', payload );

        Dispatcher.subscribe.call(this, action, callback);
    };

    Abstract.prototype.unsubscribe      = function(options){
        //console.log('Abstract.unsubscribe %o', options );

        Dispatcher.bus.off.call(this, options);
    };

    //Abstract.prototype.listenTo         = Dispatcher.bus.listenTo;
    //Abstract.prototype.stopListening    = Dispatcher.bus.stopListening;

    var obj = {bar:'foo'};

    Abstract.prototype.Backbone         = _.extend(Backbone, obj);
    Abstract.prototype.Store            = _.extend(Backbone.Model, obj);
    Abstract.prototype.Model            = _.extend(Backbone.Model, obj);
    Abstract.prototype.View             = _.extend(Backbone.View, obj);

    Abstract.prototype.Marionette       = Marionette;
    Abstract.prototype.App              = Marionette.Application;
    Abstract.prototype.ItemView         = Marionette.ItemView;

    Abstract.prototype.extend           = function(options){
        _.extend.apply(this, [options]);
    };

    //console.log('Abstract :%o', new Abstract() );

    return new Abstract();
});
