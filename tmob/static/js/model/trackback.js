define(['backbone', 'config'], function(Backbone, config) {

    console.log('starting model/trackback.js');

    var Model = Backbone.Model.extend({

        urlRoot: config.otterBaseUrl,

        url: function() {
            var params = [
                'apikey=' + config.apikey,
                'url=' + this.get('url')
            ].filter(function(i) { if (i) { return i; } }).join('&');
            return config.otterBaseUrl + '/trackbacks.js?' + params;
        },

        defaults: {
            url: '',
            page: 1
        },

        shim: function(data) {
            this.get('response').list.forEach(function(i) {
                i.target = {
                    url: i.permalink_url,
                    title: i.content,
                    mytype: 'tweet'
                };
                i.author_nick = i.author.nick;
                i.author_url = i.author.url;
                i.author_name = i.author.name;
                i.author_img = i.author.photo_url;
            });
            return data;
        }

    });

    return Model;

});