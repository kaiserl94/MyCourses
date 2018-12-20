var express = require("express");
var router = express.Router();
var Auth = require("../util/UserVerification");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var User = require("../models/user");

router.get("/register", function (req, res) 
{
    res.render("register", 
    {
        title: 'Register - myCourses',
        layout: 'login_layout.handlebars'
    });
});

router.get("/login", function (req, res) 
{
    res.render("login", 
    {
        title: 'Login - myCourses',
        layout: 'login_layout.handlebars'
    });
});

router.post("/login",
    passport.authenticate("local", 
    {
        successRedirect: "/",
        failureRedirect: "/u/login",
        failureFlash: true
    }),
    function (req, res) 
    {
        res.redirect("/");
    }
);

router.get("/logout", function (req, res) 
{
	req.logout();

	req.flash("success_msg", "You have been successfully logged out");

	res.redirect("/u/login");
});

router.post("/register", function (req, res) 
{
    var fname = req.body.fname;
    var lname = req.body.lname;
    var username = req.body.username;
    var password = req.body.password;
    
    validateUser(req);

    var rendered = false;
    
    return req.getValidationResult().then((result) => 
    {
        if (!result.isEmpty()) 
        {
            rendered = true;
            return res.render("register", 
            {
                layout: "login_layout.handlebars",
                errors: result.mapped(),
            });
        }

        return User.hashPass(password).then((hashed)=>
        {
            User.createUser(username, hashed, fname, lname);

            res.redirect("/u/login");
        }).catch(function (err) 
        {
        if (rendered) 
        {
            return;
        }
        console.log(err);
        req.flash("error_msg", "Could not register account");
        res.render("register", 
        {
                layout: "login_layout.handlebars",
                errors: err
            });
        });
    });
});

function validateUser(req) 
{
	req.checkBody("username", "Username is required").notEmpty();
	req.checkBody("username", "Usernames must be between 3 and 16 characters").len(3, 20);
	req.checkBody("username", "Usernames may only contain letters, numbers, - and _").usernameValid();
	req.checkBody("username", "Sorry, that username already exists").usernameExists();
	req.checkBody("password", "Password must be between 6 and 64 characters").notEmpty();
	req.checkBody("password", "Password must be between 6 and 64 characters").len(6, 64);
	req.checkBody("password2", "Passwords do not match").equals(req.body.password);
}

passport.use(new LocalStrategy(
    function (username, password, done) 
    {
        var user;
        User.getUserByUsername(username).then((gotUser) => 
        {
            user = gotUser;
            return User.comparePassword(password, gotUser.password).then((isMatch) =>  
            {
                if (isMatch) 
                {
                    //console.log(user);
                    return done(null, user);
                } 
                else 
                {
                    return done(null, false, 
                    {
                        message: "The username or password you entered is incorrect"
                    });
                }
            }).catch((err) => 
            {
                console.log(err);
                return done(null, false, 
                {
                    message: "The username or password you entered is incorrect"
                });
            });
        });
    }
));

passport.serializeUser(function (user, done) 
{
    done(null, user.userID);
});

passport.deserializeUser(function (id, done) 
{
    User.getUserById(id).then(function (user) 
    {
        done(null, user);
    }).catch(function (err) 
    {
        done(err, null);
    });
});

module.exports = router;