const express = require('express');
const mongoose = require('mongoose');
const keys =  require('./config/keys');
const userModel =  require('./models/user');
const cookieSession = require('cookie-session');
const passport = require('passport')
require('./services/passport')
const authRoutes = require('./routes/authRoutes')

mongoose.connect(keys.mongoURI); //connect to DB with the DB key generated in mlab

const app = express();

app.use(cookieSession({
	maxAge: 30 * 24 * 60 * 60 * 1000, // config object - max age - how long can user stay in? 
	keys:[keys.cookieKey] // key to encrypt cookie

}));

// why cookie session?
// Assign data to cookie
// cookie session takes data and asisgn to req.session

app.use(passport.initialize());
app.use(passport.session()); 

authRoutes(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);