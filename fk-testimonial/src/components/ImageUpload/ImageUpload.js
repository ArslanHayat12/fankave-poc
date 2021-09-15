import React, { useState, useReducer, useRef, useEffect } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Container } from '../DragDropInput/Container'
import { ImageProcessor } from '../ImageCapture/ImageProcessor'

import { Preview } from '../Preview/Preview'

const initialState = {
  approvedImage: null,
  rawImage: null,
  processedImage: null,
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'set_raw':
      return {
        ...state,
        rawImage: action.payload,
      }

    case 'set_processed':
      return {
        ...state,
        processedImage: action.payload,
      }

    case 'approve_image':
      return {
        ...state,
        approvedImage: action.payload,
      }
    case 'reset':
      return {
        approvedImage: null,
        rawImage: null,
        processedImage: null,
      }
    default:
      return state
  }
}

export const ImageUpload = () => {

  const [image, setImage] = useState(null)

  const [{ rawImage, processedImage, approvedImage }, dispatch] = useReducer(reducer,
    initialState)

  const handleReUploadImage = () => {
    dispatch({
      type: "reset"
    })
  }

  const handleBackToProcessing = () => {
    dispatch({
      type: "reset"
    })
    dispatch({
      type: "set_raw",
      payload: image
    })
  }

  const handleContinueRawImage = (src) => {
    dispatch({
      type: "set_processed",
      payload: src
    })
  }

  const handleApprove = (src) => {
    console.log("src: ", src)
    dispatch({
      type: "approve_image",
      payload: src
    })
  }

  // const handleImageUpload = (event) => {
  //   if (event.target.files && event.target.files[0]) {
  //     let img = event.target.files[0]

  //     console.log("img: ", img)

  //     setImage(URL.createObjectURL(img))
  //     dispatch({
  //       type: "set_raw",
  //       payload: URL.createObjectURL(img)
  //     })
  //   }
  // }

  useEffect(() => {
    dispatch({
      type: "set_raw",
      payload: image
    })
  }, [image])

  return (
    <>
      <h2 className="fk-heading">Image Upload</h2>
      {
        processedImage ? (
          <>
            <Preview
              image={processedImage}
              onApprove={handleApprove}
              onReProcess={handleBackToProcessing}
            />
          </>
        ) : rawImage ? (
          <ImageProcessor image={rawImage} onContinue={handleContinueRawImage} onReTake={handleReUploadImage} />
        ) : (
          <>
            <DndProvider backend={HTML5Backend}>
              <Container setDroppedFiles={setImage} />
            </DndProvider>
            {/* <input type="file" onChange={handleImageUpload} /> */}
          </>
        )
      }
    </>
  )
}
