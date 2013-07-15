define([
    'backbone',
    'topsy-handlebars',
    'text!template/result/link.html',
    'text!template/result/tweet.html',
    'text!template/result/image.html',
    'text!template/result/video.html'
], function(
    Backbone,
    Handlebars,
    link_tpl,
    tweet_tpl,
    image_tpl,
    video_tpl
) {

    console.log('loading view/result.js');

    var View = Backbone.View.extend({

        tagName: 'div',
        className: 'result',
        template: {
            link: Handlebars.compile(link_tpl),
            tweet: Handlebars.compile(tweet_tpl),
            'retweet:native': Handlebars.compile(tweet_tpl),
            image: Handlebars.compile(image_tpl),
            video: Handlebars.compile(video_tpl)
        },

        events: {
            'click .trackback-link': 'trackback'
        },

        initialize: function(options) {
            var view = this;
            this.data = options.data;
            this.render();
            return this;
        },

        render: function() {
            //console.warn(this.data);
            this.$el.html(this.template[this.data.target.mytype](this.data));
            return this;
        },

        trackback: function(evt) {
            console.warn('trackback-link!');
            evt.preventDefault();
            var $el = $(evt.target);
            var url = $el.data('url');
            Backbone.history.navigate('/trackback/' + encodeURIComponent(url), { trigger: true });
        }

    });

    return View;

});