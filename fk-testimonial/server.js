var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var Strategy = require('passport-twitter').Strategy;
var session = require('express-session');
const dotenv = require("dotenv")
const Twitter = require("twitter")

const multer = require("multer");
// const hbjs = require('handbrake-js')
const fs = require("fs")
dotenv.config()
var cors = require('cors')


const authTokens = {
  token: '', tokenSecret: ''
}

passport.use(new Strategy({
  consumerKey: process.env.CONSUMER_KEY,
  consumerSecret: process.env.CONSUMER_SECRET,
  callbackURL: '/testimonial-poc//twitter-callback'
}, function (token, tokenSecret, profile, callback) {
  authTokens.token = token
  authTokens.tokenSecret = tokenSecret

  return callback(null, profile);
}));

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
app.use(session({ secret: 'whatever', resave: true, saveUninitialized: true }))

app.use(passport.initialize())
app.use(passport.session())
app.use(cors());

// 


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


app.use(express.static(path.join(__dirname, "build")));
app.use("/testimonial-poc", express.static(path.join(__dirname, "build")));

app.use(express.static(path.join(__dirname, "build", "static")));

app.get('/testimonial-poc/twitter/login', passport.authenticate('twitter'))

app.get('/testimonial-poc/twitter-callback', passport.authenticate('twitter', {
  failureRedirect: '/'
}), function (req, res) {
  res.redirect('http://localhost:3001/users?close=true')
})
// Multer storage options
var storage = multer.diskStorage({

  destination: function (req, file, cb) {
    cb(null, __dirname + '/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname + '-' + Date.now() + '.mp4');
  }
});

var upload = multer({ storage: storage });

var type = upload.single('media');

app.post('/testimonial-poc/tweet', type, async function (req, res) {
  const client = new Twitter({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token_key: authTokens.token,
    access_token_secret: authTokens.tokenSecret
  })


  // const mediaData = fs.readFileSync('test.mp4')
  // const mediaSize = fs.statSync('test.mp4').size
  // const mediaType = "video/mp4"
  console.log(req.file.path)
  const mediaData = fs.readFileSync(req.file.path)
  const mediaSize = fs.statSync(req.file.path).size
  const mediaType = "video/mp4"

  initializeMediaUpload()
    .then(appendFileChunk)
    .then(finalizeUpload)
    .then(publishStatusUpdate).then((response) => {
      console.log(response)
      res.send({ status: 200, message: "Tweet Sent" })
    }).catch((err) => {
      res.send(err)
    })

  function initializeMediaUpload() {
    return new Promise(function (resolve, reject) {
      client.post("media/upload", {
        command: "INIT",
        total_bytes: mediaSize,
        media_category: 'tweet_video',
        media_type: mediaType
      }, function (error, data, response) {
        if (error) {

          console.log("789", error)
          reject(error)
        } else {
          resolve(data.media_id_string)
        }
      })
    })
  }

  function appendFileChunk(mediaId) {
    if (mediaId)
      return new Promise(function (resolve, reject) {
        client.post("media/upload", {
          command: "APPEND",
          media_id: mediaId,
          media: mediaData,
          segment_index: 0
        }, function (error, data, response) {
          if (error) {
            console.log("456", error)

            res.send(JSON.parse(response.body).error);

          } else {
            resolve(mediaId)
          }
        })
      })
  }

  function finalizeUpload(mediaId) {
    if (mediaId)
      return new Promise(function (resolve, reject) {
        client.post("media/upload", {
          command: "FINALIZE",
          media_id: mediaId
        }, function (error, data, response) {
          if (error) {

            res.send(JSON.parse(response.body).error);

          } else {
            resolve(mediaId)
          }
        })
      })

  }

  function publishStatusUpdate(mediaId) {
    console.log(mediaId)
    if (mediaId)
      return new Promise(function (resolve, reject) {
        client.post("statuses/update", {
          status: req.body.tweetMessage,
          media_ids: mediaId
        }, function (error, data, response) {
          fs.unlinkSync(req.file.path)
          if (error) {
            console.log(error)
            // reject(error)
            res.send({ code: 324, message: 'Not valid video' });
          } else {
            console.log("Successfully uploaded media and tweeted!")
            resolve(data)
          }
        })
      })
  }


})

app.get("/ping", function (req, res) {
  return res.send("pong");
});

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.get("/testimonial-poc", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(process.env.PORT || 5000);
