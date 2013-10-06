(function() {
'use strict';

// sample use {{ value | currency:'USD' }}
angular.module('Topsy.filters.numbers', [])
.filter('currency', function() {
    return function(number, currencyCode) {
        var currency = {
            USD: '$',
            GBP: '£',
            AUD: '$',
            EUR: '€',
            CAD: '$',
            MIXED: '~'
        },
        thousand,
        decimal,
        format = {
            pos : "%s%v",
            neg : "-%s%v",
            zero: "%s%v"
        };
        if ($.inArray(currencyCode, ['USD', 'AUD', 'CAD', 'MIXED']) >= 0) {
            thousand = ',';
            decimal = '.';
        }
        else {
            thousand = '.';
            decimal = ',';
        };
        return accounting.formatMoney(number, currency[currencyCode], 2, thousand, decimal, format);
    };
})
.filter('number', function() {
    return function(number) {
        return accounting.formatNumber(number)
    };
});

})();

