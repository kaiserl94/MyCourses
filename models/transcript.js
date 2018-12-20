var mysql = require('mysql');
var connection = require('../models/dbconn');

module.exports =
{
    getTranscript: function(userID)
    {                    
        var semesters = [];
        var semester = {
            name: "",
            average: "",
            courses: []
        };
        var currentSemester = null;
        var previousSemester = null;

        return new Promise((resolve, reject) =>
        {
            connection.query("SELECT table1.fname AS instructor_fname, table1.lname AS instructor_lname, table2.course_code, table2.semester_code, table2.course_name, table2.description, table2.start_time, table2.end_time, table2.days, grade FROM users AS table1, courses AS table2, semesters_courses AS table3 WHERE table2.course_code=table3.course_code AND table2.username=table1.username AND table3.userID=" + userID + " ORDER BY semester_code ASC", (error, rows, fields) =>
            {
                if (error) 
                {
                    console.log(error);
                    return reject(error);
                }
                else
                {
                    rows.forEach(function(row, i)
                    {
                        currentSemester = row.semester_code;
                        if (i == 0) 
                        {
                            previousSemester = currentSemester;
                            initial = false;
                        }
                        
                        if (currentSemester != previousSemester)
                        {
                            semesters.push(semester);
                            semester = {
                                name: "",
                                average: "",
                                courses: []
                            };
                        }

                        if (i == rows.length-1) semesters.push(semester);

                        semester.name = row.semester_code;
                        semester.courses.push(row);

                        previousSemester = currentSemester;
                    });
                    return resolve(semesters);
                }
            });
        })
    },

    getTranscriptBySemester: function(userID, semester_code)
    {
        return new Promise((resolve, reject) =>
        {
            connection.query("SELECT table1.fname AS instructor_fname, table1.lname AS instructor_lname, table2.course_code, table2.semester_code, table2.course_name, table2.description, table2.start_time, table2.end_time, table2.days, grade FROM users AS table1, courses AS table2, semesters_courses AS table3 WHERE table2.course_code=table3.course_code AND table2.username=table1.username AND table3.userID=" + userID + " AND table3.semester_code='" + semester_code + "' ORDER BY semester_code ASC", (error, rows, fields) =>
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

    getAverage: function(userID)
    {
        return new Promise((resolve, reject) =>
        {
            connection.query("SELECT ROUND(AVG(grade),2) AS average FROM semesters_courses WHERE userID=" + userID + "", (error, rows, fields) =>
            {
                if (error) 
                {
                    console.log(error);
                    return reject(error);
                }
                else
                {
                    return resolve(rows[0]);
                }
            });
        })
    },

    getAverageBySemester: function(userID, semester_code)
    {
        return new Promise((resolve, reject) =>
        {
            connection.query("SELECT ROUND(AVG(grade),2) AS average FROM semesters_courses WHERE userID=" + userID + " AND semester_code='" + semester_code + "'", (error, rows, fields) =>
            {
                if (error) 
                {
                    console.log(error);
                    return reject(error);
                }
                else
                {
                    return resolve(rows[0]);
                }
            });
        })
    }
};