var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var Strategy = require('passport-twitter').Strategy;
var LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
var session = require('express-session');
const dotenv = require("dotenv")
const storage = require('node-sessionstorage')

dotenv.config()
var cors = require('cors');

const authTokens = {
  token: '', tokenSecret: '', id: ''
}

passport.serializeUser(function (user, callback) {
  callback(null, user);
})

passport.deserializeUser(function (obj, callback) {
  callback(null, obj);
})

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  cookie: {
    maxAge: 2 * 24 * 60 * 60 * 1000,
    //Please note that secure: true is a recommended option. However, it requires an https-enabled website
    secure: false
  },
  name: 'sessionId',
  resave: false,
  saveUninitialized: false,
  secret: '3U8K0A9M3N7FISDHI486',
}))
app.use(passport.initialize())
app.use(passport.session());
app.use(cors());
app.use(express.static(path.join(__dirname, "static")));
app.use(express.static(path.join(__dirname, "build", "static")));
app.use("/testimonials", express.static(path.join(__dirname, "build", "static")));
// app.use('/testimonials/*', express.static(path.join(__dirname, "build", "static")));

//Strategies
passport.use(new Strategy({
  consumerKey: process.env.CONSUMER_KEY,
  consumerSecret: process.env.CONSUMER_SECRET,
  callbackURL: '/v1/api/twitter-callback'
}, async function (token, tokenSecret, profile, callback) {
  authTokens.token = token;
  authTokens.tokenSecret = tokenSecret;
  storage.setItem('twitter-auth', JSON.stringify(authTokens))
  return callback(null, authTokens);
}));

passport.use(new LinkedInStrategy({
  clientID: process.env.LINKEDIN_KEY,
  clientSecret: process.env.LINKEDIN_SECRET,
  callbackURL: "/v1/api/linkedin-callback",
  scope: ['r_emailaddress', 'r_liteprofile', 'w_member_social'],
}, function (accessToken, refreshToken, profile, done) {
  authTokens.token = accessToken;
  authTokens.id = profile.id;
  storage.setItem('linkedin-auth', JSON.stringify(authTokens))
  return done(null, authTokens);
}));


require("./backend/routes/index")(app);

app.listen(process.env.PORT || 5000);
