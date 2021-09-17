import React, { useState, useRef, useCallback, useEffect } from 'react'
import Webcam from 'react-webcam'
import { useInterval } from './../../hooks/useInterval'
import { convertSecondsToHourMinute } from './../../utils'
import { RecordingIcon, StopIcon } from '../../assets'
import { VideoCaptureStyled } from './style'

export const Capture = ({ onCapture }) => {
  const webcamRef = useRef(null)
  const mediaRecorderRef = useRef(null)
  const cameraWrapper = React.useRef(null)

  let [timer, setTimer] = useState(0)
  let [videoConstraints, setVideoConstraints] = useState({
    width: 0,
    height: 0,
  })

  const [isStreamInit, setIsStreamInit] = useState(false)
  const [capturing, setCapturing] = useState(false)
  const [recordedChunks, setRecordedChunks] = useState([])
  const [videoURL, setVideoURl] = useState('')
  const [error, setError] = useState('')
  // const [showNotification, setShowNotification] = useState(false);
  const [recordingTime, setTime] = useState(0)
  const recordingTimeRef = useRef()
  recordingTimeRef.current = recordingTime
  const [thumbUri, setThumbUri] = useState('')

  const decrementTime = (currentTime) => {
    return 20 - parseInt(currentTime)
  }

  useInterval(() => {
    // console.log('recording time', recordingTime);
    if (capturing && recordingTime >= 20) {
      handleStopCaptureClick()
    }
    capturing && setTime(recordingTime + 1)
  }, 1000)

  const handleDataAvailable = useCallback(
    ({ data }) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data))
      }
    },
    [setRecordedChunks]
  )

  const handleStartCaptureClick = useCallback(() => {
    setCapturing(true)
    let options = { mimeType: 'video/webm' }
    if (typeof MediaRecorder.isTypeSupported == 'function') {
      if (MediaRecorder.isTypeSupported('video/webm')) {
        options = { mimeType: 'video/webm' }
      } else if (MediaRecorder.isTypeSupported('video/mp4')) {
        //Safari 14.0.2 has an EXPERIMENTAL version of MediaRecorder enabled by default
        options = { mimeType: 'video/mp4' }
      }
    }
    mediaRecorderRef.current = new MediaRecorder(
      webcamRef.current.stream,
      options
    )
    mediaRecorderRef.current.addEventListener(
      'dataavailable',
      handleDataAvailable
    )
    mediaRecorderRef.current.start()
  }, [webcamRef, setCapturing, mediaRecorderRef, handleDataAvailable])

  const handleStopCaptureClick = useCallback(() => {
    mediaRecorderRef.current.stop()
    setCapturing(false)
    setThumbUri(webcamRef?.current?.getScreenshot())
  }, [mediaRecorderRef, webcamRef, setCapturing])

  const showAccessBlocked = useCallback((err) => {
    if (typeof err === 'object') {
      setError(
        'Please Allow Camera & Mic Permission and Refresh page to continue'
      )
    } else {
      setError(
        'Please Allow Camera & Mic Permission and Refresh page to continue'
      )
    }
  }, [])

  const startCapture = () => {
    let time = 0
    const id = setInterval(() => {
      if (time === 3) {
        clearInterval(id)
        setTimer(0)
        time = 0
        return handleStartCaptureClick()
      }
      setTimer(3 - time)
      time = time + 1
    }, 1000)
  }

  useEffect(() => {
    if (cameraWrapper.current) {
      setVideoConstraints({
        width: cameraWrapper.current.clientWidth,
        height: cameraWrapper.current.clientHeight,
      })
    }
  }, [])

  useEffect(() => {
    //webm type video file created
    if (recordedChunks.length) {
      let options = { type: 'video/webm' }
      if (typeof MediaRecorder.isTypeSupported == 'function') {
        if (MediaRecorder.isTypeSupported('video/webm')) {
          options = { type: 'video/webm' }
        } else if (MediaRecorder.isTypeSupported('video/mp4')) {
          //Safari 14.0.2 has an EXPERIMENTAL version of MediaRecorder enabled by default
          options = { type: 'video/mp4' }
        }
      }

      const blob = new Blob(recordedChunks, options)

      let url = window.URL.createObjectURL(blob)
      try {
        url = window.webkitURL.createObjectURL(blob)
      } catch {
        url = window.URL.createObjectURL(blob)
      }
      setVideoURl(url)
      onCapture(url, thumbUri, recordingTime, videoConstraints)
    }
    // eslint-disable-next-line
  }, [recordedChunks])

  return (
    <VideoCaptureStyled className="fk-video-capture-wrapper">
      {error ? (
        <div className="camera-error">{error}</div>
      ) : (
        !videoURL && (
          <div className="video-capture" ref={cameraWrapper}>
            <Webcam
              ref={webcamRef}
              videoConstraints={videoConstraints}
              width={videoConstraints.width}
              height={videoConstraints.height}
              style={{ objectFit: 'cover' }}
              onUserMedia={() => setIsStreamInit(true)}
              onUserMediaError={showAccessBlocked}
            />
          </div>
        )
      )}
      {timer ? (
        <div className={`capture-overlay`} style={videoConstraints}>
          {timer}
        </div>
      ) : (
        <></>
      )}
      {capturing && (
        <>
          <div className="timer-overlay">
            {convertSecondsToHourMinute(String(decrementTime(recordingTime)))}
          </div>
          <button className="stop-button" onClick={handleStopCaptureClick}>
            <StopIcon />
          </button>
        </>
      )}
      {isStreamInit && !capturing && (
        <button className="capture-button" onClick={startCapture}>
          <RecordingIcon />
        </button>
      )}
    </VideoCaptureStyled>
  )
}
