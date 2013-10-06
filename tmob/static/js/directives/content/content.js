(function() {
'use strict';

angular.module('Topsy.directives.content', [
    'Topsy.services.config', 
    'Topsy.services.api',
    'Topsy.filters.numbers',
    'Topsy.filters.dates',
    'Topsy.filters.twitter',
])

.directive('tweetContent', [
    '$location',
    'Topsy.services.config',
    'Topsy.services.api',
    function($location, $config, $api) {
        return {
            templateUrl: $config.static_url('/js/directives/content/tweet.html'),
            link: function($scope, element, attrs) {
            }
        };
    }
])

})();

