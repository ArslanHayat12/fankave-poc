import React, { useCallback, useEffect, useRef, useContext } from "react";
import "./style.css";
import { ThemeContext } from "styled-components";

export const Visualizer = (props) => {
  //receives stream initialized in useRecorder, and isAudioPlaying to show canvas

  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  const { stream, isAudioPlaying } = props;
  const frameRef = useRef();
  const sourceRef = useRef();
  const analyserRef = useRef();
  //canvas ref required in drawing
  const canvasRef = useRef(null);

  const theme = useContext(ThemeContext);

  // const {
  //   default: {
  //     widget: {
  //       recordingScreen: {
  //         audio: {
  //           micIcon: { canvasPrimaryColor, canvasSecondaryColor, stroke },
  //         },
  //       },
  //     },
  //   },
  // } = theme;

  const canvasPrimaryColor = "#add8e6";
  const canvasSecondaryColor = "#93cbde";
  const stroke = "#90d4ff";

  console.log("theme", canvasPrimaryColor);

  const cleanUpFunction = useCallback(() => {
    cancelAnimationFrame(frameRef.current);
    analyserRef.current?.disconnect();
    sourceRef.current?.disconnect();
  }, [frameRef, sourceRef, analyserRef]);

  useEffect(() => {
    return () => {
      cleanUpFunction();
    };
  }, []);

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

      source?.connect(analyser);
      sourceRef.current = source;

      drawCircle();
      function drawCircle() {
        const WIDTH = canvas.width;
        const HEIGHT = canvas.height;

        const CENTERX = canvas.width / 2;
        const CENTERY = canvas.height / 2;

        analyser.fftSize = 32;
        analyserRef.current = analyser;

        let bufferLength = analyser.frequencyBinCount;
        let dataArray = new Uint8Array(bufferLength);

        canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

        let draw = () => {
          frameRef.current = requestAnimationFrame(draw);

          analyser.getByteFrequencyData(dataArray);
          canvasCtx.fillStyle = "transparent";
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
          gradient.addColorStop(0.1, canvasPrimaryColor);
          gradient.addColorStop(0.4, canvasSecondaryColor);
          gradient.addColorStop(0.7, canvasSecondaryColor);
          gradient.addColorStop(0.9, canvasPrimaryColor);
          gradient.addColorStop(1, canvasPrimaryColor);

          let radius = dataArray[2] / 2;
          if (radius < 20) radius = 20;
          if (radius > 100) radius = 100;
          canvasCtx.beginPath();
          canvasCtx.arc(CENTERX, CENTERY, radius, 0, 2 * Math.PI, false);
          canvasCtx.fillStyle = gradient;
          canvasCtx.fill();
          canvasCtx.lineWidth = 10;
          canvasCtx.strokeStyle = stroke;
          canvasCtx.stroke();
        };
        draw();
      }
    }
  }, [stream, isAudioPlaying]);

  return (
    <canvas
      ref={canvasRef}
      className="record-visualizer"
      height="250px"
      id="fk-record-visualizer"
    ></canvas>
  );
};