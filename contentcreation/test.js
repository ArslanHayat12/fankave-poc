const child_process = require('child_process');

child_process.execFile('ffmpeg', [
    "-y", "-i",
    '2715-1630665716/blob-1630675020852-update.webm',"-pix_fmt","yuv420p",
    "-crf","18", "2715-1630665716/blob-1630675020852-update2.webm"
], function (error, stdout, stderr) {
    const end = new Date().getTime() ;
    console.log(end)
})