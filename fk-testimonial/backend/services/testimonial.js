
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
                const fileType = file.mimetype.split("/").pop()
                console.log("UPLOADDD fileType: ", file, fileType)
                cb(null, file.originalname + '-' + Date.now() + `.${fileType}`);
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
    handleTranscription: async function(gcsUri) {
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
            const fullTranscript = []

            for (const speechTranscription of annotationResults.speechTranscriptions) {
                // The number of alternatives for each transcription is limited by
                // SpeechTranscriptionConfig.max_alternatives.
                // Each alternative is a different possible transcription
                // and has its own confidence score.
                console.log(speechTranscription)
                for (const alternative of speechTranscription.alternatives) {
                    const transcriptedSentence = { 
                        transcript: alternative.transcript, 
                        confidence: alternative.confidence 
                    }
                    fullTranscript.push(transcriptedSentence)
                    
                }
            }
            return fullTranscript
        }

        return await analyzeVideoTranscript(gcsUri)
    }
})
module.exports = methods