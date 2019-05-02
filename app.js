var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

//Load configurations
var configurations = require('./config.json');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var studyRouter = require('./routes/studyservice');

var studyApiRouter = require('./routes/api/study');

var loginRouter = require('./routes/admin/login');
var app = express();
//const swaggerDocument = require('./swagger.json');
const expressSwagger = require('express-swagger-generator')(app);
let options = {
  swaggerDefinition: {
      info: {
          description: 'CAES Backend',
          title: 'Swagger',
          version: '1.0.0',
      },
      host: 'localhost:3000',
      basePath: '/v1',
      produces: [
          "application/json"
      ],
      schemes: ['http', 'https'],
  },
  basedir: __dirname, //app absolute path
  files: ['./routes/**/*.js'] //Path to the API handle folder
};
expressSwagger(options);
//Init MongoDB connection
var db = require('mongoose');
db.Promise = global.Promise;
db.connect(configurations.mongo_atlas.connectionString, {useNewUrlParser: true})
  .then(()=>{
    console.log("Database connected");
})
  .catch(err => {
    console.log("Failed to connect to database");
    process.exit();
  });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use(passport.session());
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/study',studyRouter);

app.use('/login',loginRouter);

passport.serializeUser(function(profile, done) {
  done(null, profile);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

//app.use('/api/study',studyApiRouter);
var GOOGLE_CLIENT_ID      = "391534551840-qi2p9he2al8i7ehvt5jid2b72paq4qkg.apps.googleusercontent.com"
  , GOOGLE_CLIENT_SECRET  = "xD4pfilb_hhbpDH8ZT5gFciO";

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: "https://week-1-demo.herokuapp.com/login/auth/google/callback"
},
function(accessToken, refreshToken, profile, done) {
  return done(null,profile.emails);

}
));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
