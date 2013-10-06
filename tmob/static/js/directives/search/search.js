'use strict';
(function() {

angular.module('Topsy.directives.search', [
    'Topsy.services.config',
    'Topsy.services.api',
    'infinite-scroll',
])

.directive('searchForm', [
    '$location',
    'Topsy.services.config',
    'Topsy.services.api',
    function($location, $config, $api) {
        return {
            templateUrl: $config.static_url('/js/directives/search/search-form.html'),
            link: function($scope, element, attrs) {

                $scope.resultsBusy = true;
                $scope.config = $config;
                if (!$scope.searchType) { $scope.searchType = 'all'; }

                $scope.submit = function() {
                    var options = { q: $scope.searchInput };
                    if ($scope.searchType) { options.t = $scope.searchType; }
                    if ($scope.searchWindow) { options.w = $scope.searchWindow; }
                    if ($scope.lastOffset) { options.o = $scope.lastOffset; }
                    $location.path('/search').search(options);
                };
                $scope.addMoreItems = function() {
                    $scope.resultsBusy = true;
                    console.warn($scope.lastOffset);
                    var params = searchParams($scope)
                    $api.call('/search.js', params).then(function(data) {
                        $scope.results.list = $scope.results.list.concat(data.response.list);
                        $scope.lastOffset = data.response.offset + params.perpage;
                        $scope.resultsBusy = false;
                    });
                };

                if ($scope.searchInput) {
                    $api.call('/searchcount.js', searchParams($scope, { dynamic: 1})).then(function(data) {
                        $scope.resultsBusy = true;
                        $scope.counts = data.response;
                        if (!$scope.searchWindow) {
                            $scope.searchWindow = $scope.counts.auto;
                        }
                        $api.call('/search.js', searchParams($scope)).then(function(data) {
                            $scope.results = data.response;
                            $scope.lastOffset = data.response.last_offset;
                            $scope.resultsBusy = false;
                        });
                    });
                }
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

function searchParams($scope, moreParams) {
    var params = {};
    var scopeToParamsMap = {
        'searchInput': 'q',
        'searchWindow': 'window',
        'searchType': 'type',
        'lastOffset': 'offset',
        'searchLanguage': 'allow_lang',
        'searchSort': 'sort_method',
    };
    for (var i in scopeToParamsMap) {
        if ($scope.hasOwnProperty(i) && typeof $scope[i] !== 'undefined' && $scope[i] !== null) {
            params[scopeToParamsMap[i]] = $scope[i];
        }
    }
    for (var i in moreParams) {
        if (moreParams.hasOwnProperty(i)) {
            params[i] = moreParams[i];
            if (params[i] === null) { delete params[i]; }
        }
    }
    params.perpage = 20;
    if (params.offset) { 
        $scope.lastOffset = params.offset + params.perpage;
        params.offset = $scope.lastOffset;
        console.warn('lastOffset: ' + $scope.lastOffset);
    }
    return params;
}


})();

