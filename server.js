#!/bin/env node
//  OpenShift sample Node application
var express  = require('express');
var fs       = require('fs');
var mongoose = require('mongoose');

var db_host = process.env.OPENSHIFT_MONGODB_DB_HOST;
var db_port = process.env.OPENSHIFT_MONGODB_DB_PORT;
var db_user = process.env.OPENSHIFT_MONGODB_DB_USERNAME;
var db_pass = process.env.OPENSHIFT_MONGODB_DB_PASSWORD;

var uri = 'mongodb://' + db_host + ':' + db_port + '/syllabuilder';
var options = {
    user: db_user,
    pass: db_pass,
};

var SyllabusSchema = new mongoose.Schema({
    "_id": String,
    "course-info": {
        "course-name": String,
        "course": {
            "dept-id": String,
            "course-num": Number,
            "section-num": Number
        },
        "term": String,
        "from-time": String,
        "to-time": String,
        "meeting-building": String,
        "meeting-room": String,
        "meetings": {
            "mo": Boolean,
            "tu": Boolean,
            "we": Boolean,
            "th": Boolean,
            "fr": Boolean
        },
        "website": String
    },
    "instructor-info": {
        "name": String,
        "email": String,
        "phone": String,
        "office-hours": String,
        "website": String
    },
    "description": String,
    "objectives": String,
    "audience": String,
    "prerequisites": String,
    "goals": String,
    "requirements": String,
    "policies": String,
    "resources": String,
    "materials": String,
    "grading": String,
    "exams": String,
    "honor-code": String,
    "accessibility": String,
    "disclaimer": String,
    "time-table": [{material: String, homework: String}]
});

mongoose.model('Syllabus', SyllabusSchema);

var Syllabus = mongoose.model('Syllabus');

mongoose.connect(uri, options);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function() {
    console.log("We're connected!");
});

/**
 *  Define the sample application.
 */
var SampleApp = function() {

    //  Scope.
    var self = this;


    /*  ================================================================  */
    /*  Helper functions.                                                 */
    /*  ================================================================  */

    /**
     *  Set up server IP address and port # using env variables/defaults.
     */
    self.setupVariables = function() {
        //  Set the environment variables we need.
        self.ipaddress = process.env.OPENSHIFT_NODEJS_IP;
        self.port      = process.env.OPENSHIFT_NODEJS_PORT || 8080;

        if (typeof self.ipaddress === "undefined") {
            //  Log errors on OpenShift but continue w/ 127.0.0.1 - this
            //  allows us to run/test the app locally.
            console.warn('No OPENSHIFT_NODEJS_IP var, using 127.0.0.1');
            self.ipaddress = "127.0.0.1";
        };
    };


    /**
     *  Populate the cache.
     */
    self.populateCache = function() {
        if (typeof self.zcache === "undefined") {
            self.zcache = { 'index.html': '' };
        }

        //  Local cache for static content.
        self.zcache['index.html'] = fs.readFileSync('./index.html');
    };


    /**
     *  Retrieve entry (content) from cache.
     *  @param {string} key  Key identifying content to retrieve from cache.
     */
    self.cache_get = function(key) { return self.zcache[key]; };


    /**
     *  terminator === the termination handler
     *  Terminate server on receipt of the specified signal.
     *  @param {string} sig  Signal to terminate on.
     */
    self.terminator = function(sig){
        if (typeof sig === "string") {
           console.log('%s: Received %s - terminating sample app ...',
                       Date(Date.now()), sig);
           process.exit(1);
        }
        console.log('%s: Node server stopped.', Date(Date.now()) );
    };


    /**
     *  Setup termination handlers (for exit and a list of signals).
     */
    self.setupTerminationHandlers = function(){
        //  Process on exit and signals.
        process.on('exit', function() { self.terminator(); });

        // Removed 'SIGPIPE' from the list - bugz 852598.
        ['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT',
         'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM'
        ].forEach(function(element, index, array) {
            process.on(element, function() { self.terminator(element); });
        });
    };


    /*  ================================================================  */
    /*  App server functions (main app logic here).                       */
    /*  ================================================================  */

    /**
     *  Create the routing table entries + handlers for the application.
     */
    self.createRoutes = function() {
        self.routes = { };

        self.routes['/asciimo'] = function(req, res) {
            var link = "http://i.imgur.com/kmbjB.png";
            res.send("<html><body><img src='" + link + "'></body></html>");
        };

        self.routes['/'] = function(req, res) {
            res.setHeader('Content-Type', 'text/html');
            res.send(self.cache_get('index.html') );
        };

        self.routes['/test'] = function(req, res) {
            res.status(200).json({message: "Hello, World!"});
        }

        self.routes['/save'] = function(req, res) {
            // req.query is JSON object
            var hello = req.query.hello;
            var foo   = req.query.foo;

            if (hello === "world" && foo === "bar")
                res.status(200).json({message: "All good!"});
            else
                res.status(404).json({});
        }

        self.routes['/load'] = function(req, res) {

        }
    };


    /**
     *  Initialize the server (express) and create the routes and register
     *  the handlers.
     */
    self.initializeServer = function() {
        self.createRoutes();
        self.app = express.createServer();

        //  Add handlers for the app (from the routes).
        for (var r in self.routes) {
            self.app.get(r, self.routes[r]);
        }

        self.app.get('/syllabi', function(req, res, next) {
            Syllabus.find(function(err, syllabi) {
                if(err) return next(err);
                
                res.json(syllabi);
            });
        });

        self.app.post('/syllabi', function(req, res, next) {
            var syllabus = new Syllabus(req.body);
            
            syllabus.save(function(err, syllabus) {
                if(err) return next(err);

                res.json(syllabus);
            });
        });

        self.app.param('syllabus', function(req, res, next, id) {
            var query = Syllabus.findbyId(id);
            
            query.exec(function (err, post) {
                if (err) return next(err);
                if (!post) return next(new Error('syllabus not found'));
                
                req.post = post;
                return next();
            });
        });

        self.app.get('/syllabi/:syllabus', function(req, res) {
            res.json(req.post);
        });

        self.app.use(express.static('public'));
    };


    /**
     *  Initializes the sample application.
     */
    self.initialize = function() {
        self.setupVariables();
        self.populateCache();
        self.setupTerminationHandlers();

        // Create the express server and routes.
        self.initializeServer();
    };


    /**
     *  Start the server (starts up the sample application).
     */
    self.start = function() {
        //  Start the app on the specific interface (and port).
        self.app.listen(self.port, self.ipaddress, function() {
            console.log('%s: Node server started on %s:%d ...',
                        Date(Date.now() ), self.ipaddress, self.port);
        });
    };

};   /*  Sample Application.  */



/**
 *  main():  Main code.
 */
var zapp = new SampleApp();
zapp.initialize();
zapp.start();

