angular.module('Topsy.services.config', [])
.factory('Topsy.services.config', function() {
    var config = window.config;
    config.resultTypes = ['all', 'link', 'tweet', 'photo', 'video'];
    config.static_url = function(str) {
        return config.base_url + str;
    };
    return config;
});
