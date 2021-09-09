import React from 'react'

export const Preview = ({
  image,
  formMeta,
  onApprove = () => {},
  onReProcess = () => {},
}) => {
  console.log('form: ', formMeta)
  return (
    <>
      <div className="image-container">
        <img src={image} alt="processed-image" />
      </div>
      <div className="actions">
        <button className="back" onClick={() => onReProcess()}>
          Back
        </button>
        <button className="continue" onClick={() => onApprove(image)}>
          Continue
        </button>
      </div>
    </>
  )
}
