var mysql = require('mysql');
var bcrypt = require("bcryptjs");
var connection = require('../models/dbconn');

module.exports = 
{
    createUser: function(username, password, fname, lname)
    {
        return new Promise((resolve, reject) =>
        {
            connection.query('INSERT INTO users (username, password, student, fname, lname) VALUES ("' + username + '", "' + password + '", 1,"' + fname + '", "' + lname + '")', function(error, rows, fields)
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
        });
    },

    getUserByUsername: function(username)
    {
        return new Promise((resolve, reject) =>
        {
            connection.query('SELECT * FROM users WHERE username="' + username + '" LIMIT 1', function(error, row, fields)
            {
                if (error) 
                {
                    console.log(error);
                    return reject(error);
                }
                else
                {
                    return resolve(row[0]);
                }
            });
        });
    },

    getUserById: function(id)
    {
        return new Promise((resolve, reject) =>
        {
            connection.query('SELECT * FROM users WHERE userID=' + id + ' LIMIT 1', function(error, row, fields)
            {
                if (error) 
                {
                    console.log(error);
                    return reject(error);
                }
                else
                {
                    return resolve(row[0]);
                }
            });
        });
    },

    comparePassword: function(candidatePassword, hash)
    {
        return bcrypt.compare(candidatePassword, hash);
    },

    hashPass: function(password)
    {
        return new Promise(function (resolve, reject) 
        {
            bcrypt.genSalt(10, function (err, salt) 
            {
                bcrypt.hash(password, salt, (err, hash) =>
                {
                    if (!err)
                    {
                        return resolve(hash);
                    }
                    else return reject(err);
                });
            });
        });
    }
}