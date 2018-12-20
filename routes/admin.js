var express = require('express');
var Auth = require("../util/UserVerification");
var router = express.Router();
var Admin = require("../models/admin");

router.get('/', Auth.ensureAuthenticatedAdmin, function(req, res) 
{
	Admin.getTeachers().then((data)=>
	{
		data.admin = true;
		Admin.getUsers().then((users)=>
		{
			Admin.getAdmins().then((admins)=>
			{
				res.render('admin', 
				{
						title: 'Admin Panel - myCourses',
						data: data,
						users: users,
						admins: admins
				});
			}).catch((error) => 
			{
				console.log(error);
			});
		});
	});
});

router.post("/", Auth.ensureAuthenticatedAdmin, function (req, res) 
{
	if (req.body.courseCode != null)
	{
		var courseLevel = req.body.courseCode.substring(6,7);
		Admin.addCourse(req.body.courseCode, req.body.instructor, req.body.semesterCode, req.body.description, req.body.faculty, req.body.courseName, courseLevel, req.body.start, req.body.end, req.body.days).then(() =>
		{
			Admin.getTeachers().then((data)=>
			{
				data.admin = true;
				Admin.getUsers().then((users)=>
				{
					Admin.getAdmins().then((admins)=>
					{
						res.render('admin', 
						{
								title: 'Admin Panel - myCourses',
								data: data,
								users: users,
								admins: admins
						});
					}).catch((error) => 
					{
						console.log(error);
					});
				});
			});
		});
	}
	else if (req.body.userToTeacher != null)
	{
		Admin.grantTeacherAccess(req.body.userToTeacher).then(() =>
		{
			Admin.getTeachers().then((data)=>
			{
				data.admin = true;
				Admin.getUsers().then((users)=>
				{
					Admin.getAdmins().then((admins)=>
					{
						res.render('admin', 
						{
								title: 'Admin Panel - myCourses',
								data: data,
								users: users,
								admins: admins
						});
					}).catch((error) => 
					{
						console.log(error);
					});
				});
			});
		});
	}
	else if (req.body.teacherToUser != null)
	{
		Admin.revokeTeacherAccess(req.body.teacherToUser).then(() =>
		{
			Admin.getTeachers().then((data)=>
			{
				data.admin = true;
				Admin.getUsers().then((users)=>
				{
					Admin.getAdmins().then((admins)=>
					{
						res.render('admin', 
						{
								title: 'Admin Panel - myCourses',
								data: data,
								users: users,
								admins: admins
						});
					}).catch((error) => 
					{
						console.log(error);
					});
				});
			});
		});
	}
	else if (req.body.userToAdmin != null)
	{
		Admin.grantAdminAccess(req.body.userToAdmin).then(() =>
		{
			Admin.getTeachers().then((data)=>
			{
				data.admin = true;
				Admin.getUsers().then((users)=>
				{
					Admin.getAdmins().then((admins)=>
					{
						res.render('admin', 
						{
								title: 'Admin Panel - myCourses',
								data: data,
								users: users,
								admins: admins
						});
					}).catch((error) => 
					{
						console.log(error);
					});
				});
			});
		});
	}
	else if (req.body.adminToUser != null)
	{
		Admin.revokeAdminAccess(req.body.adminToUser).then(() =>
		{
			Admin.getTeachers().then((data)=>
			{
				data.admin = true;
				Admin.getUsers().then((users)=>
				{
					Admin.getAdmins().then((admins)=>
					{
						res.render('admin', 
						{
								title: 'Admin Panel - myCourses',
								data: data,
								users: users,
								admins: admins
						});
					}).catch((error) => 
					{
						console.log(error);
					});
				});
			});
		});
	}
});

module.exports = router;
