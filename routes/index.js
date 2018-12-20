var express = require('express');
var Auth = require("../util/UserVerification");
var router = express.Router();
var Transcript = require('../models/transcript');

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
		data.home = true;
        Transcript.getAverageBySemester(req.user.userID, semester).then((average)=>
        {
			data.average = average.average;
			data.semester = semester;
            res.render('index', 
			{ 
				title: 'Home',
				data: data
			});
        }).catch((error) => 
        {
            console.log(error);
        });
    });
});

module.exports = router;
