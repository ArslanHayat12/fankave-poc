import React from 'react'

import { StoryForm } from './StoryForm'
import { PreviewStyled } from './style'

export const Preview = ({
  src,
  type,
  meta,
  formMeta,
  onApprove = () => {},
  onReProcess = () => {},
}) => {
  const { videoConstraints } = meta
  return (
    <PreviewStyled className="fk-image-preview-wrapper">
      <div className="image-container">
        {type === 'image' ? (
          <img src={src} alt="processed-image" />
        ) : type === 'video' ? (
          <video
            width={videoConstraints.width}
            height={videoConstraints.height}
            controls
          >
            <source src={src} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <>audio</>
        )}
      </div>
      <StoryForm formMeta={formMeta} />
      <div className="actions">
        <button className="fk-filled-button" onClick={() => onReProcess()}>
          Back
        </button>
        <button className="fk-filled-button" onClick={() => onApprove(src)}>
          Continue
        </button>
      </div>
    </PreviewStyled>
  )
}