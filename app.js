//**************************Set Up Dependencies******************************
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

//***************************Configuration*******************************
//Connection URL where MongoDB is running
var uri = 'mongodb://localhost:27017/data'
mongodb.MongoClient.connect(uri, function(error,db){
  if(error){
    console.log(error);
    process.exit(1);
  }
  exit(0);
})

// set up ejs for templating
app.set('view engine', 'ejs');

// Load Routes
app.use(express.static(__dirname + '/public'))''
app.use(require('./middlewares/users'));
app.use(require('./controllers'));

// pass passport for configuration
require('./middlewares/passport')(passport);

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms

// required for passport
app.use(session({ secret: 'itradeuutrademe' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
//require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);
