import React, { useReducer, useContext } from 'react'
import { ThemeContext } from 'styled-components'

import { Preview } from '../Preview/Preview'
import { Capture } from './Capture'

const initialState = {
  approvedVideo: null,
  rawVideo: null,
  videoConstraints: null,
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'set':
      return {
        ...state,
        ...action.payload,
      }
    case 'reset':
      return {
        approvedVideo: null,
        rawVideo: null,
        videoConstraints: null,
      }
    default:
      return state
  }
}

export const VideoCapture = () => {
  const theme = useContext(ThemeContext)
  const {
    widgets: { videoCapture, form, sharing, enableDownload },
  } = theme
  const [{ rawVideo, thumb, duration, videoConstraints }, dispatch] =
    useReducer(reducer, initialState)
  const handleCapture = (src, thumb, duration, constraints) => {
    dispatch({
      type: 'set',
      payload: {
        rawVideo: src,
        thumb,
        duration,
        videoConstraints: constraints,
      },
    })
  }
  const handleRetake = () => {
    dispatch({
      type: 'set',
      payload: {
        rawVideo: null,
        videoConstraints: null,
        thumb: null,
        duration: null,
      },
    })
  }
  const handleApprove = (video) => {
    dispatch({
      type: 'set',
      payload: {
        approvedVideo: video,
      },
    })
  }

  return (
    <>
      <h2 className="fk-heading">{videoCapture.label || 'Capture Video'}</h2>
      {rawVideo ? (
        <Preview
          type={'video'}
          src={rawVideo}
          meta={{
            thumb,
            videoConstraints,
            duration,
          }}
          formMeta={form}
          onApprove={handleApprove}
          onReProcess={handleRetake}
        />
      ) : (
        <Capture onCapture={handleCapture} />
      )}
    </>
  )
}
