angular.module('Topsy.controllers.search', [
    'Topsy.services.config',
    'Topsy.services.api',
    'Topsy.directives.search',
    'Topsy.directives.content'
])
.controller('Topsy.controllers.search', [
    '$scope',
    '$location',
    '$routeParams',
    'Topsy.services.config',
    'Topsy.services.api',
    function($scope, $location, $routeParams, $config, $api) {
        var routeToScopeMap = { q: 'searchInput', t: 'searchType', w: 'searchWindow', o: 'lastOffset' };
        for (var i in routeToScopeMap) {
            if ($routeParams[i]) { $scope[routeToScopeMap[i]] = $routeParams[i]; }
        }
    }
]);
