import React, { useContext, useReducer } from 'react'
import { ThemeContext } from 'styled-components'

import { ImageCapture } from '../ImageCapture/ImageCapture'
import { VideoCapture } from '../VideoCapture/VideoCapture'
import { AudioCapture } from '../AudioCapture/AudioCapture'
import { ImageUpload } from '../ImageUpload/ImageUpload'
import { VideoTestimonial } from '../VideoTestimonial/VideoTestimonial'
import { AudioTestimonial } from '../AudioTestimonial/AudioTestimonial'
import { CrossIcon } from '../../assets'

const initialState = {
  screen: 'home',
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'set_screen':
      return {
        screen: action.payload,
      }
    case 'reset_screen':
      return {
        screen: 'home',
      }
    default:
      return initialState
  }
}

const getWidgetComponent = (widget) => {
  switch (widget) {
    case 'image-capture':
      return ImageCapture
    case 'image-upload':
      return ImageUpload
    case 'video-capture':
      return VideoCapture
    case 'video-testimonial':
      return VideoTestimonial
    case 'audio-capture':
      return AudioCapture
    case 'audio-testimonial':
      return AudioTestimonial
    default:
      return ImageCapture
  }
}

const WidgetIcon = ({ meta }) => {
  const { icon, label } = meta
  return (
    <>
      {icon && (
        <div className="fk-widget-icon-image">
          <img src={icon} alt="icon" />
        </div>
      )}
      <div className="fk-widget-icon-text">
        <p>{label}</p>
      </div>
    </>
  )
}

export const HomeScreen = () => {
  const [{ screen }, dispatch] = useReducer(reducer, initialState)
  const theme = useContext(ThemeContext)

  const {
    heading,
    widgets: {
      imageCapture: {
        enabled: imageCaptureEnabled = false,
        ...imageCaptureMeta
      },
      videoCapture: {
        enabled: videoCaptureEnabled = false,
        ...videoCaptureMeta
      },
      imageUpload: { enabled: imageUploadEnabled = false, ...imageUploadMeta },
      audioCapture: {
        enabled: audioCaptureEnabled = false,
        ...audioCaptureMeta
      },
      videoTestimonial: {
        enabled: videoTestimonialEnabled = false,
        ...videoTestimonialMeta
      },
      audioTestimonial: {
        enabled: audioTestimonialEnabled = false,
        ...audioTestimonialMeta
      },
    },
  } = theme
  const size = [
    imageCaptureEnabled,
    videoCaptureEnabled,
    imageUploadEnabled,
    audioCaptureEnabled,
    videoTestimonialEnabled,
    audioTestimonialEnabled,
  ].filter((widget) => widget).length

  const openWidget = (widget) => {
    return dispatch({ type: 'set_screen', payload: widget })
  }
  if (screen === 'home') {
    return (
      <article className="fk-home-screen" id="fk-home-screen">
        <p className="fk-screen-description">{heading}</p>
        <article className="fk-widget-icons">
          {size > 0 ? (
            <>
              {videoCaptureEnabled && (
                <div
                  className="fk-widget-icon fk-video-capture-icon"
                  onClick={() => openWidget('video-capture')}
                >
                  <WidgetIcon meta={videoCaptureMeta} />
                </div>
              )}
              {videoTestimonialEnabled && (
                <div
                  className="fk-widget-icon fk-video-testimonial-icon"
                  onClick={() => openWidget('video-testimonial')}
                >
                  <WidgetIcon meta={videoTestimonialMeta} />
                </div>
              )}
              {imageCaptureEnabled && (
                <div
                  className="fk-widget-icon fk-image-capture-icon"
                  onClick={() => openWidget('image-capture')}
                >
                  <WidgetIcon meta={imageCaptureMeta} />
                </div>
              )}
              {imageUploadEnabled && (
                <div
                  className="fk-widget-icon fk-image-upload-icon"
                  onClick={() => openWidget('image-upload')}
                >
                  <WidgetIcon meta={imageUploadMeta} />
                </div>
              )}
              {audioCaptureEnabled && (
                <div
                  className="fk-widget-icon fk-audio-capture-icon"
                  onClick={() => openWidget('audio-capture')}
                >
                  <WidgetIcon meta={audioCaptureMeta} />
                </div>
              )}
              {audioTestimonialEnabled && (
                <div
                  className="fk-widget-icon fk-audio-testimonial-icon"
                  onClick={() => openWidget('audio-testimonial')}
                >
                  <WidgetIcon meta={audioTestimonialMeta} />
                </div>
              )}
            </>
          ) : (
            <>No Widget Enabled</>
          )}
        </article>
      </article>
    )
  }
  const Widget = getWidgetComponent(screen)
  return (
    <article className="fk-widget-screen" id="fk-widget-screen">
      <CrossIcon
        customClass="fk-cross-icon"
        onClick={() => openWidget('home')}
      />
      <Widget />
    </article>
  )
}
