var express = require('express');
var Auth = require("../util/UserVerification");
var router = express.Router();
var Transcript = require('../models/transcript');
var Courses = require('../models/courses');

router.get('/', Auth.ensureAuthenticated, function(req, res) 
{
	var currentDate = Date();
	var month = new Date(currentDate).getMonth() + 1;
	var year = new Date(currentDate).getFullYear();
	var semester;
	
	if (month >= 1 && month <=4)
	{
		semester = year + "_WINTER";
	}
	else if (month >= 5 && month <= 9)
	{
		semester = year + "_SUMMER";
	}
	else
	{
		semester = year + "_FALL";
	}

	Transcript.getTranscriptBySemester(req.user.userID, semester).then((data)=>
    {
		data.timetable = true;
        Transcript.getAverageBySemester(req.user.userID, semester).then((average)=>
        {
			data.average = average.average;
			data.semester = semester;
			Courses.getSemesters(req.user.userID).then((semesters)=>
			{
				res.render('timetable', 
				{ 
					title: 'My Timetable',
					data: data,
					semesters: semesters
				});
			}).catch((error) => 
			{
				console.log(error);
			});
		});
    });
});

router.get('/:semester', Auth.ensureAuthenticated, function(req, res) 
{
	Transcript.getTranscriptBySemester(req.user.userID, req.params.semester).then((data)=>
    {
		data.timetable = true;
        Transcript.getAverageBySemester(req.user.userID, req.params.semester).then((average)=>
        {
			data.average = average.average;
			data.semester = req.params.semester;
			Courses.getSemesters(req.user.userID).then((semesters)=>
			{
				res.render('timetable', 
				{ 
					title: 'My Timetable',
					data: data,
					semesters: semesters
				});
			}).catch((error) => 
			{
				console.log(error);
			});
		});
    });
});

module.exports = router;
