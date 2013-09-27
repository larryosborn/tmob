define(['backbone','jquery'], function(Backbone, $) {

    console.log('starting router.js');


    function context() {
        return $('#content').unbind().empty();
    }

    var Router = Backbone.Router.extend({

        routes: {
            '': 'home',
            'search/:query': 'search',
            'search/:query/:type': 'search',
            'tb/:url': 'trackback',
            'trackback/*url': 'trackback',
            'trackback': 'trackback',
            'top/:threshold': 'trending',
            'top/:threshold/:type': 'trending',
            'top/:threshold/:type/:language': 'trending'
        },

        home: function() {
            require(['view/home'], function(HomeView) {
                var view = new HomeView({ el: context() });
            });
        },

        search: function(query, type) {
            require(['view/search', 'model/search'], function(SearchView, Search) {
                var search = new Search({ q: query, type: type });
                var view = new SearchView({ model: search, el: context() });
            });
        },

        trackback: function(url) {
            var router = this;
            require(['view/trackback', 'model/trackback'], function(TrackbackView, Trackback) {
                var trackback = new Trackback({ url: url });
                var view = new TrackbackView({ model: trackback, el: context() });
            });
        },

        trending: function(threshold, type, language) {
            var router = this;
            require(['view/trending', 'model/trending'], function(TrendingView, Trending) {
                var trending = new Trending({ threshold: threshold, type: type, language: language });
                var view = new TrendingView({ model: trending, el: context() });
            });
        }

    });

    return Router;

});