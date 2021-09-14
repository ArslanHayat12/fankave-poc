import React from 'react'

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
    <article className="fk-image-preview-wrapper">
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
      <div className="actions">
        <button className="back" onClick={() => onReProcess()}>
          Back
        </button>
        <button className="continue" onClick={() => onApprove(src)}>
          Continue
        </button>
      </div>
    </article>
  )
}
