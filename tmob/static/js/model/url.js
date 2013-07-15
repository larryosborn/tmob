define(['backbone', 'config'], function(Backbone, config) {

    console.log('starting model/url.js');

    var Model = Backbone.Model.extend({

        urlRoot: config.otterBaseUrl,

        url: function() {
            var params = [
                'apikey=' + config.apikey,
                'url=' + this.get('url')
            ].filter(function(i) { if (i) { return i; } }).join('&');
            return config.otterBaseUrl + '/urlinfo.js?' + params;
        },

        defaults: {
            url: ''
        },

        shim: function(data) {
        }

    });

    return Model;

});