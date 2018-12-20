var mysql = require('mysql');
var connection = require('../models/dbconn');

module.exports =
{
	getAdmins: function()
	{
		return new Promise((resolve, reject) =>
        {
            connection.query("SELECT userID, username FROM users WHERE admin=1", (error, rows, fields) =>
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

    getTeachers: function()
    {
        return new Promise((resolve, reject) =>
        {
            connection.query("SELECT userID, username FROM users WHERE teacher=1", (error, rows, fields) =>
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

	getUsers: function()
    {
        return new Promise((resolve, reject) =>
        {
            connection.query("SELECT userID, username FROM users WHERE student=1", (error, rows, fields) =>
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

	addCourse: function(course_code, instructor, semesterCode, description, faculty, course_name, course_level, start, end, days)
	{
		return new Promise((resolve, reject) =>
        {
            connection.query("INSERT INTO courses(course_code, username, semester_code, description, faculty, course_name, course_level, start_time, end_time, days) VALUES('" + course_code + "', '" + instructor + "', '" + semesterCode + "', '" + description + "', '" + faculty + "', '" + course_name + "', '" + course_level + "', '" + start + "', '" + end + "', '" + days + "')", (error, rows, fields) =>
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

	grantTeacherAccess: function(userID)
    {
        return new Promise((resolve, reject) =>
        {
            connection.query("UPDATE users SET users.teacher=1, users.student=null WHERE users.userID=" + userID + "", (error, rows, fields) =>
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

	revokeTeacherAccess: function(userID)
    {
        return new Promise((resolve, reject) =>
        {
            connection.query("UPDATE users SET users.teacher=null, users.student=1 WHERE users.userID=" + userID + "", (error, rows, fields) =>
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

	grantAdminAccess: function(userID)
    {
        return new Promise((resolve, reject) =>
        {
            connection.query("UPDATE users SET users.admin=1, users.student=null WHERE users.userID=" + userID + "", (error, rows, fields) =>
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

	revokeAdminAccess: function(userID)
    {
        return new Promise((resolve, reject) =>
        {
            connection.query("UPDATE users SET users.admin=null, users.student=1 WHERE users.userID=" + userID + "", (error, rows, fields) =>
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
};