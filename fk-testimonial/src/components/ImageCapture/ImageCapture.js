import React, { useReducer, useContext } from 'react'
import { ThemeContext } from 'styled-components'

import { Preview } from '../Preview/Preview'
import { Capture } from './Capture'
import { ImageProcessor } from './ImageProcessor'

import {
  ImageCaptureWrapperStyled,
  ImageProcessorWrapperStyled,
  ImagePreviewStyled,
} from './style'

const initialState = {
  approvedImage: null,
  rawImage: null,
  processedImage: null,
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
        approvedImage: null,
        rawImage: null,
        processedImage: null,
        videoConstraints: null,
      }
    default:
      return state
  }
}

export const ImageCapture = () => {
  const theme = useContext(ThemeContext)
  const {
    widgets: { imageCapture, form, sharing, enableDownload },
  } = theme
  const { post, pre } = imageCapture.processing
  const [{ processedImage, rawImage, videoConstraints }, dispatch] = useReducer(
    reducer,
    initialState
  )

  const handleCapture = (src, constraints) => {
    dispatch({
      type: 'set',
      payload: {
        rawImage: src,
        videoConstraints: constraints,
        ...(post.enabled ? {} : { processedImage: src }),
      },
    })
  }
  const handleContinue = (src) => {
    dispatch({
      type: 'set',
      payload: {
        processedImage: src,
      },
    })
  }
  const handleRetake = () => {
    dispatch({
      type: 'set',
      payload: {
        rawImage: null,
        videoConstraints: null,
        processedImage: null,
      },
    })
  }
  const handleReProcess = () => {
    dispatch({
      type: 'set',
      payload: {
        processedImage: null,
      },
    })
  }
  const handleApprove = (src) => {
    dispatch({
      type: 'set',
      payload: {
        approvedImage: src,
      },
    })
  }
  return (
    <>
      <h2 className="fk-heading">{imageCapture.label || 'Capture Image'}</h2>
      {processedImage ? (
        <ImagePreviewStyled className="preview-area">
          <Preview
            image={rawImage}
            formMeta={form}
            onApprove={handleApprove}
            onReProcess={handleReProcess}
          />
        </ImagePreviewStyled>
      ) : rawImage ? (
        <ImageProcessorWrapperStyled className="processing-area">
          <ImageProcessor
            image={rawImage}
            videoConstraints={videoConstraints}
            filters={post}
            onContinue={handleContinue}
            onReTake={handleRetake}
          />
        </ImageProcessorWrapperStyled>
      ) : (
        <ImageCaptureWrapperStyled className="capture-area">
          <Capture onCapture={handleCapture} enableFilters={pre} />
        </ImageCaptureWrapperStyled>
      )}
    </>
  )
}
