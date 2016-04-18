var mongoose = require('mongoose');
var Syllabus = mongoose.model('Syllabus');

router.get('/syllabi', function(req, res, next) {
	Syllabus.find(function(err, syllabi) {
		if(err) return next(err);
		
		res.json(syllabi);
	});
});

router.post('/syllabi', function(req, res, next) {
	var syllabus = new Syllabus(req.body);
	
	syllabus.save(function(err, syllabus) {
		if(err) return next(err);

		res.json(syllabus);
	});
});

router.param('syllabus', function(req, res, next, id) {
	var query = Syllabus.findbyId(id);
	
	query.exec(function (err, post) {
		if (err) return next(err);
		if (!post) return next(new Error('syllabus not found'));
		
		req.post = post;
		return next();
	});
});

router.get('/ayllabi/:syllabus', function(req, res) {
	res.json(req.post);
});