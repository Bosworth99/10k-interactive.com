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
    //Abstract.prototype.unsubscribe      = Dispatcher.bus.off;

    //Abstract.prototype.listenTo         = Dispatcher.bus.listenTo;
    //Abstract.prototype.stopListening    = Dispatcher.bus.stopListening;
    Abstract.prototype.Backbone         = Backbone;
    Abstract.prototype.Model            = Backbone.Model;
    Abstract.prototype.View             = Backbone.View;

    Abstract.prototype.Marionette       = Marionette;
    Abstract.prototype.App              = Marionette.Application;
    Abstract.prototype.ItemView         = Marionette.ItemView;

    //Abstract.prototype.Extend           = _.extend;

    var instance              = new Abstract();

    /*instance.publish          = function(options){
        console.log('instance.publish %o', options);

        Dispatcher.dispatch.call(this, options);
    };

    instance.subscribe        = function(action, callback){
        Dispatcher.subscribe.call(this, action, callback);
    };*/

    instance.unsubscribe      = function(options){
        Dispatcher.bus.off.call(this, options);
    };

    instance.listenTo         = Dispatcher.bus.listenTo;
    instance.stopListening    = Dispatcher.bus.stopListening;

    instance.extend           = _.extend;

    console.log('Abstract instance:%o', instance );

    return instance;

});