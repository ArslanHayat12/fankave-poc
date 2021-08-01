
const fs = require("fs")
const multer = require("multer");



const methods = (client) => ({
    uploadFile: function () {
        // Multer storage options
        var storage = multer.diskStorage({

            destination: function (req, file, cb) {
                cb(null, __dirname + '../../../');
            },
            filename: function (req, file, cb) {
                cb(null, file.originalname + '-' + Date.now() + '.mp4');
            }
        });
        var upload = multer({ storage: storage });

        return upload.single('media');

    },
    initializeMediaUpload: function (mediaSize, mediaType) {
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
    },
    appendFileChunk: function (mediaId, mediaData) {
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
    },
    finalizeUpload: function (mediaId) {
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

    },

    publishStatusUpdate: function (mediaId, tweetMessage, filePath) {
        if (mediaId)
            setTimeout(() => {
                return new Promise(function (resolve, reject) {
                    client.post("statuses/update", {
                        status: tweetMessage,
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
        fs.unlinkSync(filePath)
    }
})
module.exports = methods