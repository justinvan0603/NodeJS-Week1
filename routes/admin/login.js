var express = require("express");
var passport = require("passport");
var router = express.Router();


router.get('/auth/google',
  passport.authenticate('google', { scope:
  	[ 'email', 'profile' ] }
));

router.get( '/auth/google/callback',
	passport.authenticate( 'google', {
		successRedirect: '/dashboard',
		failureRedirect: '/auth/google/failure'
}));
module.exports = router;