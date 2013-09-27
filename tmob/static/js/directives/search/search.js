'use strict';
(function() {

angular.module('Topsy.directives.search', ['Topsy.services.config', 'Topsy.services.api'])

.directive('searchForm', [
    '$location',
    'Topsy.services.config',
    'Topsy.services.api',
    function($location, $config, $api) {
        return {
            templateUrl: $config.static_url('/js/directives/search/search-form.html'),
            link: function($scope, element, attrs) {

                $scope.config = $config;
                if (!$scope.searchType) { $scope.searchType = 'all'; }

                $scope.submit = function() {
                    var options = { q: $scope.searchInput, t: $scope.searchType };
                    if ($scope.searchType) { options.t = $scope.searchType; }
                    if ($scope.searchWindow) { options.w = $scope.searchWindow; }
                    $location.path('/search').search(options);
                };

                var options = { q: $scope.searchInput, type: $scope.searchType, dynamic: 1 };
                if ($scope.searchWindow) { options.window = $scope.searchWindow; }
                $api.call('/searchcount.js', options).then(function(data) {
                    $scope.counts = data.response;
                    console.warn($scope.counts);
                    if (!$scope.searchWindow) {
                        $scope.searchWindow = $scope.counts.auto;
                    }
                    $api.call('/search.js', angular.extend({}, options, { window: $scope.searchWindow })).then(function(data) {
                        $scope.results = data.response;
                        console.warn($scope.results);
                    });
                });

            }
        };
    }
])

.directive('searchResults', [
    '$location',
    'Topsy.services.config',
    'Topsy.services.api',
    function($location, $config, $api) {
        return {
            templateUrl: $config.static_url('/js/directives/search/search-results.html'),
            link: function($scope, element, attrs) {
            }
        };
    }
]);

})();

