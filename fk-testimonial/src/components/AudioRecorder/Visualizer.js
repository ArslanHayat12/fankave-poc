import { useEffect, useRef } from "react"

export const Visualizer = (props) => {
    //receives stream initialized in useRecorder, and isAudioPlaying to show canvas
	const { stream, isAudioPlaying } = props
    //canvas ref required in drawing
	const canvasRef = useRef(null)

	useEffect(() => {
        //analysis and drawing should be done when stream initialized and also when an audio is playing
        //if isAudioPlaying condition is not added, the analysis will run on stream even when not recording/playing
		if (stream && isAudioPlaying) {
			let audioCtx
			const canvas = canvasRef.current
			const canvasCtx = canvas.getContext("2d")

			if (!audioCtx) {
				audioCtx = new AudioContext()
			}

			const source = audioCtx.createMediaStreamSource(stream)

			const analyser = audioCtx.createAnalyser()
			analyser.fftSize = 2048
			const bufferLength = analyser.frequencyBinCount
			const dataArray = new Uint8Array(bufferLength)

			source.connect(analyser)
			//analyser.connect(audioCtx.destination);

			draw()

			function draw() {
				const WIDTH = canvas.width
				const HEIGHT = canvas.height

				requestAnimationFrame(draw)

				analyser.getByteTimeDomainData(dataArray)

				canvasCtx.fillStyle = "rgb(200, 200, 200)"
				canvasCtx.fillRect(0, 0, WIDTH, HEIGHT)

				canvasCtx.lineWidth = 2
				canvasCtx.strokeStyle = "rgb(0, 0, 0)"

				canvasCtx.beginPath()

				let sliceWidth = (WIDTH * 1.0) / bufferLength
				let x = 0

				for (let i = 0; i < bufferLength; i++) {
					let v = dataArray[i] / 128.0
					let y = (v * HEIGHT) / 2

					if (i === 0) {
						canvasCtx.moveTo(x, y)
					} else {
						canvasCtx.lineTo(x, y)
					}

					x += sliceWidth
				}

				canvasCtx.lineTo(canvas.width, canvas.height / 2)
				canvasCtx.stroke()
			}
		}
	}, [stream, isAudioPlaying])

	return isAudioPlaying ? (
		<canvas
			ref={canvasRef}
			className="visualizer"
			height="60px"
			style={{ display: "none" }}
		></canvas>
	) : null
}
