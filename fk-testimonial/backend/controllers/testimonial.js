const path = require('path');
const hbjs = require('handbrake-js')
const Twitter = require("twitter")
const testimonialService = require('../services/testimonial');
const axios = require('axios');
const fs = require("fs")
const storage = require('node-sessionstorage')

const linkedInStorage = 'linkedin-auth';
const twitterStorage = 'twitter-auth';

const controller = {
    sendTweet: async function (req, res) {
        const inFilename = req.file.path;
        const outFilename = "video.mp4";
        const client = await new Twitter({
            consumer_key: process.env.CONSUMER_KEY,
            consumer_secret: process.env.CONSUMER_SECRET,
            access_token_key: req.headers.authorization,
            access_token_secret: req.headers.tokensecret
        })
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
                setTimeout(async () => {
                    let mediaId = 0;
                    const outFilename = "video.mp4";
                    const mediaData = fs.readFileSync(outFilename)
                    const mediaSize = fs.statSync(outFilename).size
                    const mediaType = "video/mp4"
                    try {
                        mediaId = await testimonialService(client).initializeMediaUpload(mediaSize, mediaType)
                    }
                    catch (err) {
                        console.log(err)
                        return res.send({ code: 324, message: 'Something wrong with the video 1' });
                    }
                    try {
                        mediaId = await testimonialService(client).appendFileChunk(mediaId, mediaData)
                    }
                    catch (err) {
                        return res.send({ code: 324, message: 'Something wrong with the video 2' });
                    }
                    try {
                        mediaId = await testimonialService(client).finalizeUpload(mediaId)
                    }
                    catch (err) {
                        return res.send({ code: 324, message: 'Something wrong with the video 3' });
                    }
                    try {
                        await testimonialService(client).publishStatusUpdate(mediaId, req.body.tweetMessage, req.file.path)

                        if (storage.getItem(twitterStorage)) storage.removeItem(twitterStorage)
                        res.send({ status: 200, message: "Tweet Sent" })
                    } catch (err) {
                        console.log(err)
                        res.send({ code: 324, message: 'Not valid video' });
                    }
                    console.log('Finished processing');
                });
            }, 5000)

    },
    ping: function (req, res) {
        return res.send("pong");
    },
    initialRedirect: function (req, res) {
        res.sendFile(path.join(__dirname, "../../build/static", "index.html"));
    },
    waitForValue: async function (storagePath, currentTime = 0, timeout = 5000) {
        if (storage.getItem(storagePath)) return true;
        if (currentTime === timeout) return false;
        // wait for 1 second
        await (new Promise((resolve, reject) => setTimeout(() => resolve(true), 1000)));
        // waited for 1 second
        return controller.waitForValue(storagePath, currentTime + 1000, timeout);
    },
    getToken: async function (req, res) {
        await controller.waitForValue(twitterStorage)
        res.send(storage.getItem(twitterStorage))
    },
    getLinkedInToken: async function (req, res) {
        await controller.waitForValue(linkedInStorage)
        res.send(storage.getItem(linkedInStorage))
    },
    addStaticFile: function (req, res) {
        res.sendFile(path.join(__dirname, "../../build/static/", 'testimonial-poc.js'));
    },
    userRedirect: function (req, res) {
        res.sendFile(path.join(__dirname, "../../", "close.html"));
    },
    sendTextMessageToLinkedIn: function (req, response) {
        console.log(req.file.path)
        let requestUrl = 'https://api.linkedin.com/v2/shares';
        const title = "First Message";
        let shareUrl = "https://i.pinimg.com/originals/af/8d/63/af8d63a477078732b79ff9d9fc60873f.jpg"
        let shareThumbnailUrl = "git checkout "
        let body = {
            "owner": "urn:li:person:" + req.headers.id,
            "subject": title,
            "text": {
                "text": req.body.tweetMessage || "No text" // max 1300 characters
            },
            "content": {
                "contentEntities": [{
                    "entityLocation": shareUrl,
                    "thumbnails": [{
                        "resolvedUrl": shareThumbnailUrl
                    }]
                }],
                "title": title
            },
            "distribution": {
                "linkedInDistributionTarget": {}
            }
        }
        let headers = {
            'Authorization': 'Bearer ' + req.headers.authorization,
            'cache-control': 'no-cache',
            'X-Restli-Protocol-Version': '2.0.0',
            'Content-Type': 'application/json',
            'x-li-format': 'json',
            'Content-Length': Buffer.byteLength(JSON.stringify(body))
        };

        return axios({ method: 'post', url: requestUrl, headers, data: JSON.stringify(body) })
            .then((data) => {
                if (storage.getItem(linkedInStorage)) storage.removeItem(linkedInStorage);
                fs.unlinkSync(req.file.path)
                return response.send({ status: 200, data });
            })
            .catch((error) => { console.log(error); return response.send(error) })


    },
    sendVideoMessageToLinkedIn: function (req, response) {

        var outFilename = "test.mp4";
        const mediaData = fs.readFileSync(outFilename)
        let requestUrl = 'https://api.linkedin.com/v2/assets?action=registerUpload';

        let body = {
            "registerUploadRequest": {
                "owner": "urn:li:person:" + req.headers.id,
                "recipes": [
                    "urn:li:digitalmediaRecipe:feedshare-video"
                ],
                "serviceRelationships": [
                    {
                        "identifier": "urn:li:userGeneratedContent",
                        "relationshipType": "OWNER"
                    }
                ],
                supportedUploadMechanism: ['SYNCHRONOUS_UPLOAD'],
            }
        }
        let headers = {
            'Authorization': 'Bearer ' + req.headers.authorization,
            'cache-control': 'no-cache',
            'X-Restli-Protocol-Version': '2.0.0',
            'Content-Type': 'application/json',
            'x-li-format': 'json',
            'Content-Length': Buffer.byteLength(JSON.stringify(body))
        };
        return axios({ method: 'post', url: requestUrl, headers, data: JSON.stringify(body) })
            .then((data) => {
                const url = data.data.value.uploadMechanism['com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest'].uploadUrl
                const assetId = data.data.value.asset
                console.log(assetId)
                return { url, assetId };
            }).then(({ url, assetId }) => {
                console.log(assetId)
                return axios.put(url, mediaData, {
                    headers: {
                        "x-amz-server-side-encryption-aws-kms-key-id": "ignore",
                        "x-amz-server-side-encryption": "aws:kms",
                        "Content-Type": "application/octet-stream"
                    },
                })
            }).then((data) => {
                if (storage.getItem(linkedInStorage)) storage.removeItem(linkedInStorage);
                fs.unlinkSync(req.file.path)
                response.send({ data: data })
            })
            .catch((data) => { response.send(data) })

    }

}
module.exports = controller;