import { css } from 'styled-components'

const getGridAreas = (widgets) => {
  const {
    imageCapture: { enabled: imageCaptureEnabled = false },
    videoCapture: { enabled: videoCaptureEnabled = false },
    imageUpload: { enabled: imageUploadEnabled = false },
    audioCapture: { enabled: audioCaptureEnabled = false },
    videoTestimonial: { enabled: videoTestimonialEnabled = false },
    audioTestimonial: { enabled: audioTestimonialEnabled = false },
  } = widgets
  const enabled = [
    videoCaptureEnabled ? 'video-capture' : '',
    videoTestimonialEnabled ? 'video-testimonial' : '',
    imageCaptureEnabled ? 'image-capture' : '',
    imageUploadEnabled ? 'image-upload' : '',
    audioCaptureEnabled ? 'audio-capture' : '',
    audioTestimonialEnabled ? 'audio-testimonial' : '',
  ].filter((widget) => widget)
  const size = enabled.length
  if (size === 6) {
    return [
      `"${enabled[0]} ${enabled[1]}" "${enabled[2]} ${enabled[3]}" "${enabled[4]} ${enabled[5]}"`,
      '1fr 1fr',
      '1fr 1fr 1fr',
    ]
  }
  if (size === 5) {
    return [
      `"${enabled[0]} ${enabled[1]}" "${enabled[2]} ${enabled[3]}" "${enabled[4]} ${enabled[4]}"`,
      '1fr 1fr',
      '1fr 1fr 1fr',
    ]
  }
  if (size === 4) {
    return [
      `"${enabled[0]} ${enabled[1]}" "${enabled[2]} ${enabled[3]}"`,
      '1fr 1fr',
      '1fr 1fr',
    ]
  }
  if (size === 3) {
    return [
      `"${enabled[0]}" "${enabled[1]}" "${enabled[2]}"`,
      '1fr',
      '1fr 1fr 1fr',
    ]
  }
  if (size === 2) {
    return [`"${enabled[0]}" "${enabled[1]}"`, '1fr', '1fr 1fr']
  }
  if (size === 1) {
    return [`"${enabled[0]}"`, '1fr', '1fr']
  }
  return ['', '1fr', '1fr']
}

const ImageUploadStyled = css`
  
`

const ImageCaptureWrapperStyled = css`
  display: grid;
  grid-gap: 10px;
  position: relative;
  .image-capture {
    width: 100%;
    height: 375px;
  }
  .capture-canvas {
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
  }
  .capture-overlay {
    position: absolute;
    top: 0;
    left: 0;
    display: grid;
    justify-content: center;
    align-items: center;
    font-size: 50px;
  }

  .capture-button {
    background: transparent;
    border: none;
    width: 50px;
    padding: 0;
    justify-self: center;
    cursor: pointer;
  }

  .pre-capture-filters {
  }

  .camera-error {
    .error {
    }
  }
`

const ImageProcessorWrapperStyled = css`
  display: grid;
  position: relative;
  .image-container {
    overflow: hidden;
    .stickers-preview,
    .bgs-preview {
      display: flex;
      grid-gap: 5px;
    }
    .sticker,
    .bg {
      width: 70px;
      height: 70px;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center center;
      border: 1px solid white;
      background-color: black;
    }
  }
  .actions {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 10px;
    .continue {
    }
    .back {
    }
  }
`

const ImagePreviewStyled = css`
  display: grid;
  position: relative;
  .image-container {
  }
  .actions {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 10px;
    .continue {
    }
    .back {
    }
  }
`

const VideoCaptureWrapperStyled = css`
  display: grid;
  grid-gap: 10px;
  position: relative;
  .video-capture {
    width: 100%;
    height: 375px;
  }
  .capture-canvas {
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
  }
  .capture-overlay {
    position: absolute;
    top: 0;
    left: 0;
    display: grid;
    justify-content: center;
    align-items: center;
    font-size: 50px;
  }

  .capture-button {
    background: transparent;
    border: none;
    width: 50px;
    padding: 0;
    justify-self: center;
    cursor: pointer;
  }

  .timer-overlay {
    position: absolute;
    color: white;
    justify-self: center;
    top: 0;
    right: 0;
  }

  .stop-button {
    background: transparent;
    border: none;
    width: 50px;
    padding: 0;
    justify-self: center;
    cursor: pointer;
  }

  .pre-capture-filters {
  }

  .camera-error {
    .error {
    }
  }
`

const VideoPreviewStyled = css`
  display: grid;
  position: relative;
  .video-container {
  }
  .actions {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 10px;
    .continue {
    }
    .back {
    }
  }
`

