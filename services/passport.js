const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys.js');
const mongoose = require('mongoose');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
	done(null,user.id);
})

passport.deserializeUser((userId,done) => {
	User.findById(userId)
	.then(user => {
		done(null,user);
	})
})

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
	}, 
	(accesstoken, refresh, profile, done ) => {
		User.findOne({googleId:profile.id})
			.then((oldUser) => {
				if(oldUser){
					done(null, oldUser);
				} else {
					new User({googleId:profile.id})
					.save()
						.then((newUser) => {
						done(null,newUser);
					})
				}

			})

		
	})	
);

