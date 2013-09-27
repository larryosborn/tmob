angular.module('Topsy', [
    'Topsy.controllers.search',
    'Topsy.controllers.trackback',
    'Topsy.controllers.trending'
])
.config([
    '$routeProvider',
    '$locationProvider',
    function($routeProvider, $locationProvider) {
        var $config = { base_url: function base_url(str) { return window.config.base_url.replace(/\/$/,'') + str; } };
        $locationProvider.html5Mode(true);
        $routeProvider
        .when('/', { templateUrl: $config.base_url('/partials/search-home.html'), controller: 'Topsy.controllers.search' })
        .when('/search', { templateUrl: $config.base_url('/partials/search-results.html'), controller: 'Topsy.controllers.search' })
        .when('/trackback', { templateUrl: $config.base_url('/partials/trackback.html'), controller: 'Topsy.controllers.trackback' })
        .when('/trending', { templateUrl: $config.base_url('/partials/trending.html'), controller: 'Topsy.controllers.trending' })
        .otherwise({ redirectTo: '/' });
    }
]);