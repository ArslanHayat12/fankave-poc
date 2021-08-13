const child_process = require('child_process');
const start = new Date().getTime()
child_process.execFile('ffmpeg', [
    "-y", '-i', "3.MOV",
    '-vf', 'scale=iw/4:ih/4',
    "1.mp4"
], function (error, stdout, stderr) {
    const end = new Date().getTime() - start;
    console.log(end)
})