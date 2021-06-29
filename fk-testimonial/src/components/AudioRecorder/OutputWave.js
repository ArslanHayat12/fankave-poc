import { useEffect, useRef, useContext } from "react";

export const OutputWave = (props) => {
  const { audioRef } = props;
  //canvas ref required in drawing
  const canvasRef = useRef(null);

  useEffect(() => {
    var context = new AudioContext();

    var src = context.createMediaElementSource(audioRef?.current.soundCloudAudio.audio);
    var analyser = context.createAnalyser();

    const canvas = canvasRef.current;

    src.connect(analyser);

    var ctx = canvas.getContext("2d");

    analyser.connect(context.destination);

    analyser.fftSize = 256;

    var bufferLength = analyser.frequencyBinCount;

    var dataArray = new Uint8Array(bufferLength);

    draw();

    function draw() {
      const WIDTH = canvas.width;
      const HEIGHT = canvas.height;

      requestAnimationFrame(draw);

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
      className="visualizer"
      height="80px"
      style={{
        display: "block",
        position: "absolute",
        left: "-28px",
        right: "0",
        bottom: "-27.5px",
        width: "391px",
        zIndex: 0,
        border: "0 0 5px 5px",
      }}
    ></canvas>
  );
};