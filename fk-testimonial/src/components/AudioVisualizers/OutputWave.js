import { useEffect, useRef, useCallback } from "react";
import "./style.css";

export const OutputWave = (props) => {
  var context = new (window.AudioContext || window.webkitAudioContext)();
  const { audioRef } = props;
  const frameRef = useRef();
  const sourceRef = useRef();
  const analyserRef = useRef();
  //canvas ref required in drawing
  const canvasRef = useRef(null);

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
    var src = context.createMediaElementSource(
      audioRef.current
    );
    var analyser = context.createAnalyser();

    const canvas = canvasRef.current;

    src.connect(analyser);
    sourceRef.current = src;

    var ctx = canvas.getContext("2d");

    analyser.connect(context.destination);

    analyser.fftSize = 256;
    analyserRef.current = analyser;

    var bufferLength = analyser.frequencyBinCount;

    var dataArray = new Uint8Array(bufferLength);

    draw();

    function draw() {
      const WIDTH = canvas.width;
      const HEIGHT = canvas.height;

      frameRef.current = requestAnimationFrame(draw);

      analyser.getByteFrequencyData(dataArray);

      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, WIDTH, HEIGHT);
      ctx.strokeStyle = "#35a4ff";
      ctx.lineWidth = 1;
      ctx.beginPath();

      let sliceWidth = (WIDTH * 5.0) / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        let v = dataArray[i] / 128.0;
        let y = (v * HEIGHT) / 2;

        if (i === 0) {
          ctx.moveTo(x, y);
          ctx.fillStyle = "#cce7ff";
        } else {
          ctx.lineTo(x, y);
          ctx.fillStyle = "#cce7ff";
        }
        x += sliceWidth;
      }

      ctx.lineTo(canvas.width, 100);

      ctx.lineTo(0, 100);
      ctx.fill();

      ctx.strokeStyle = "#cce7ff";
      ctx.stroke();
    }
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="preview-visualizer"
      height="80px"
    ></canvas>
  );
};
