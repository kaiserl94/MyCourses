var express = require('express');
var Auth = require("../util/UserVerification");
var Teacher = require('../models/teacher');
var router = express.Router();

router.get('/', Auth.ensureAuthenticatedTeacher, function(req, res) 
{
    Teacher.getCourses(req.user.username).then((data)=>
    {
        data.courseMngr = true;
        res.render('course-manager', 
        {
                title: 'Course Manager - myCourses',
                data: data
        });
    }).catch((error) => 
    {
        console.log(error);
    });
});

router.get('/:course', Auth.ensureAuthenticatedTeacher, function(req, res) 
{
    Teacher.getStudents(req.params.course).then((data)=>
    {
        data.courseMngr = true;
        res.render('course', 
        {
                title: 'Course Manager - myCourses',
                data: data
        });
    }).catch((error) => 
    {
        console.log(error);
    });
});

router.post("/:course", Auth.ensureAuthenticatedTeacher, function (req, res) 
{
    Teacher.updateGrade(req.body.course, req.body.grade, req.body.userID).then(() =>
    {
        Teacher.getStudents(req.params.course).then((data)=>
        {
            data.courseMngr = true;
            res.render('course', 
            {
                    title: 'Course Manager - myCourses',
                    data: data
            });
        }).catch((error) => 
        {
            console.log(error);
        });
    });
});

module.exports = router;
