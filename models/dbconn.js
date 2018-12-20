var mysql = require('mysql');

var connection = mysql.createConnection(
{
  host: 'localhost',
  user: 'root',
  password: 'a1B2c3D4',
  database: '415db'
});

connection.connect(function(error)
{
  if (!error)
  {
    console.log("Connected to Database...");
  }
  else
  {
    console.log("Error connecting to Database...");
  }
});

module.exports = connection;