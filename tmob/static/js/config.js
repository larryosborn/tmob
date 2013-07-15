define(function(require, exports, module) {

    return {
        apikey: 'F2BDD4FAF9D4465C82AD3A7AD270A0F7',
        otterBaseUrl: 'http://otter.topsy.com',
        //otterBaseUrl: '/api',
        types: [
            { name: 'Everything', value: 'all' },
            { name: 'Links', value: 'link' },
            { name: 'Tweet', value: 'tweet' },
            { name: 'Photos', value: 'image' },
            { name: 'Videos', value: 'video' }
        ],
        thresholds: [
            { name: 'Top 100', value: '100' },
            { name: 'Top 1,000', value: '1k' },
            { name: 'Top 5,000', value: '5k' },
            { name: 'Top 20,000', value: '20k' }
        ]
    };

    //return module.config();

});