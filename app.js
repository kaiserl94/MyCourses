var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var debug = require('debug');
var handlebars = require("express-handlebars");
var expressValidator = require("express-validator");
var expressSession = require("express-session");
var flash = require("connect-flash");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var connection = require('./models/dbconn');

var app = express();

var handlebarsEngine = handlebars.create({
	defaultLayout: "layout",
	partialsDir: __dirname + "/views/partials/"
});

//View Engine
app.engine("handlebars", handlebarsEngine.engine);
app.set("view engine", "handlebars");

//bodyparser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(cookieParser());

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Express Session
app.use(expressSession({
	secret: "secret",
	saveUninitialized: true,
	resave: true
}));

app.use(passport.initialize());
app.use(passport.session());

//Express Validator
app.use(expressValidator({
	errorFormatter: function(param, msg, value) {
		var namespace = param.split("."),
			root = namespace.shift(),
			formParam = root;

		while (namespace.length) {
			formParam += "[" + namespace.shift() + "]";
		}

		return {
			param: formParam,
			msg: msg,
			value: value
		};
	},

	customValidators: 
	{
		usernameExists: function(username) 
		{
			return new Promise((resolve, reject) =>
			{
				connection.query('SELECT username FROM users WHERE username="' + username + '"', function(error, row, fields)
				{
					if (row.length == 0) 
					{
						console.log(error);
						return resolve(error);
					}
					return reject(row);
				});
			});
		},
		usernameValid: function(username) 
		{
			var regExp = new RegExp("^[a-zA-Z0-9_-]*$");
			return regExp.test(username);
		}
	}
}));

app.use(flash());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	res.locals.success_msg = req.flash("success_msg");
	res.locals.error_msg = req.flash("error_msg");
	res.locals.error = req.flash("error");
	res.locals.user = req.user || null;
	next();
});

var index = require('./routes/index');
var timetable = require('./routes/timetable');
var transcript = require('./routes/transcript');
var courses = require('./routes/courses');
var users = require('./routes/users');
var courseManager = require('./routes/course-manager');
var admin = require('./routes/admin');

app.use('/', index);
app.use("/u", users);
app.use('/timetable', timetable);
app.use('/transcript', transcript);
app.use('/courses', courses);
app.use('/course-manager', courseManager);
app.use('/admin', admin);


app.use(express.static("scripts"));

module.exports = app;
