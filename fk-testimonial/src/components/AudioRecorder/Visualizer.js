import { useCallback, useEffect, useRef, useState } from "react"

export const Visualizer = (props) => {
  //receives stream initialized in useRecorder, and isAudioPlaying to show canvas
  const { stream, isAudioPlaying } = props;
  //canvas ref required in drawing
  const canvasRef = useRef(null);

  useEffect(() => {
    //analysis and drawing should be done when stream initialized and also when an audio is playing
    //if isAudioPlaying condition is not added, the analysis will run on stream even when not recording/playing
    if (stream && isAudioPlaying) {
      let audioCtx;
      const canvas = canvasRef.current;
      const canvasCtx = canvas.getContext("2d");

      if (!audioCtx) {
        audioCtx = new AudioContext();
      }

      const source = audioCtx.createMediaStreamSource(stream);

      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 2048;
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      source.connect(analyser);
      //analyser.connect(audioCtx.destination);

      draw();

      function draw() {
        const WIDTH = canvas.width;
        const HEIGHT = canvas.height;

        requestAnimationFrame(draw);

        analyser.getByteTimeDomainData(dataArray);

        canvasCtx.fillStyle = "transparent";
        canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

        canvasCtx.lineWidth = 2;
        canvasCtx.strokeStyle = "#e85757";

        canvasCtx.beginPath();

        let sliceWidth = (WIDTH * 1.0) / bufferLength;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
          let v = dataArray[i] / 128.0;
          let y = (v * HEIGHT) / 2;

          if (i === 0) {
            canvasCtx.moveTo(x, y);
          } else {
            canvasCtx.lineTo(x, y);
          }

          x += sliceWidth;
        }

        canvasCtx.lineTo(canvas.width, canvas.height / 2);
        canvasCtx.stroke();
      }

      drawCircle();
      function drawCircle() {
        const WIDTH = canvas.width;
        const HEIGHT = canvas.height;

        const CENTERX = canvas.width / 2;
        const CENTERY = canvas.height / 2;

        analyser.fftSize = 32;
        let bufferLength = analyser.frequencyBinCount;
        let dataArray = new Uint8Array(bufferLength);

        canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

        let draw = () => {
          requestAnimationFrame(draw);

          analyser.getByteFrequencyData(dataArray);
          canvasCtx.fillStyle = "#fff";
          canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

          var gradient = canvasCtx.createLinearGradient(
            0,
            110,
            90,
            30,
            100,
            100,
            70
          );

          // Add three color stops
          gradient.addColorStop(0.1, "#e97272");
          gradient.addColorStop(0.4, "#e77e7e");
          gradient.addColorStop(0.7, "#e77e7e");
          gradient.addColorStop(0.9, "#e77e7e");
          gradient.addColorStop(1, "#e97272");

          let radius = dataArray[2] / 2;
          if (radius < 20) radius = 20;
          if (radius > 100) radius = 100;
          console.log("Radius ", radius);
          canvasCtx.beginPath();
          canvasCtx.arc(CENTERX, CENTERY, radius, 0, 2 * Math.PI, false);
          canvasCtx.fillStyle = gradient;
          canvasCtx.fill();
          canvasCtx.lineWidth = 5;
          canvasCtx.strokeStyle = "#e7a9a9";
          canvasCtx.stroke();
        };
        draw();
      }
    }
  }, [stream, isAudioPlaying]);

  return isAudioPlaying ? (
    <canvas
      ref={canvasRef}
      className="visualizer"
      height="250px"
      style={{
        position: "absolute",
        top: "14.5%",
        display: "flex",
        alignItems: "end",
        zIndex: "-1",
        left: " 0",
        right: "0",
        margin: "auto",
      }}
    ></canvas>
  ) : null;
};
