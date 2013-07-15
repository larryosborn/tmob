define(['backbone', 'config', 'handlebars', 'text!template/view/search.html', 'view/result'], function(Backbone, config, Handlebars, search_tpl, ResultView) {

    console.log('loading view/search.js');

    var View = Backbone.View.extend({

        tagName: 'div',
        className: 'search-view',
        el: this.$('#content'),
        template: Handlebars.compile(search_tpl),

        events: {
            'change #search-input': 'q',
            'change #search-type': 'type',
            'click #home-button': 'home',
            'click .more-button': 'more'
        },

        initialize: function() {
            var view = this;
            this.fetch();
            this.render();

            this.model.on({
                'change:type': function() { view.fetch(); },
                'change:q': function() { view.fetch(); },
                'change:page': function() { view.fetch(); }
            });
        },

        render: function() {
            this.$el.html(this.template({ config: config, model: this.model }));
            return this;
        },

        fetch: function() {
            var view = this;
            view.model.fetch({ dataType: 'jsonp', success: function(model, response, options) { view.results(model, response, options); }, });
        },

        results: function(model, response, options) {
            var view = this;
            view.model.shim();
            response.response.list.forEach(function(i, idx) {
                view.$('#results').append(new ResultView({ data: i }).el);
            });
        },

        type: function(evt) {
            this.model.set('type', this.$(evt.target).val());
            this.$('#results').html('');
            Backbone.history.navigate('/search/' + this.model.get('q') + '/' + this.model.get('type'));
        },

        q: function(evt) {
            this.model.set('q', this.$(evt.target).val());
            this.$('#results').html('');
            Backbone.history.navigate('/search/' + this.model.get('q') + '/' + this.model.get('type'));
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