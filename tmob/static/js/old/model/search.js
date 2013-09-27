define(['backbone', 'config'], function(Backbone, config) {

    console.log('starting model/search.js');

    var Model = Backbone.Model.extend({

        urlRoot: config.otterBaseUrl,

        url: function() {
            var params = [
                'apikey=' + config.apikey,
                this.get('type') !== 'all' ? 'type=' + this.get('type') : '',
                this.get('q') ? 'q=' + this.get('q') : ''
            ].join('&');
            return config.otterBaseUrl + '/search.js?' + params;
        },

        defaults: {
            type: 'all',
            q: '',
            page: 1
        },

        shim: function(data) {
            this.get('response').list.forEach(function(i) {
                i.target = {
                    title: i.title,
                    url: i.url,
                    mytype: i.mytype,
                    medium_thumbnail: i.medium_thumbnail
                };
                i.author_url = i.trackback_author_url;
                i.author_nick = i.trackback_author_nick;
                i.author_name = i.trackback_author_name;
                i.author_img = i.topsy_author_img;
            });
            return data;
        }

    });

    return Model;

});