var UserAuth = {
	ensureAuthenticated: function(req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.redirect("/u/login");
		}
	},

	ensureAuthenticatedAdmin: function(req, res, next) {
		if (req.isAuthenticated() && req.user && req.user.admin) {
			return next();
		} else {
			res.redirect("/");
		}
	},

	ensureAuthenticatedTeacher: function(req, res, next) {
		if (req.isAuthenticated() && req.user && req.user.teacher) {
			return next();
		} else {
			res.redirect("/");
		}
	}
};

module.exports = UserAuth;