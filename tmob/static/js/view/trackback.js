define(['backbone', 'config', 'handlebars', 'text!template/view/trackback.html', 'view/result', 'model/url'], function(Backbone, config, Handlebars, trackback_tpl, ResultView, Url) {

    console.log('loading view/trackback.js');

    var View = Backbone.View.extend({

        tagName: 'div',
        className: 'trackback-view',
        el: this.$('#content'),
        template: Handlebars.compile(trackback_tpl),

        events: {
            'click .more-button': 'more'
        },

        initialize: function() {
            var view = this;
            console.warn(view);
            this.render();
            this.fetch();

            this.model.on({
                'change:page': function() { view.fetch(); }
            });
        },

        render: function() {
            this.$el.html(this.template({ config: config, model: this.model }));
            return this;
        },

        fetch: function() {
            var view = this;
            var url = new Url({ url: view.model.get('url') });
            url.fetch({ dataType: 'jsonp', success: function(model, response, options) { view.url(model, response, options); } });
            view.model.fetch({ dataType: 'jsonp', success: function(model, response, options) { view.results(model, response, options); } });
        },

        url: function(model, response, options) {
            var view = this;
            console.warn(response.response);
            response.response.target = {
                mytype: response.response.mytype,
                title: response.response.title,
                url: response.response.url
            };
            view.$('#url').html(new ResultView({ data: response.response }).el);
        },

        results: function(model, response, options) {
            var view = this;
            view.model.shim();
            response.response.list.forEach(function(i) {
                view.$('#results').append(new ResultView({ data: i }).el);
            });
        },

        more: function(evt) {
            this.model.set('page', this.model.get('page') + 1);
            console.warn(this.model.get('page'));
        }

    });

    return View;

});