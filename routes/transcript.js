var express = require('express');
var mysql = require('mysql');
var Auth = require("../util/UserVerification");
var Transcript = require('../models/transcript');
var router = express.Router();

router.get('/', Auth.ensureAuthenticated, function(req, res) 
{
    Transcript.getTranscript(req.user.userID).then((data)=>
    {
        data.transcript = true;
        data.forEach(function(semester, i)
        {
            var average = 0;
            var divisor = 0;
            semester.courses.forEach(function(course, k)
            {
                if (course.grade != null) 
                {
                    average += course.grade;
                    divisor++;
                }
            });
            semester.average = (average / divisor).toFixed(2);
            data.semesters = i + 1; 
        });
        res.render('transcript', 
        {
                title: 'My Transcript - myCourses',
                data: data
        });
    }).catch((error) => 
    {
        console.log(error);
    });
});

router.get('/:semester', Auth.ensureAuthenticated, function(req, res) 
{
    Transcript.getTranscriptBySemester(req.user.userID, req.params.semester).then((data)=>
    {
        data.transcript = true;
        data.semester = req.params.semester;
        Transcript.getAverageBySemester(req.user.userID, req.params.semester).then((average)=>
        {
            data.average = average.average;
            res.render('semester', 
            {
                    title: 'My Transcript - myCourses',
                    data: data
            });
        }).catch((error) => 
        {
            console.log(error);
        });
    });
});

module.exports = router;
