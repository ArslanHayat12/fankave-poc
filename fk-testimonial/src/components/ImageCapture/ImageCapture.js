import React, { useReducer } from 'react'
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
      enabled: true,
      name: true,
      username: false,
      email: false,
    },
    text: {
      enabled: true,
      limit: 280,
      placeholder: 'Your Story...',
    },
    hastages: {
      enabled: true,
      limit: 5,
      options: ['CiscoFuture', 'CiscoImpact', 'MyImpact'],
    },
  },
  sharing: {
    enabled: true,
    twitter: true,
    linkedIn: true,
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
      <h2 className="fk-heading">{widgetConfigs.heading}</h2>
      {processedImage ? (
        <ImagePreviewStyled className="preview-area">
          <Preview
            image={rawImage}
            formMeta={widgetConfigs.form}
            onApprove={handleApprove}
            onReProcess={handleReProcess}
          />
        </ImagePreviewStyled>
      ) : rawImage ? (
        <ImageProcessorWrapperStyled className="processing-area">
          <ImageProcessor
            image={rawImage}
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
