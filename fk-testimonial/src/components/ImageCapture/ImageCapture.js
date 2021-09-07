import React, { useReducer, useEffect, useState } from 'react'
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

const widgetConfigs = {
  heading: 'Record Image Capture Testimonial',
  processing: {
    pre: false,
    post: true,
  },
  form: {
    user: {
      viewable: true,
      editable: true,
      name: true,
      username: false,
      email: false,
    },
    text: {
      viewable: true,
      editable: true,
      limit: 280,
      placeholder: '',
    },
    hastages: {
      viewable: true,
      editable: true,
      limit: 5,
    },
  },
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
        rawImage: null,
        processedImage: null,
      }
    default:
      return state
  }
}

export const ImageCapture = () => {
  const [{ processedImage, image, videoConstraints }, dispatch] = useReducer(
    reducer,
    initialState
  )

  const handleCapture = (src, constraints) => {
    dispatch({
      type: 'set',
      payload: {
        image: src,
        videoConstraints: constraints,
        ...(widgetConfigs.processing.post ? {} : { processedImage: src }),
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
        image: null,
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
      <h2 className="heading">{widgetConfigs.heading}</h2>
      {processedImage ? (
        <ImagePreviewStyled className="preview-area">
          <Preview
            image={image}
            onApprove={handleApprove}
            onReProcess={handleReProcess}
          />
        </ImagePreviewStyled>
      ) : image ? (
        <ImageProcessorWrapperStyled className="processing-area">
          <ImageProcessor
            image={image}
            videoConstraints={videoConstraints}
            onContinue={handleContinue}
            onReTake={handleRetake}
          />
        </ImageProcessorWrapperStyled>
      ) : (
        <ImageCaptureWrapperStyled className="capture-area">
          <Capture
            onCapture={handleCapture}
            enableFilters={widgetConfigs.processing.pre}
          />
        </ImageCaptureWrapperStyled>
      )}
    </>
  )
}
