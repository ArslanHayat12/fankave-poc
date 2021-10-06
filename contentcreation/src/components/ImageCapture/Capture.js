import React, { useCallback, useEffect, useState } from 'react'
import Webcam from 'react-webcam'

import { getCanvasImageSize } from '../../utils'
import { RecordingIcon } from '../../assets'
import { CaptureStyled } from "./style"

export const Capture = ({ onCapture, enableFilters = false }) => {
  const webcamRef = React.useRef(null)
  const canvasRef = React.useRef(null)
  const cameraWrapper = React.useRef(null)
  let [timer, setTimer] = useState(0)
  let [videoConstraints, setVideoConstraints] = useState({
    width: 0,
    height: 0,
  })
  let [error, setError] = useState('')
  const showAccessBlocked = useCallback((err) => {
    if (typeof err === 'object') {
      setError('Please Allow Camera Permission and Refresh page to continue')
      // props.setError('Please Allow Camera Permission to Continue')
    } else {
      setError('Please Allow Camera Permission and Refresh page to continue')
    }
  }, [])

  const startCapture = () => {
    let time = 0
    const id = setInterval(() => {
      if (time === 3) {
        clearInterval(id)
        setTimer(0)
        time = 0
        return capture()
      }
      setTimer(3 - time)
      time = time + 1
    }, 1000)
  }

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot()
    const image = new Image()
    image.crossOrigin = 'Anonymous'
    image.src = imageSrc
    image.onload = function () {
      const { width, height } = getCanvasImageSize(image, {
        width: videoConstraints.width,
        height: videoConstraints.height,
      })

      const ctx = canvasRef.current.getContext('2d')
      ctx.drawImage(image, 0, 0, width, height)

      const src = canvasRef.current.toDataURL('image/jpeg', 1.0)
      onCapture(src, videoConstraints)
    }
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
    let video = document.getElementById('camera')
    const canvas = canvasRef.current
    const ctx = canvasRef.current.getContext('2d')
    function renderFrame() {
      // re-register callback
      requestAnimationFrame(renderFrame)
      // set internal canvas size to match HTML element size
      canvas.width = canvas.scrollWidth
      canvas.height = canvas.scrollHeight
      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        // scale and horizontally center the camera image
        var canvasSize = { width: canvas.width, height: canvas.height }
        // var renderSize = calculateSize(videoSize, canvasSize);
        var renderSize = { width: 340, height: 450 }
        var xOffset = (canvasSize.width - renderSize.width) / 2
        ctx.drawImage(video, xOffset, 0, renderSize.width, renderSize.height)
      }
    }
    requestAnimationFrame(renderFrame)
  })

  if (!(window.MediaRecorder || window.webkitMediaRecorder)) {
    return (
      <div className="error">
        Unfortunately, this browser does not support the web technology that
        powers this app. We recommend desktop Chrome or Firefox.
      </div>
    )
  }

  return (
    <CaptureStyled className="fk-image-capture-wrapper">
      {error ? (
        <div className="camera-error">{error}</div>
      ) : (
        <div
          className="image-capture"
          style={{ ...(enableFilters ? { height: '300px' } : {}) }}
          ref={cameraWrapper}
        >
          <Webcam
            id="camera"
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={videoConstraints.width}
            height={videoConstraints.height}
            videoConstraints={videoConstraints}
            style={{ objectFit: 'cover' }}
            onUserMediaError={showAccessBlocked}
          />

          <canvas
            id="canvas"
            className="capture-canvas"
            ref={canvasRef}
            width={videoConstraints.width}
            height={videoConstraints.height}
          />

          {timer ? (
            <div className={`capture-overlay`} style={videoConstraints}>
              {timer}
            </div>
          ) : (
            <></>
          )}
        </div>
      )}
      {!error && enableFilters ? (
        <div className="pre-capture-filters"></div>
      ) : null}
      {!error ? (
        <button className="fk-capture-button" onClick={startCapture}>
          <RecordingIcon />
        </button>
      ) : null}
    </CaptureStyled>
  )
}
