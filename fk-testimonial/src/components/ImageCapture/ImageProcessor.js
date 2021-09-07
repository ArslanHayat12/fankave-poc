import React from 'react'

export const ImageProcessor = ({
  image,
  videoConstraints,
  onContinue = () => {},
  onReTake = () => {},
}) => {
  return (
    <>
      <div className="image-container">
        <img src={image} alt="processed-image" />
      </div>
      <div className="actions">
        <button className="back" onClick={() => onReTake()}>
          Re-Take
        </button>
        <button className="continue" onClick={() => onContinue(image)}>
          Continue
        </button>
      </div>
    </>
  )
}
