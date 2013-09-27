define(['backbone', 'handlebars', 'text!template/view/home.html'], function(Backbone, Handlebars, home_tpl) {

    console.log('loading view/home.js');

    var View = Backbone.View.extend({

        tagName: 'div',
        className: 'home-view',
        //el: this.$('#content'),
        template: Handlebars.compile(home_tpl),

        events: {
            'click #trending-button': 'trending',
            'submit #search-form': 'search'
        },

        initialize: function() {
            //this.listenTo(this.model, 'change', this.render);
            this.render();
        },

        render: function() {
            this.$el.html(this.template());
            return this;
        },

        trending: function(evt) {
            evt.preventDefault();
            Backbone.history.navigate('/top/100', { trigger: true });
        },

        search: function(evt) {
            evt.preventDefault();
            var query = this.$('#search-input').val();
            Backbone.history.navigate('/search/' + encodeURIComponent(query), { trigger: true });
        }

    });

    return View;

});