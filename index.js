const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys =  require('./config/keys');

require('./models/user');
require('./models/Surveys');
require('./services/passport');

mongoose.connect(keys.mongoURI); //connect to DB with the DB key generated in mlab

const app = express();

app.use(bodyParser.json());

// why cookie session?
// Assign data to cookie
// cookie session takes data and asisgn to req.session

app.use(cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // config object - max age - how long can user stay in?
    keys:[keys.cookieKey] // key to encrypt cookie

}));


app.use(passport.initialize());
app.use(passport.session());


// can be changed to just require
const authRoutes = require('./routes/authRoutes');
const billingRoutes = require('./routes/billingRoute');
const surveyRoutes = require('./routes/surveyRoutes');

authRoutes(app);
billingRoutes(app);
surveyRoutes(app);


if(process.env.NODE_ENV === 'production'){
	// make sure express will serve up production assets
	// like main.js or main.css file
	app.use(express.static('client/build'));
	// express will serve up the index.html file
	// if it does not recognise the route.
	const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);