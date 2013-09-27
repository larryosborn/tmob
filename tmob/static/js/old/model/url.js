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
            var response = this.get('response');
            response.target = {
                mytype: response.mytype,
                title: response.title,
                url: response.url
            };
            if (response.mytype === 'tweet') {
                response.author_img = response.author.image_url;
                response.author_name = response.author.name;
                response.author_nick = response.author.nick;
                response.author_url = response.author.url;
            }
            else if (response.mytype === 'image') {
                response.target.medium_thumbnail = response.medium_thumbnail;
            }
            this.set('response', response);
            //console.warn(response);
        }

    });

    return Model;

});