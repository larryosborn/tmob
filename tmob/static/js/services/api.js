(function() {
'use strict';

angular.module('Topsy.services.api', ['Topsy.services.config'])
.factory('Topsy.services.api', [
    '$http',
    '$q',
    'Topsy.services.config',
    function($http, $q, $config) {
        return {
            call: function(endpoint, options) {
                var deferred = $q.defer();
                options = angular.extend({}, options, { apikey: $config.apikey, callback: 'JSON_CALLBACK' });
                $http.jsonp($config.reporting_server + endpoint, { params: options })
                .success(function(data) {
                    deferred.resolve(data);
                })
                .error(function() {
                    deferred.reject('An error occured while fetching results');
                });
                return deferred.promise;
            }
        };
    }
]);

})();
