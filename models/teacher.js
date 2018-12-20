var mysql = require('mysql');
var connection = require('../models/dbconn');

module.exports =
{
    getCourses: function(username)
    {
        return new Promise((resolve, reject) =>
        {
            connection.query("SELECT * FROM courses WHERE username='" + username + "'", (error, rows, fields) =>
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
	
	getStudents: function(course)
	{
		return new Promise((resolve, reject) =>
        {
            connection.query("SELECT table1.userID, username, course_code, semester_code, grade FROM users AS table1, semesters_courses AS table2 WHERE table2.course_code='" + course + "' AND table2.userID=table1.userID", (error, rows, fields) =>
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
    
    updateGrade: function(course, grade, userID)
    {
        return new Promise((resolve, reject) =>
        {
            connection.query("UPDATE semesters_courses SET semesters_courses.grade=" + grade + " WHERE semesters_courses.userID='" + userID + "' AND course_code='" + course + "'", (error, rows, fields) =>
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