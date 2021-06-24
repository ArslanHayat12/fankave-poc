import { useCallback, useEffect, useRef, useState } from "react"

export const Visualizer = (props) => {
	//receives stream initialized in useRecorder, and isAudioPlaying to show canvas
	const { stream, isAudioPlaying } = props
	const frameRef = useRef()
	const sourceRef = useRef()
	const analyserRef = useRef()
	//canvas ref required in drawing
	const canvasRef = useRef(null)

	const cleanUpFunc = useCallback(() => {
		cancelAnimationFrame(frameRef.current)
		analyserRef.current.disconnect()
		sourceRef.current.disconnect()
	}, [frameRef, sourceRef, analyserRef])

	useEffect(() => {
		return () => {
			cleanUpFunc()
		}
	}, [])

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

			source.connect(analyser)
			sourceRef.current = source

			drawCircle()
			function drawCircle() {
				const WIDTH = canvas.width
				const HEIGHT = canvas.height

				const CENTERX = canvas.width / 2
				const CENTERY = canvas.height / 2

				analyser.fftSize = 32
				analyserRef.current = analyser
				let bufferLength = analyser.frequencyBinCount
				let dataArray = new Uint8Array(bufferLength)

				canvasCtx.clearRect(0, 0, WIDTH, HEIGHT)

				let draw = () => {
					frameRef.current = requestAnimationFrame(draw)
					analyser.getByteFrequencyData(dataArray)
					canvasCtx.fillStyle = "rgb(0, 0, 0)"
					canvasCtx.fillRect(0, 0, WIDTH, HEIGHT)

					let radius = dataArray[2] / 2
					if (radius < 20) radius = 20
					if (radius > 100) radius = 100
					console.log("Radius ", radius)
					canvasCtx.beginPath()
					canvasCtx.arc(CENTERX, CENTERY, radius, 0, 2 * Math.PI, false)
					canvasCtx.fillStyle = "rgb(50,50," + (radius + 100) + ")"
					canvasCtx.fill()
					canvasCtx.lineWidth = 5
					canvasCtx.strokeStyle = "rgb(50,50," + (radius + 100) + ")"
					canvasCtx.stroke()
				}
				draw()
			}
		}
	}, [stream, isAudioPlaying])

	return isAudioPlaying ? (
		<canvas
			ref={canvasRef}
			className="visualizer"
			height="60px"
			// style={{ display: "none" }}
		></canvas>
	) : null
}
