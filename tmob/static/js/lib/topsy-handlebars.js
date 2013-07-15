define(['handlebars'], function(Handlebars) {

    function domain(url) {
        var re = /^https?:\/\/(.*?)\//;
        var domain;
        if (re.test(url)) {
            domain = url.match(re).pop();
        }
        return domain ? domain.replace(/^www\./,'') : '';
    }

    Handlebars.registerHelper('domain', domain);

    return Handlebars;
});