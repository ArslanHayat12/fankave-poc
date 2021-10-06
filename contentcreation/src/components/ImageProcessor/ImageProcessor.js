import React, { useState } from 'react'

import { StickerSelect } from '../AddBgAndStickers/AddBgAndStickers'
import { ImageProcessorStyled } from './style'

export const ImageProcessor = ({
  image,
  videoConstraints,
  filters = {},
  onContinue = () => {},
  onReTake = () => {},
}) => {
  const [hideControls, setHideControls] = useState(false)
  const { stickers, backgrounds } = filters

  const handleProcess = () => {
    const canvas = document.getElementById('fabricCanvas')
    console.log('Fabric Canvas')
    if (canvas) {
      onContinue(canvas.toDataURL())
    }
  }
  return (
    <ImageProcessorStyled className="fk-image-processing-wrapper">
      <div className="image-container">
        <StickerSelect
          photo={image}
          stickers={stickers}
          backgrounds={backgrounds}
          videoConstraints={videoConstraints}
          hideControls={hideControls}
        />
      </div>
      <div className="actions">
        <button className="fk-filled-button" onClick={() => onReTake()}>
          Re-Take
        </button>
        <button
          className="fk-filled-button"
          onClick={() => {
            setHideControls(true)
            setTimeout(() => {
              handleProcess()
            }, 1000)
          }}
        >
          Continue
        </button>
      </div>
    </ImageProcessorStyled>
  )
}
