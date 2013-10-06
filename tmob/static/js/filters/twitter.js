(function() {
'use strict';

// sample use {{ value | currency:'USD' }}
angular.module('Topsy.filters.twitter', [])
.filter('tweetId', function() {
    return function(url) {
        url = url.split('/');
        return url.length ? url.pop() : url;
    };
})

})();

