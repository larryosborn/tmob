(function() {
'use strict';

angular.module('Topsy.filters.dates', [])

.filter('dateFormat', function() {
    return function(dateString, format) {
        return moment(dateString).format(format);
    };
})

.filter('parseTimestamp', function() {
    return function(seconds) {
        return moment.unix(seconds);
    };
})

.filter('fromNow', function() {
    return function(date) {
        return moment(date).fromNow();
    };
});



})();
