import { useState, useRef, useCallback, useEffect, useContext } from "react"
import Webcam from "react-webcam"
import { RecordingIcon, StopIcon } from "../../assets"
import { TestimonialContext } from "../../context/TestimonialContext"
import { SET_URL } from "../../constants"
import NotificationCard from "../NotificationCard/NotificationCard"
import { CustomTooltip as Tooltip } from "../Tooltip/Tooltip"
import QuestionsCard from "../QuestionsCard/QuestionsCard"
import "./style.css"

export const VideoRecorder = () => {
	const { dispatch } = useContext(TestimonialContext)
	const webcamRef = useRef(null)
	const mediaRecorderRef = useRef(null)
	const [isStreamInit, setIsStreamInit] = useState(false)
	const [capturing, setCapturing] = useState(false)
	const [recordedChunks, setRecordedChunks] = useState([])
	const [videoURL, setVideoURl] = useState("")
	const [error, setError] = useState("")
	const [showNotification, setShowNotification] = useState(false)

	const videoWidth = (window.innerWidth > 0) ? window.innerWidth : window.screen.width

	const handleStartCaptureClick = useCallback(() => {
		setCapturing(true)
		mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
			mimeType: "video/webm",
		})
		mediaRecorderRef.current.addEventListener(
			"dataavailable",
			handleDataAvailable
		)
		mediaRecorderRef.current.start()
	}, [webcamRef, setCapturing, mediaRecorderRef])

	const handleDataAvailable = useCallback(
		({ data }) => {
			if (data.size > 0) {
				setRecordedChunks((prev) => prev.concat(data))
			}
		},
		[setRecordedChunks]
	)

	const handleStopCaptureClick = useCallback(() => {
		mediaRecorderRef.current.stop()
		setCapturing(false)
	}, [mediaRecorderRef, webcamRef, setCapturing])

	const showAccessBlocked = useCallback((err) => {
		typeof err === "object"
			? setError("Access Blocked") && setShowNotification(true)
			: setError(err)
	}, [])

	useEffect(() => {
		//webm type video file created
		if (recordedChunks.length) {
			const blob = new Blob(recordedChunks, {
				type: "video/webm",
			})
			const url = window.URL.createObjectURL(blob)
			setVideoURl(url)
			dispatch({
				type: SET_URL,
				payload: url,
			})
		}
	}, [recordedChunks])

	return (
		<>
			<figure className="video-wrapper">
				<div className="video-recording-container">
					{!videoURL && (
						<>
							<Webcam
								ref={webcamRef}
								mirrored
								videoConstraints={{
									width: videoWidth > 400 ? 335 : 313,
									height: 524,
								}}
								width={videoWidth > 400 ? 335 : 313}
								height={524}
								style={{ objectFit: "cover" }}
								onUserMedia={() => setIsStreamInit(true)}
								onUserMediaError={showAccessBlocked}
							/>
						</>
					)}
					{error && (
						<NotificationCard
							openModal={error ? true : false}
							//   handlePermission={allowCameraPermission}
						/>
					)}
				</div>

				<article className="testimonial-questions-wrapper">
					<QuestionsCard />
				</article>
			</figure>
			{(capturing || isStreamInit) && (
				<div className="button-container">
					{capturing ? (
						<Tooltip content="Stop" placement="right">
							<button onClick={handleStopCaptureClick} className="stop-button">
								<StopIcon />
							</button>
						</Tooltip>
					) : isStreamInit ? (
						<Tooltip content="Start" placement="right">
							<button
								onClick={handleStartCaptureClick}
								className="record-button"
							>
								<RecordingIcon />
							</button>
						</Tooltip>
					) : null}
				</div>
			)}
		</>
	)
}
