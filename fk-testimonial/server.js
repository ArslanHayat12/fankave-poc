const bodyParser = require('body-parser')
const express = require("express");
const multer = require("multer");
const Twitter = require("twitter")
const dotenv = require("dotenv")
const fs = require('fs')
dotenv.config()


const client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
})


const path = require("path");
const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


app.use(express.static(path.join(__dirname, "build")));
app.use("/testimonial-poc", express.static(path.join(__dirname, "build")));

app.use(express.static(path.join(__dirname, "build", "static")));


// Multer storage options
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + '/public/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '.mp4');
  }
});

var upload = multer({ storage: storage });

var type = upload.single('media');
app.post("/post-text-tweet", type, async function (req, res) {

  const mediaData = fs.readFileSync('test.mp4')
  const mediaSize = fs.statSync('test.mp4').size
  const mediaType = "video/mp4"
  console.log(mediaData)
  initializeMediaUpload()
    .then(appendFileChunk)
    .then(finalizeUpload)
    .then(publishStatusUpdate)

  function initializeMediaUpload() {
    return new Promise(function (resolve, reject) {
      client.post("media/upload", {
        command: "INIT",
        total_bytes: mediaSize,
        media_category: 'tweet_video',
        media_type: mediaType
      }, function (error, data, response) {
        if (error) {

          console.log(error)
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
            console.log(error)

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
            console.log(error)

            reject(JSON.parse(response.body).error);

          } else {
            resolve(mediaId)
          }
        })
      })

  }

  function publishStatusUpdate(mediaId) {
    console.log(mediaId)
    setTimeout(() => {
      if (mediaId)
        return new Promise(function (resolve, reject) {
          client.post("statuses/update", {
            status: "I tweeted from Node.js!",
            media_ids: mediaId
          }, function (error, data, response) {
            if (error) {
              console.log(error)
              // reject(error)
              reject(JSON.parse(response.body).error);
            } else {
              console.log("Successfully uploaded media and tweeted!")
              resolve(data)
            }
          })
        })
    }, 5000);
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
