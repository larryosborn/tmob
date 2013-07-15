define(['backbone', 'config', 'handlebars', 'text!template/view/trending.html', 'view/result'], function(Backbone, config, Handlebars, trending_tpl, ResultView) {

    console.log('loading view/trending.js');

    var View = Backbone.View.extend({

        tagName: 'div',
        className: 'trending-view',
        el: this.$('#content'),
        template: Handlebars.compile(trending_tpl),

        events: {
            'change #trending-threshold': 'threshold',
            'change #trending-type': 'type',
            'click #home-button': 'home',
            'click .more-button': 'more'
        },

        initialize: function() {
            var view = this;
            console.warn(view);
            this.render();
            this.fetch();

            this.model.on({
                'change:type': function() { view.fetch(); },
                'change:threshold': function() { view.fetch(); },
                'change:page': function() { view.fetch(); }
            });
        },

        render: function() {
            this.$el.html(this.template({ config: config, model: this.model }));
            console.warn('running render');
            return this;
        },

        fetch: function() {
            var view = this;
            view.model.fetch({ dataType: 'jsonp', success: function(model, response, options) { view.results(model, response, options); } });
        },

        results: function(model, response, options) {
            var view = this;
            var html = [];
            view.model.shim();
            response.response.list.forEach(function(i) {
                view.$('#results').append(new ResultView({ data: i }).el);
            });
        },

        type: function(evt) {
            this.model.set('type', this.$(evt.target).val());
            this.$('#results').html('');
            Backbone.history.navigate('/top/' + this.model.get('threshold') + '/' + this.model.get('type'));
        },

        threshold: function(evt) {
            this.model.set('threshold', this.$(evt.target).val());
            this.$('#results').html('');
            Backbone.history.navigate('/top/' + this.model.get('threshold') + '/' + this.model.get('type'));
        },
        home: function(evt) {
            Backbone.history.navigate('/', { trigger: true });
            evt.preventDefault();
        },

        more: function(evt) {
            this.model.set('page', this.model.get('page') + 1);
            console.warn(this.model.get('page'));
        }

    });

    return View;

});