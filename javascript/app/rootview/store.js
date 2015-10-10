// # RootViewStore
//  - this is the rootView Store, responsible for maintaining the state of the app
//  - we're using marionette regianView behaviors to manage the view lifecycle

define(function (require) {
    'use strict';

    var Dispatcher      = require('dispatcher');
    var RootViewView    = require('rootview/view');

    // CLASS //////////////////////////////////////////////////////////////////

    var RootViewStore =  Backbone.Model.extend({

        name : 'RootViewStore',

        initialize: function () {

            // maybe push this to app.js
            this.view = new RootViewView({model:this});

            this.trigger('render:init');
        }

    });

    return new RootViewStore();

});