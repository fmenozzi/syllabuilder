var express = require('express');
var mongoose = require('mongoose');

/*
 * Mongoose
 */

// Connect to MongoDB database
mongoose.connect("mongodb://localhost/test");

// Open database
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {console.log("We're connected!");});

// Define Section schema
var sectionSchema = mongoose.Schema({
    title: String,
    sampleLanguage: [String],
});
var Section = mongoose.model('Section', sectionSchema);

// Delete database (so that we have a fresh copy every time we connect)
Section.remove({}, function(err) {
    console.log('collection removed');
});

// Make three sections
var section1 = new Section({title: "Course Name", sampleLanguage: ["Sample1", "Sample2"]});
var section2 = new Section({title: "Learning Objectives", sampleLanguage: ["Sample1", "Sample2"]});
var section3 = new Section({title: "Prerequisites", sampleLanguage: ["Sample1", "Sample2"]});

// DB insert callback
var saveCallback = function(err, section) {
    if (err) {
        return console.error(err);
    }
    console.log("Inserting " + section.title);
};

// Save sections to database
section1.save(saveCallback);
section2.save(saveCallback);
section3.save(saveCallback);

/*
 * Express
 */

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
    // Return JSON object with all sections from the database
    if (req.query.sections === "all") {
        Section.find(function(err, sections) {
            if (err) {
                res.status(404).json({});
            } else {
                // Construct JSON response that includes title
                // and sample language
                var allSections = [];
                for (var i = 0; i < sections.length; i++) {
                    allSections.push({
                        title: sections[i].title,
                        sampleLanguage: sections[i].sampleLanguage
                    });
                }
                res.status(200).json({
                    sections: allSections
                });
            }
        });
    } else {
        res.status(404).json({});
    }
});

