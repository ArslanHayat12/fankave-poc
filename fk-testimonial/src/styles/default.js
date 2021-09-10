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
export const LayoutStyled = css`
  position: relative;
  .fk-header {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-gap: 20px;
    background: ${({ theme }) => theme?.brand?.pallete?.secondary || 'white'};
    .fk-logo {
      width: 100%;
      height: 40px;
      display: grid;
      padding: 10px;
      align-self: center;
      .fk-logo-image {
        object-fit: contain;
        width: inherit;
        height: inherit;
      }
    }
    .fk-heading {
      color: ${({ theme }) => theme?.brand?.pallete?.text || 'black'};
      font-size: 20px;
    }
  }
  .fk-widget-container {
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
      display: grid;
      align-items: center;
      justify-content: center;
      padding: 20px;
      margin: 20px;
      border-radius: 10px;
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
      border: 1px solid ${({ theme }) =>
        theme?.brand?.pallete?.text || 'black'};
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
        display: grid;
        justify-content: center;
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
        background: none;
        grid-template-columns: auto;
        justify-content: end;
      }
    }
  }
  .fk-footer {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-gap: 20px;
    background: ${({ theme }) => theme?.brand?.pallete?.secondary || 'white'};
    .fk-logo {
      width: 100%;
      height: 40px;
      display: grid;
      padding: 10px;
      align-self: center;
      .fk-logo-image {
        object-fit: contain;
        width: inherit;
        height: inherit;
      }
    }
    .fk-heading {
      font-size: 20px;
      color: ${({ theme }) => theme?.brand?.pallete?.text || 'black'};
    }
  }
`
