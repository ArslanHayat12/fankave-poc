
const fs = require("fs")
const multer = require("multer");
// Imports the Google Cloud client library
const speech = require('@google-cloud/speech');



const methods = (client) => ({
    uploadFile: function () {
        // Multer storage options
        var storage = multer.diskStorage({

            destination: function (req, file, cb) {
                console.log("file: ", file)
                cb(null, __dirname + '../../../');
            },
            filename: function (req, file, cb) {
                console.log("file: ", file)
                cb(null, file.originalname + '-' + Date.now() + '.webm');
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
    },
    handleVideoIntelligenceTranscription: async function (gcsUri) {
        // Imports the Google Cloud Video Intelligence library
        const videoIntelligence = require('@google-cloud/video-intelligence');

        // Creates a client
        const client = new videoIntelligence.VideoIntelligenceServiceClient();

        async function analyzeVideoTranscript(gcsUri) {
            const videoContext = {
                speechTranscriptionConfig: {
                    languageCode: 'en-US',
                    enableAutomaticPunctuation: true,
                    speechContexts: [{
                        phrases: ['bevi'],
                        boost: "15"
                    }],
                },
            };

            const request = {
                inputUri: gcsUri,
                features: ['SPEECH_TRANSCRIPTION'],
                videoContext: videoContext,

            };

            const [operation] = await client.annotateVideo(request);
            console.log('Waiting for operation to complete...');
            const [operationResult] = await operation.promise();
            // There is only one annotation_result since only
            // one video is processed.
            const annotationResults = operationResult.annotationResults[0];
            let fullTranscript = ''

            for (const speechTranscription of annotationResults.speechTranscriptions) {
                // The number of alternatives for each transcription is limited by
                // SpeechTranscriptionConfig.max_alternatives.
                // Each alternative is a different possible transcription
                // and has its own confidence score.
                const alternatives = speechTranscription.alternatives || []
                const confidenceArray = alternatives.map(function (alternative) {
                    return alternative.confidence;
                })
                const alternativeIndex = methods().getIndexOfMaxConfidence(confidenceArray)
                fullTranscript = fullTranscript.concat(' ', alternatives[alternativeIndex].transcript)
            }
            return fullTranscript
        }

        return await analyzeVideoTranscript(gcsUri)
    },
    handleTranscription: async function (path) {
        const client = new speech.SpeechClient();
        const video = {
            content: fs.readFileSync(path).toString('base64'),
        };
        const config = {
            encoding: 'MP3',
            sampleRateHertz: 48000,
            languageCode: 'en-US',
            model: "video",
            enableSeparateRecognitionPerChannel: true,
            useEnhanced: true
        };
        const requests = {
            config: config,
            audio: video,
        };
        // Detects speech in the audio file. This creates a recognition job that you
        // can wait for now, or get its result later.
        const [operation] = await client.longRunningRecognize(requests);

        // Get a Promise representation of the final result of the job
        const [response] = await operation.promise();
        console.log(response.results)
        return response.results
            .map(result => result.alternatives[0].transcript)
            .join('\n');
    },
    getIdFromPath: (url = "") => {
        const fileName = url.split("/");
        if (fileName.length) {
            const id = fileName[fileName.length - 1].replace(".mp4", "");
            return id;
        }
        return "";
    },
    getIndexOfMaxConfidence: (confidenceArray) => {
        const indexOfMaxValue = confidenceArray.indexOf(Math.max(...confidenceArray));
        return indexOfMaxValue || 0
    },
    createfileIfNotExists: (file) => {
        return new Promise((resolve) => {
            fs.access(file, fs.constants.F_OK, (err) => {
                err ? resolve(false) : resolve(true)
            });
        })
    }


})
module.exports = methods