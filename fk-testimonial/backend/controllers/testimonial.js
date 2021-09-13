const path = require('path');
const hbjs = require('handbrake-js')
const Twitter = require("twitter")
const testimonialservice = require('../services/testimonial');
const axios = require('axios');
const fs = require("fs")
const storage = require('node-sessionstorage')
const child_process = require('child_process');
const https = require("https");

const linkedInStorage = 'linkedin-auth';
const twitterStorage = 'twitter-auth';

const controller = {
    addVideoChunk: async function (req, res) {
        const fileName = req.file.filename;
        const outputFileName = fileName.replace(".webm", ".mp4")
        const fileId = req.body.id;
        const dir = fileId;


        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        const oldPath = fileName
        const newPath = `${dir}/${fileName}`

        fs.rename(oldPath, newPath, function (err) {
            if (err) throw err
            console.log(`File moved successfully to path: ${newPath}`)
        })

        hbjs.spawn({ input: newPath, output: newPath.replace(".webm", ".mp4") })
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
                    fs.appendFile(`${fileId}/chunksList.txt`, `\nfile ${outputFileName}`, function (err) {
                        if (err) {
                            res.send("ERROR in writing")
                        } else {
                            res.send("File uploaded successfully")
                        }
                    })
                    console.log('Finished processing' + outputFileName);
                });
            })

        // fs.renameSync(req.file.path, req.file.path.replace(fileName, 
        // req.body.id + path.extname(req.file.originalname)));
        // const start = new Date().getTime()
        // child_process.execFile('ffmpeg', [
        //     "-y", "-fflags", '+genpts', "-i",
        //     fileName,
        //     "-r", "24", fileName.replace(".webm", "-update.webm")
        // ], function (error, stdout, stderr) {
        //     const end = new Date().getTime() - start;
        //     console.log(end)

        //     if (!fs.existsSync(dir)) {
        //         fs.mkdirSync(dir);
        //     }
        //     const oldPath = fileName
        //     const newPath = `${dir}/${fileName.replace(".webm", "-update.webm")}`

        //     fs.rename(oldPath, newPath, function (err) {
        //         if (err) throw err
        //         console.log('Successfully renamed - AKA moved!')
        //     })

        //     fs.appendFile(`${fileId}/chunksList.txt`, `\nfile ${fileName.replace(".webm", "-update.webm")}`, function (err) {
        //         if (err) {
        //             res.send("ERROR in writing")
        //         } else {
        //             res.send("File uploaded successfully")
        //         }
        //     })

        // })

    },
    mergeVideoChunks: async function (req, res) {
        const fileId = req.body.id;
        const start = new Date().getTime()
        child_process.execFile('ffmpeg', [
            "-y", "-f", 'concat', "-i",
            `${fileId}/chunksList.txt`, '-c:v',
            "copy", `${fileId}.mp4`
        ], function (error, stdout, stderr) {
            const end = new Date().getTime() - start;
            console.log(end)

            if (!error) {
                fs.rmdir(fileId, { recursive: true }, (err) => {
                    if (err) {
                        throw err;
                    }
                    console.log(`${fileId} is deleted!`);
                });
                res.send({
                    fileName: `${fileId}.mp4`
                })
            } else {
                console.log("error: ", error)
                res.send("Files merging failed")
            }
        })
    },
    removeVideoChunk: async function (req, res) {
        const fileName = req.body.fileName;
        fs.unlink(`${fileName}`, function (err) {
            if (err) {
                throw err
            } else {
                res.send("File removed Successfully")
            }
        })
    },
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
                        mediaId = await testimonialservice(client).initializeMediaUpload(mediaSize, mediaType)
                    }
                    catch (err) {
                        console.log(err)
                        return res.send({ code: 324, message: 'Something wrong with the video 1' });
                    }
                    try {
                        mediaId = await testimonialservice(client).appendFileChunk(mediaId, mediaData)
                    }
                    catch (err) {
                        return res.send({ code: 324, message: 'Something wrong with the video 2' });
                    }
                    try {
                        mediaId = await testimonialservice(client).finalizeUpload(mediaId)
                    }
                    catch (err) {
                        return res.send({ code: 324, message: 'Something wrong with the video 3' });
                    }
                    try {
                        await testimonialservice(client).publishStatusUpdate(mediaId, req.body.tweetMessage, req.file.path)

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
        // wait for 2 second
        await (new Promise((resolve, reject) => setTimeout(() => resolve(true), 2000)));
        // waited for 2 second
        return controller.waitForValue(storagePath, currentTime + 2000, timeout);
    },
    getToken: async function (req, res) {
        // // await controller.waitForValue(twitterStorage)
        // // const value = await storage.getItem(twitterStorage)
        // req.session['token']
        res.send({ token: req.session['token'], tokenSecret: req.session['tokenSecret'] })
    },
    getLinkedInToken: async function (req, res) {
        // await controller.waitForValue(linkedInStorage)
        res.send({ token: req.session['token'], id: req.session['id'] })
        // res.send(storage.getItem(linkedInStorage))
    },
    userRedirect: function (req, res) {
        res.sendFile(path.join(__dirname, "../../", "close.html"));
    },
    sendTextMessageToLinkedIn: function (req, response) {
        console.log(req.file.path)
        let requestUrl = 'https://v1/api.linkedin.com/v2/shares';
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
        let requestUrl = 'https://v1/api.linkedin.com/v2/assets?action=registerUpload';

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

    },
    getVideoIntelligenceTranscription: async function (req, response) {
        const { videoUrl } = req.body
        const apiURL = 'https://dev.api.fankave.com/v1.0/cms/content/social'

        async function getAndPublishTranscription(filePath, apiURL) {
            const fullTranscript = await testimonialservice().handleTranscription(filePath);

            const id = await testimonialservice().getIdFromPath(videoUrl)
            console.log(id, fullTranscript)
            axios({
                method: 'patch',
                url: apiURL,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify([
                    {
                        id,
                        "caption": fullTranscript
                    }
                ])
            }).then(res => {
                console.log(res)
            }).catch(err => {
                console.log(err)
            })
        }

        if (videoUrl) {
            getAndPublishTranscription(videoUrl, apiURL)
            response.send("Transcription initiated")
        } else {
            response.status(400).send({ error: "Bad Data" })
        }
    },
    getTranscription: async function (req, response) {
        const { videoUrl } = req.body
        const apiURL = 'https://dev.api.fankave.com/v1.0/cms/content/social'
        async function getAndPublishTranscription(videoUrl, apiURL) {
            const id = await testimonialservice().getIdFromPath(videoUrl).replaceAll("?alt=media", "")
            await testimonialservice().createfileIfNotExists(id + ".mp4").then(() => {
                const file = fs.createWriteStream(id + ".mp4");
                https.get(videoUrl, async response => {
                    var stream = response.pipe(file);
                    stream.on("finish", async function () {
                        child_process.execFile('ffmpeg', [
                            "-y", "-i",
                            id + ".mp4", id + ".mp3"
                        ], async function (error, stdout, stderr) {

                            const fullTranscript = await testimonialservice().handleTranscription(`./${id}.mp3`);
                            console.log(fullTranscript)
                            axios({
                                method: 'patch',
                                url: apiURL,
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                data: JSON.stringify([
                                    {
                                        id,
                                        "caption": fullTranscript
                                    }
                                ])
                            }).then(res => {
                                console.log(res)
                            }).catch(err => {
                                console.log(err)
                            })
                            fs.unlinkSync(`./${id}.mp3`)
                            fs.unlinkSync(`./${id}.mp4`)
                        })
                    })
                })
            })
        }
        if (videoUrl) {
            getAndPublishTranscription(videoUrl, apiURL)
            response.send("Transcription initiated")
        } else {
            response.status(400).send({ error: "Bad Data" })
        }

    }


}
module.exports = controller;