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
const hbjs = require('handbrake-js')

const fs = require("fs")
dotenv.config()
var cors = require('cors')


const authTokens = {
  token: '', tokenSecret: ''
}
var client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: authTokens.token,
  access_token_secret: authTokens.tokenSecret
})

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

// 



app.use(express.static(path.join(__dirname, "build")));
app.use("/testimonial-poc", express.static(path.join(__dirname, "build")));

app.use(express.static(path.join(__dirname, "build", "static")));

passport.use(new Strategy({
  consumerKey: process.env.CONSUMER_KEY,
  consumerSecret: process.env.CONSUMER_SECRET,
  callbackURL: '/testimonial-poc/twitter-callback'
}, function (token, tokenSecret, profile, callback) {
  client = new Twitter({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token_key: token,
    access_token_secret: tokenSecret
  })

  return callback(null, profile);
}));


app.get('/testimonial-poc/twitter/login', passport.authenticate('twitter'))

app.get('/testimonial-poc/twitter-callback', passport.authenticate('twitter', {
  failureRedirect: '/'
}), function (req, res) {
  res.redirect('/testimonial-poc/users?close=true')
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
  var inFilename = req.file.path;
  var outFilename = "video.mp4";
  hbjs.spawn({ input: inFilename, output: outFilename })
    .on('error', err => {
      // invalid user input, no video found etc
      console.log("error", err)
    })
    .on('progress', progress => {
      console.log(
        'Percent complete: %s, ETA: %s',
        progress.percentComplete,
        progress.eta
      )
    }).on('end', async () => {
      console.log("Finished")

      const mediaData = fs.readFileSync(outFilename)
      const mediaSize = fs.statSync(outFilename).size
      const mediaType = "video/mp4"

      try {
        const mediaId = await initializeMediaUpload()
        const mediaIdString = await appendFileChunk(mediaId)
        const mediaIdInt = await finalizeUpload(mediaIdString)
        await publishStatusUpdate(mediaIdInt)
        res.send({ status: 200, message: "Tweet Sent" })
      } catch (err) {
        res.send({ code: 324, message: 'Not valid video' });
      }
      // })

      function initializeMediaUpload() {
        return new Promise(function (resolve, reject) {
          client.post("media/upload", {
            command: "INIT",
            total_bytes: mediaSize,
            media_category: 'tweet_video',
            media_type: mediaType
          }, function (error, data, response) {
            if (error) {
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
                reject(JSON.parse(response.body).error);

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

                reject(JSON.parse(response.body).error);

              } else {
                resolve(mediaId)
              }
            })
          })

      }

      function publishStatusUpdate(mediaId) {
        console.log(mediaId)
        if (mediaId)
          setTimeout(() => {
            return new Promise(function (resolve, reject) {
              client.post("statuses/update", {
                status: req.body.tweetMessage,
                media_ids: mediaId
              }, function (error, data, response) {

                if (error) {
                  console.log(error)
                  reject({ code: 324, message: 'Not valid video' })
                } else {
                  console.log("Successfully uploaded media and tweeted!")
                  resolve(data)
                }
              })
            })
          }, 5000)
        fs.unlinkSync(req.file.path)
      }
      console.log('Finished processing');
    });

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
app.get("/testimonial-poc/users", function (req, res) {
  res.sendFile(path.join(__dirname, "close.html"));
});

app.listen(process.env.PORT || 5000);
