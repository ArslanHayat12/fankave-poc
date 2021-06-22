import { useState, useRef, useCallback, useEffect, useContext } from "react"
import Webcam from "react-webcam"
import { RecordingIcon ,StopIcon} from "../../assets"
import {TestimonialContext} from '../../context/TestimonialContext'
import { setTestimonialUrl } from "../../actions/action"
import './style.css'

export const VideoRecorder = () => {
	const { state, dispatch } = useContext(TestimonialContext);
	const webcamRef = useRef(null)
	const mediaRecorderRef = useRef(null)
	const [capturing, setCapturing] = useState(false)
	const [recordedChunks, setRecordedChunks] = useState([])
	const [videoURL, setVideoURl] = useState("")
    const [error, setError] = useState('')

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

    const handleRecordAgain = useCallback(()=>{
        urlObjectCleanUp()
        setRecordedChunks([])
		setVideoURl("")
    }, [])

    const showAccessBlocked = useCallback((err)=>{
        typeof(err) === "object" ? setError('Access Blocked') : setError(err)
    }, [])

	useEffect(() => {
        //webm type video file created
		if (recordedChunks.length) {
			const blob = new Blob(recordedChunks, {
				type: "video/webm",
			})
			const url = window.URL.createObjectURL(blob)
			setVideoURl(url)
			dispatch(setTestimonialUrl(url));
		}
	}, [recordedChunks])

    const urlObjectCleanUp = useCallback(() => {
		//let browser discard video file reference
		videoURL && window.URL.revokeObjectURL(videoURL)
	}, [videoURL])

    //clean up video file reference on unmount
    useEffect(()=>{
        return () => {
            urlObjectCleanUp()
        }
    }, [])

	return (
		<div className='video-recording-container'>
			{!videoURL && (
				<>
					<Webcam
                        ref={webcamRef}
                        mirrored
                        videoConstraints={{
                            width: 335,
                            height: 524,
                        }}
                        width={335}
                        height={524}
                        style={{ objectFit: "cover"}}
                        onUserMediaError={showAccessBlocked}
                    />
					{capturing ? (
						<button onClick={handleStopCaptureClick} className="stop-button"><StopIcon /></button>
					) : (
						<button onClick={handleStartCaptureClick}  className="record-button"><RecordingIcon /></button>
					)}
				</>
			)}
			{/* {videoURL && (
                <><video
					controls
					width="100%"
					height="100%"
					disablePictureInPicture
					controlsList="nodownload nofullscreen noremoteplayback"
				>
					<source src={videoURL} />
				</video>
                <button onClick={handleRecordAgain}>Record Again</button>
                </>
				
			)} */}
            {error && <p>{error}</p>}
		</div>
	)
}
