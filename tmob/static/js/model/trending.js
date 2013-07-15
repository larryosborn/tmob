define(['backbone', 'config'], function(Backbone, config) {

    console.log('starting model/trending.js');

    var Model = Backbone.Model.extend({

        urlRoot: config.otterBaseUrl,

        url: function() {
            var params = [
                'apikey=' + config.apikey,
                this.get('type') !== 'all' ? 'type=' + this.get('type') : '',
                this.get('threshold') ? 'thresh=top' + this.get('threshold') : ''
            ].filter(function(i) { if (i) { return i; } }).join('&');
            return config.otterBaseUrl + '/top.js?' + params;
        },

        defaults: {
            type: 'all',
            threshold: '100',
            page: 1
        },

        shim: function(data) {
            this.get('response').list.forEach(function(i) {
                i.trackback_total = i.target.trackback_total;
            });
            return data;
        }

    });

    return Model;

});