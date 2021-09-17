import { css } from 'styled-components'

export const getGridAreas = (widgets) => {
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
    
    .fk-widget-screen {
      justify-content: center;
      .fk-heading {
        display: grid;
        justify-content: center;
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

  .fk-tag-close-icon {
    display: block;
    line-height: 20px;
    text-align: center;
    font-size: 12px;
    margin-left: 4px;
    color: #fff;
    cursor: pointer;
  }
`
