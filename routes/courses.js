var express = require('express');
var Auth = require("../util/UserVerification");
var Courses = require('../models/courses');
var router = express.Router();

router.get('/', Auth.ensureAuthenticated, function(req, res) 
{
    var data = [];
    data.courses = true;
    Courses.getSemesters().then((semesters)=>
    {
        semesters.searchSemester = "Semester";
        semesters.searchFaculty = "Subject";
        semesters.searchLevel = "Course Level";
        Courses.getFaculties().then((faculties)=>
        {
            res.render('courses', 
            {
                    title: 'Course Planner - myCourses',
                    data: data,
                    semesters: semesters,
                    faculties: faculties
            });
        }).catch((error) => 
        {
            console.log(error);
        });
    });
});

router.get('/search', Auth.ensureAuthenticated, function(req, res) 
{
    var data = [];
    data.courses = true;
    Courses.getSemesters().then((semesters)=>
    {
        semesters.searchSemester = "Semester";
        semesters.searchFaculty = "Subject";
        semesters.searchLevel = "Course Level";
        Courses.getFaculties().then((faculties)=>
        {
            res.render('courses', 
            {
                    title: 'Course Planner - myCourses',
                    data: data,
                    semesters: semesters,
                    faculties: faculties
            });
        }).catch((error) => 
        {
            console.log(error);
        });
    });
});

router.post("/", Auth.ensureAuthenticated, function (req, res) 
{
    Courses.getSemesterByCode(req.body.semester, req.user.userID).then((semester) =>
    {
        if (semester == false)
        {
            Courses.addSemester(req.user.userID, req.body.semester).then(() =>
            {
                Courses.getCourseByCode(req.body.course, req.user.userID).then((course) =>
                {
                    if (course == false)
                    {
                        Courses.addCourse(req.body.course, req.body.semester, req.user.userID).then(() =>
                        {
                            Courses.getCourses().then((data)=>
                            {
                                data.courses = true;
                                Courses.getSemesters().then((semesters)=>
                                {
                                    semesters.searchSemester = "Semester";
                                    semesters.searchFaculty = "Subject";
                                    semesters.searchLevel = "Course Level";
                                    Courses.getFaculties().then((faculties)=>
                                    {
                                        res.render('courses', 
                                        {
                                                title: 'Course Planner - myCourses',
                                                data: data,
                                                semesters: semesters,
                                                faculties: faculties
                                        });
                                    }).catch((error) => 
                                    {
                                        console.log(error);
                                    });
                                });
                            });
                        });
                    }
                    else
                    {
                        console.log("Already enrolled in this class");
                        Courses.getCourses().then((data)=>
                        {
                            data.courses = true;
                            Courses.getSemesters().then((semesters)=>
                            {
                                semesters.searchSemester = "Semester";
                                semesters.searchFaculty = "Subject";
                                semesters.searchLevel = "Course Level";
                                Courses.getFaculties().then((faculties)=>
                                {
                                    res.render('courses', 
                                    {
                                            title: 'Course Planner - myCourses',
                                            data: data,
                                            semesters: semesters,
                                            faculties: faculties
                                    });
                                }).catch((error) => 
                                {
                                    console.log(error);
                                });
                            });
                        });
                    }
                });
            });
        }
        else
        {
            console.log("Already enrolled in this semester");
            Courses.getCourseByCode(req.body.course, req.user.userID).then((course) =>
            {
                if (course == false)
                {
                    Courses.addCourse(req.body.course, req.body.semester, req.user.userID).then(() =>
                    {
                        Courses.getCourses().then((data)=>
                        {
                            data.courses = true;
                            Courses.getSemesters().then((semesters)=>
                            {
                                semesters.searchSemester = "Semester";
                                semesters.searchFaculty = "Subject";
                                semesters.searchLevel = "Course Level";
                                Courses.getFaculties().then((faculties)=>
                                {
                                    res.render('courses', 
                                    {
                                            title: 'Course Planner - myCourses',
                                            data: data,
                                            semesters: semesters,
                                            faculties: faculties
                                    });
                                }).catch((error) => 
                                {
                                    console.log(error);
                                });
                            });
                        });
                    });
                }
                else
                {
                    console.log("Already enrolled in this class");
                    Courses.getCourses().then((data)=>
                    {
                        data.courses = true;
                        Courses.getSemesters().then((semesters)=>
                        {
                            semesters.searchSemester = "Semester";
                            semesters.searchFaculty = "Subject";
                            semesters.searchLevel = "Course Level";
                            Courses.getFaculties().then((faculties)=>
                            {
                                res.render('courses', 
                                {
                                        title: 'Course Planner - myCourses',
                                        data: data,
                                        semesters: semesters,
                                        faculties: faculties
                                });
                            }).catch((error) => 
                            {
                                console.log(error);
                            });
                        });
                    });
                }
            });
        }
    });
});

