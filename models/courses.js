var mysql = require('mysql');
var connection = require('../models/dbconn');

module.exports =
{
    getCourses: function()
    {
        return new Promise((resolve, reject) =>
        {
            connection.query("SELECT table1.fname AS instructor_fname, table1.lname AS instructor_lname, course_code, semester_code, course_name, description, start_time, end_time, days FROM users AS table1, courses AS table2 WHERE table2.username=table1.username ORDER BY course_code ASC", (error, rows, fields) =>
            {
                if (error) 
                {
                    console.log(error);
                    return reject(error);
                }
                else
                {
                    return resolve(rows);
                }
            });
        })
    },
    
    getSemesters: function()
    {
        return new Promise((resolve, reject) =>
        {
            connection.query("SELECT distinct semester_code FROM courses ORDER BY semester_code ASC", (error, rows, fields) =>
            {
                if (error) 
                {
                    console.log(error);
                    return reject(error);
                }
                else
                {
                    return resolve(rows);
                }
            });
        })
    },

    getFaculties: function()
    {
        return new Promise((resolve, reject) =>
        {
            connection.query("SELECT distinct faculty FROM courses ORDER BY faculty ASC", (error, rows, fields) =>
            {
                if (error) 
                {
                    console.log(error);
                    return reject(error);
                }
                else
                {
                    return resolve(rows);
                }
            });
        })
    },

    getCoursesBySemesterAndFacultyAndLevel: function(semester, faculty, level)
    {
        return new Promise((resolve, reject) =>
        {
            connection.query("SELECT table1.fname AS instructor_fname, table1.lname AS instructor_lname, course_code, semester_code, course_name, description, start_time, end_time, days FROM users AS table1, courses AS table2 WHERE table2.username=table1.username AND semester_code='" + semester + "' AND faculty='" + faculty + "' AND course_level='" + level + "'ORDER BY course_code ASC", (error, rows, fields) =>
            {
                if (error) 
                {
                    console.log(error);
                    return reject(error);
                }
                else
                {
                    return resolve(rows);
                }
            });
        })
    },

    getCoursesBySemesterAndFaculty: function(semester, faculty)
    {
        return new Promise((resolve, reject) =>
        {
            connection.query("SELECT table1.fname AS instructor_fname, table1.lname AS instructor_lname, course_code, semester_code, course_name, description, start_time, end_time, days FROM users AS table1, courses AS table2 WHERE table2.username=table1.username AND semester_code='" + semester + "' AND faculty='" + faculty + "' ORDER BY course_code ASC", (error, rows, fields) =>
            {
                if (error) 
                {
                    console.log(error);
                    return reject(error);
                }
                else
                {
                    return resolve(rows);
                }
            });
        })
    },

    getCoursesBySemesterAndCode: function(semester, course)
    {
        return new Promise((resolve, reject) =>
        {
            connection.query("SELECT table1.fname AS instructor_fname, table1.lname AS instructor_lname, course_code, semester_code, course_name, description, start_time, end_time, days FROM users AS table1, courses AS table2 WHERE table2.username=table1.username AND course_code LIKE '%" + course + "%' AND semester_code='" + semester + "' ORDER BY course_code ASC", (error, rows, fields) =>
            {
                if (error) 
                {
                    console.log(error);
                    return reject(error);
                }
                else
                {
                    return resolve(rows);
                }
            });
        })
    },

    getCoursesBySemester: function(semester)
    {
        return new Promise((resolve, reject) =>
        {
            connection.query("SELECT table1.fname AS instructor_fname, table1.lname AS instructor_lname, course_code, semester_code, course_name, description, start_time, end_time, days FROM users AS table1, courses AS table2 WHERE table2.username=table1.username AND semester_code='" + semester + "' ORDER BY course_code ASC", (error, rows, fields) =>
            {
                if (error) 
                {
                    console.log(error);
                    return reject(error);
                }
                else
                {
                    return resolve(rows);
                }
            });
        })
    },
    
    getCoursesByFaculty: function(faculty)
    {
        return new Promise((resolve, reject) =>
        {
            connection.query("SELECT table1.fname AS instructor_fname, table1.lname AS instructor_lname, course_code, semester_code, course_name, description, start_time, end_time, days FROM users AS table1, courses AS table2 WHERE table2.username=table1.username AND faculty='" + faculty + "' ORDER BY course_code ASC", (error, rows, fields) =>
            {
                if (error) 
                {
                    console.log(error);
                    return reject(error);
                }
                else
                {
                    return resolve(rows);
                }
            });
        })
    },

	getSemesterByCode: function(semester, userID)
	{
		return new Promise((resolve, reject) =>
        {
            connection.query("SELECT semester_code FROM users_semesters WHERE semester_code='" + semester + "' AND userID='" + userID + "'", (error, rows, fields) =>
            {
                if (error) 
                {
                    console.log(error);
                    return reject(error);
                }
                else
                {
					if (rows[0] === undefined) return resolve(false);
					else return resolve(true);
                }
            });
        })
	},

	getCourseByCode: function(course, userID)
	{
		return new Promise((resolve, reject) =>
        {
            connection.query("SELECT course_code FROM semesters_courses WHERE course_code='" + course + "' AND userID='" + userID + "'", (error, rows, fields) =>
            {
                if (error) 
                {
                    console.log(error);
                    return reject(error);
                }
                else
                {
					if (rows[0] === undefined) return resolve(false);
					else return resolve(true);
                }
            });
        })
	},

	addSemester: function(userID, semester)
	{
		return new Promise((resolve, reject) =>
        {
            connection.query("INSERT INTO users_semesters (userID, semester_code) VALUES(" + userID + ", '" + semester + "')", (error, rows, fields) =>
            {
                if (error) 
                {
                    console.log(error);
                    return reject(error);
                }
                else
                {
                    console.log(rows);
                    return resolve(rows);
                }
            });
        })
	},
	
	addCourse: function(course, semester, userID)
    {
        return new Promise((resolve, reject) =>
        {
            connection.query("INSERT INTO semesters_courses (userID, semester_code, course_code) VALUES(" + userID + ", '" + semester + "', '" + course + "')", (error, rows, fields) =>
            {
                if (error) 
                {
                    console.log(error);
                    return reject(error);
                }
                else
                {
                    console.log(rows);
                    return resolve(rows);
                }
            });
        })
    }
};