export const LayoutStyled = css`
  display: grid;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 0;
  min-height: 560px;
  ${({ theme }) => {
    const { type = '', value } = theme?.brand?.background
    if (type === 'color') {
      return `background: ${value};`
    }
    if (type === 'image') {
      return `background: url(${value}) center center/cover no-repeat;`
    }
    return 'background: white;'
  }};
  .fk-widget-wrapper {
    position: relative;
    align-items: center;
    justify-content: center;
    padding: 20px;
    margin: 20px;
    border-radius: 10px;
    width: 320px;
    ${({ theme }) => {
      const { type = '', value } = theme?.brand?.widgetsBackground
      if (type === 'color') {
        return `background: ${value};`
      }
      if (type === 'image') {
        return `background: url(${value}) center center/cover no-repeat;`
      }
      return 'background: white;'
    }}
    border: 1px solid ${({ theme }) => theme?.brand?.pallete?.text || 'black'};
    .fk-home-screen {
      display: grid;
      grid-row-gap: 20px;
      z-index: 1;
      justify-content: center;
      .fk-screen-description {
        font-size: 20px;
        font-weight: 500;
        color: ${({ theme }) => theme?.brand?.pallete?.text || 'black'};
      }
      .fk-widget-icons {
        display: grid;
        grid-gap: 10px;
        grid-template-areas: ${({ theme }) =>
          getGridAreas(theme?.widgets || {})[0]};
        grid-template-columns: ${({ theme }) =>
          getGridAreas(theme?.widgets || {})[1]};
        grid-template-rows: ${({ theme }) =>
          getGridAreas(theme?.widgets || {})[2]};
        .fk-widget-icon {
          display: grid;
          align-self: center;
          justify-content: center;
          border: 1px solid black;
          border-radius: 10px;
          padding: 10px;
          cursor: pointer;
          &.fk-video-capture-icon {
            grid-area: video-capture;
          }
          &.fk-video-testimonial-icon {
            grid-area: video-testimonial;
          }
          &.fk-image-capture-icon {
            grid-area: image-capture;
          }
          &.fk-image-upload-icon {
            grid-area: image-upload;
          }
          &.fk-audio-capture-icon {
            grid-area: audio-capture;
          }
          &.fk-audio-testimonial-icon {
            grid-area: audio-testimonial;
          }
          .fk-widget-icon-image {
            width: 40px;
            height: 40px;
            display: grid;
            align-self: center;
            width: 100%;
            img {
              width: inherit;
              height: inherit;
              object-fit: contain;
            }
          }
          .fk-widget-icon-text {
            color: ${({ theme }) => theme?.brand?.pallete?.text || 'black'};
            font-size: 12px;
          }
        }
      }
    }
    .fk-widget-screen {
      justify-content: center;
      .fk-heading {
        display: grid;
        justify-content: center;
      }

      ${ImageUploadStyled};

      .fk-image-capture-wrapper {
        overflow: hidden;
        ${ImageCaptureWrapperStyled}
      }
      .fk-video-capture-wrapper {
        overflow: hidden;
        ${VideoCaptureWrapperStyled}
      }
      .fk-image-processing-wrapper {
        overflow: hidden;
        ${ImageProcessorWrapperStyled}
      }
      .fk-image-preview-wrapper {
        overflow: hidden;
        ${ImagePreviewStyled}
      }
      .fk-cross-icon {
        height: 15px;
        position: absolute;
        right: 10px;
        top: 10px;
        cursor: pointer;
        z-index: 1;
      }
    }
    .fk-footer {
      display: grid;
      grid-template-columns: 1fr;
      grid-gap: 20px;
      background: ${({ theme }) => theme?.brand?.pallete?.secondary || 'white'};
      .fk-logo {
        height: 40px;
        display: grid;
        padding: 10px;
        justify-content: end;
        .fk-logo-image {
          object-fit: contain;
          width: inherit;
          height: inherit;
        }
      }
    }
  }

  .fk-tag-input {
    display: flex;
    flex-wrap: wrap;
    min-height: 48px;
    border-radius: 6px;
  }

  .fk-tags {
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    margin: 0;
  }

  .fk-tag {
    width: auto;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    padding: 0 8px;
    font-size: 14px;
    list-style: none;
    border-radius: 6px;
    margin: 0 8px 8px 0;
    background: grey;
  }

  .fk-tag-title {
    margin-top: 3px;
  }

  .fk-tag-close-icon {
    display: block;
    width: 16px;
    height: 16px;
    line-height: 16px;
    text-align: center;
    font-size: 14px;
    margin-left: 8px;
    color: #fff;
    border-radius: 50%;
    background: transparent;
    cursor: pointer;
  }
`