router.post("/search", Auth.ensureAuthenticated, function (req, res) 
{
    if (req.body.course != "")
    {
        if (req.body.semester != "Semester")
        {
            Courses.getCoursesBySemesterAndCode(req.body.semester, req.body.course).then((data)=>
            {
                data.courses = true;
                Courses.getSemesters().then((semesters)=>
                {
                    semesters.searchSemester = req.body.semester;
                    semesters.searchFaculty = req.body.faculty;
                    semesters.searchLevel = req.body.level;
                    Courses.getFaculties().then((faculties)=>
                    {
                        res.render('courses', 
                        {
                                title: 'Course Planner - myCourses',
                                data: data,
                                semesters: semesters,
                                faculties: faculties
                        });
                    }).catch((error) => 
                    {
                        console.log(error);
                    });
                });
            });
        }
        else
        {
            Courses.getCourses().then((data)=>
            {
                data.courses = true;
                Courses.getSemesters().then((semesters)=>
                {
                    semesters.searchSemester = req.body.semester;
                    semesters.searchFaculty = req.body.faculty;
                    semesters.searchLevel = req.body.level;
                    Courses.getFaculties().then((faculties)=>
                    {
                        res.render('courses', 
                        {
                                title: 'Course Planner - myCourses',
                                data: data,
                                semesters: semesters,
                                faculties: faculties
                        });
                    }).catch((error) => 
                    {
                        console.log(error);
                    });
                });
            });
        }
    }
    else
    {
        if (req.body.semester != "Semester" && req.body.faculty != "Subject" && req.body.level != "Course Level")
        {
            Courses.getCoursesBySemesterAndFacultyAndLevel(req.body.semester, req.body.faculty, req.body.level).then((data)=>
            {
                data.courses = true;
                Courses.getSemesters().then((semesters)=>
                {
                    semesters.searchSemester = req.body.semester;
                    semesters.searchFaculty = req.body.faculty;
                    semesters.searchLevel = req.body.level;
                    Courses.getFaculties().then((faculties)=>
                    {
                        res.render('courses', 
                        {
                                title: 'Course Planner - myCourses',
                                data: data,
                                semesters: semesters,
                                faculties: faculties
                        });
                    }).catch((error) => 
                    {
                        console.log(error);
                    });
                });
            });
        }
        else if (req.body.semester != "Semester" && req.body.faculty != "Subject" && req.body.level == "Course Level")
        {
            Courses.getCoursesBySemesterAndFaculty(req.body.semester, req.body.faculty).then((data)=>
            {
                data.courses = true;
                Courses.getSemesters().then((semesters)=>
                {
                    semesters.searchSemester = req.body.semester;
                    semesters.searchFaculty = req.body.faculty;
                    semesters.searchLevel = req.body.level;
                    Courses.getFaculties().then((faculties)=>
                    {
                        res.render('courses', 
                        {
                                title: 'Course Planner - myCourses',
                                data: data,
                                semesters: semesters,
                                faculties: faculties
                        });
                    }).catch((error) => 
                    {
                        console.log(error);
                    });
                });
            });
        }
        
        else if (req.body.semester != "Semester" && req.body.faculty == "Subject")
        {
            Courses.getCoursesBySemester(req.body.semester).then((data)=>
            {
                data.courses = true;
                Courses.getSemesters().then((semesters)=>
                {
                    semesters.searchSemester = req.body.semester;
                    semesters.searchFaculty = req.body.faculty;
                    semesters.searchLevel = req.body.level;
                    Courses.getFaculties().then((faculties)=>
                    {
                        res.render('courses', 
                        {
                                title: 'Course Planner - myCourses',
                                data: data,
                                semesters: semesters,
                                faculties: faculties
                        });
                    }).catch((error) => 
                    {
                        console.log(error);
                    });
                });
            });
        }
        else if (req.body.semester == "Semester" && req.body.faculty != "Subject")
        {
            Courses.getCoursesByFaculty(req.body.faculty).then((data)=>
            {
                data.courses = true;
                Courses.getSemesters().then((semesters)=>
                {
                    semesters.searchSemester = req.body.semester;
                    semesters.searchFaculty = req.body.faculty;
                    semesters.searchLevel = req.body.level;
                    Courses.getFaculties().then((faculties)=>
                    {
                        res.render('courses', 
                        {
                                title: 'Course Planner - myCourses',
                                data: data,
                                semesters: semesters,
                                faculties: faculties
                        });
                    }).catch((error) => 
                    {
                        console.log(error);
                    });
                });
            });
        }
        else 
        {
            Courses.getCourses().then((data)=>
            {
                data.courses = true;
                Courses.getSemesters().then((semesters)=>
                {
                    semesters.searchSemester = req.body.semester;
                    semesters.searchFaculty = req.body.faculty;
                    semesters.searchLevel = req.body.level;
                    Courses.getFaculties().then((faculties)=>
                    {
                        res.render('courses', 
                        {
                                title: 'Course Planner - myCourses',
                                data: data,
                                semesters: semesters,
                                faculties: faculties
                        });
                    }).catch((error) => 
                    {
                        console.log(error);
                    });
                });
            });
        }
    }
});

module.exports = router;
