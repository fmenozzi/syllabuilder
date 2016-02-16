var express = require('express');

var app = express();

app.use(express.static(__dirname + "/public"));

// Start server on localhost:8000
var server = app.listen(8000, 'localhost', function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Express example listening on http://%s:%s", host, port);
    console.log("Host: '%s'", host);
    console.log("Port: '%s'", port);
});

// Handle GET requests to /test
app.get('/test', function(req, res) {
    res.status(200).json({mydata: "Hello from Express!"});
});

