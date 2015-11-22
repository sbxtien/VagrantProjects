(function() {

    var http = require('http'),
        bunyan = require('bunyan'),
        express = require('express');

    var app = express(),
        server = http.createServer(app);

    app.use(function(req, res, next) {
        req.log = bunyan.createLogger({
            name: "log",
            streams: [{
                level: 'info',
                stream: process.stdout
            }, {
                type: "raw",
                level: 'info',
                stream: require('bunyan-logstash').createStream({
                    host: 'ca-to-sc-elk-dev',
                    port: 9999
                })
            }]
        });
        //
        next();
    });

    server.listen(process.env.PORT || 3000);

    app.route('/')
        .get(function (req, res) {
            var timespan = Date.now();
            res.send('ok');
            req.log.info({ timespan: Date.now() - timespan });
        });

    app.use(function(req, res, next) {
        res.status(404).send('resource not found');
    });


})();
