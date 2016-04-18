var mongoose = require('mongoose');

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
	