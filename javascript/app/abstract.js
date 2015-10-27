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
    var Abstract = new Function();

    /*Abstract.prototype.Config           = Config;
    Abstract.prototype.Utility          = Utility;

    Abstract.prototype.Dispatcher       = Dispatcher;
    Abstract.prototype.publish          = Dispatcher.dispatch;
    Abstract.prototype.subscribe        = Dispatcher.bus.on;
    Abstract.prototype.unsubscribe      = Dispatcher.bus.off;
    //Abstract.prototype.waitFor        = Dispatcher.waitFor;

    Abstract.prototype.listenTo         = Dispatcher.bus.listenTo;
    Abstract.prototype.stopListening    = Dispatcher.bus.stopListening;
    Abstract.prototype.Backbone         = Backbone;
    Abstract.prototype.Model            = Backbone.Model;
    Abstract.prototype.View             = Backbone.View;

    Abstract.prototype.Marionette       = Marionette;
    Abstract.prototype.App              = Marionette.Application;
    Abstract.prototype.ItemView         = Marionette.ItemView;

    Abstract.prototype.Extend           = _.extend;

    var instance = new Abstract();
    console.log('Abstract instance:%o', instance );

    return instance;*/

    var instance = new Abstract();

    instance.Config           = Config;
    instance.Utility          = Utility;

    instance.Dispatcher       = Dispatcher;
    instance.publish          = Dispatcher.dispatch;
    instance.subscribe        = Dispatcher.bus.on;
    instance.unsubscribe      = Dispatcher.bus.off;
    //instance.waitFor        = Dispatcher.waitFor;

    instance.listenTo         = Dispatcher.bus.listenTo;
    instance.stopListening    = Dispatcher.bus.stopListening;
    instance.Backbone         = Backbone;
    instance.Model            = Backbone.Model;
    instance.View             = Backbone.View;

    instance.Marionette       = Marionette;
    instance.App              = Marionette.Application;
    instance.ItemView         = Marionette.ItemView;

    instance.Extend           = _.extend;


    console.log('Abstract instance:%o', instance );

    return instance;

}); 