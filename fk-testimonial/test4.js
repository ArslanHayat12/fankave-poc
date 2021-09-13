const speech = require('@google-cloud/speech');
const fs = require('fs');
const client = new speech.SpeechClient();

async function test() {

    const video = {
        content: fs.readFileSync("./2.mp3").toString('base64'),
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
    console.log("finish")
    // Detects speech in the audio file. This creates a recognition job that you
    // can wait for now, or get its result later.
    const [operation] = await client.longRunningRecognize(requests);

    // Get a Promise representation of the final result of the job
    const [response] = await operation.promise();
    console.log(JSON.stringify(response, null, 3))
    const transcription = response.results
        .map(result => result.alternatives[0].transcript)
        .join('\n');
    console.log(`Transcription: ${transcription}`);

}

test()