var express = require('express');

var app = express();

app.use(express.static(__dirname + '/'));

var server = app.listen(8000, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Express example listening on http://%s:%s", host, port);
    console.log("Host: '%s'", host);
    console.log("Port: '%s'", port);
});

app.get('/', function(req, res) {
    res.send("Hello from Express!");
});
