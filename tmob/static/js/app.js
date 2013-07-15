require.config({

    paths: {
        jquery: '/static/js/lib/jquery',
        underscore: '/static/js/lib/underscore-min',
        backbone: '/static/js/lib/backbone',
        handlebars: '/static/js/lib/handlebars',
        moment: '/static/js/lib/moment',
        accounting: '/static/js/lib/accounting'
    },

    shim: {

        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone',
            init: function() {
                var Backbone = this.Backbone;
                var _sync = Backbone.sync;
                Backbone.sync = function(method, model, options) {
                    options.beforeSend = function(xhr){
                        var token = $('meta[name="csrf-token"]').attr('content');
                        xhr.setRequestHeader('X-CSRFToken', token);
                    };
                    return _sync(method, model, options);
                };
                return Backbone;
            }
        },

        underscore: {
            exports: '_'
        }

    }

});

define(['router', 'backbone'], function(Router, Backbone) {

    console.log('starting app.js');

    var router = new Router();
    Backbone.history.start({ pushState: true });

});
