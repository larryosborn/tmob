define(['handlebars', 'moment'], function(Handlebars, moment) {

    function domain(url) {
        var re = /^https?:\/\/(.*?)\//;
        var d;
        if (re.test(url)) {
            d = url.match(re).pop();
        }
        return d ? d.replace(/^www\./,'') : '';
    }

    function tweet_id(url) {
        return url.split('/').pop();
    }
    function relative_date(date) {
        return moment(date * 1000).fromNow();
    }

    Handlebars.registerHelper('domain', domain);
    Handlebars.registerHelper('tweet_id', tweet_id);
    Handlebars.registerHelper('relative_date', relative_date);

    return Handlebars;
});